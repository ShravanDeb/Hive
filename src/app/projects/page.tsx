import AppShell from "@/components/AppShell";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilters from "@/components/ProjectFilters";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface SearchParams {
  search?: string;
  department?: string;
  status?: string;
  skill?: string;
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?error=You+must+be+logged+in+to+view+projects.");
  }

  const params = await searchParams;

  const where: any = {};

  if (params.search) {
    where.OR = [
      { title:       { contains: params.search, mode: "insensitive" } },
      { description: { contains: params.search, mode: "insensitive" } },
    ];
  }
  if (params.department) {
    where.owner = { department: params.department };
  }
  if (params.status) {
    where.status = params.status;
  }
  if (params.skill) {
    where.skills = { some: { name: params.skill } };
  }

  const currentUserId = Number((session.user as any).id);

  const [projects, skillsData, unreadNotificationsCount, userBookmarks] = await Promise.all([
    prisma.project.findMany({
      where,
      include: { owner: true, skills: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.skill.findMany({
      select: { name: true },
      orderBy: { name: "asc" },
    }),
    prisma.notification.count({
      where: {
        userId: currentUserId,
        read: false,
      },
    }),
    prisma.bookmark.findMany({
      where: { userId: currentUserId },
      select: { projectId: true },
    }),
  ]);

  const bookmarkedIds = new Set(userBookmarks.map((b: any) => b.projectId));

  const skills = skillsData.map((s: any) => s.name);

  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics & Communication",
    "Electrical & Electronics",
    "Mechanical Engineering",
    "Civil Engineering",
    "Biotechnology",
    "Food Processing Technology",
  ];

  return (
    <AppShell user={session.user} unreadNotifications={unreadNotificationsCount}>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 style={{ fontFamily: "var(--font-display), system-ui, sans-serif", fontWeight: 800, fontSize: "clamp(1.25rem, 2vw, 1.5rem)", letterSpacing: "-0.04em", color: "var(--foreground)" }}>
              Discover
            </h1>
            <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
              {projects.length} project{projects.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        <ProjectFilters skills={skills} departments={departments} />

        {/* Results */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project: any) => (
              <ProjectCard
                key={project.id}
                project={project as any}
                initialBookmarked={bookmarkedIds.has(project.id)}
              />
            ))}
          </div>
        ) : (
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.04)" }} className="p-16 text-center rounded-xl">
            <p style={{ fontFamily: "var(--font-display), system-ui, sans-serif", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "-0.02em", color: "var(--foreground)" }} className="mb-1">No projects found</p>
            <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
              Try clearing your filters or check back later.
            </p>
          </div>
        )}
      </main>
    </AppShell>
  );
}
