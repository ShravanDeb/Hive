import AppShell from "@/components/AppShell";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { Mail, GitBranch, Link2, ChevronLeft } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?error=You+must+be+logged+in+to+view+profiles.");
  }

  const { id } = await params;
  const userId = Number(id);
  if (isNaN(userId)) notFound();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      skills: true,
      projects: {
        include: { owner: true, skills: true },
      },
    },
  });

  if (!user) notFound();

  const unreadNotificationsCount = await prisma.notification.count({
    where: {
      userId: Number((session.user as any).id),
      read: false,
    },
  });

  return (
    <AppShell user={session.user} unreadNotifications={unreadNotificationsCount}>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back */}
        <Link
          href="/projects"
          style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)" }}
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft size={14} strokeWidth={1.75} />
          Back to projects
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ── Left column: identity ──────────────────────── */}
          <div className="space-y-4">

            {/* Avatar + name card */}
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.04)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }} className="p-6 text-center rounded-xl">
              <div className="h-16 w-16 rounded-full bg-secondary border border-border flex items-center justify-center text-[22px] text-foreground mx-auto mb-4 overflow-hidden">
                {((user?.name || "U").trim()[0] || "U").toUpperCase()}
              </div>
              <h1 style={{ fontFamily: "var(--font-display), system-ui, sans-serif", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.03em", color: "var(--foreground)" }} className="mb-0.5">{user.name}</h1>
              <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)" }} className="mb-3">
                {user.department} · Year {user.year}
              </p>
              <span className="badge badge-gray">{user.role}</span>
            </div>

            {/* Contact card */}
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.04)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }} className="p-5 space-y-3 rounded-xl">
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>Contact</p>
              <a
                href={`mailto:${user.email}`}
                style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)" }}
                className="flex items-center gap-2 hover:text-foreground transition-colors break-all"
              >
                <Mail size={13} strokeWidth={1.75} className="shrink-0" />
                {user.email}
              </a>
              {user.githubUrl && (
                <a
                  href={user.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)" }}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <GitBranch size={13} strokeWidth={1.75} className="shrink-0" />
                  GitHub
                </a>
              )}
              {user.linkedinUrl && (
                <a
                  href={user.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)" }}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Link2 size={13} strokeWidth={1.75} className="shrink-0" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* ── Right column: bio, skills, projects ───────── */}
          <div className="md:col-span-2 space-y-5">

            {/* Bio + skills */}
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.04)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }} className="p-6 space-y-5 rounded-xl">
              <div>
                <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)" }} className="mb-2">About</p>
                <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.8125rem", color: "var(--foreground)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                  {user.bio || <span className="text-muted-foreground italic">No bio added yet.</span>}
                </p>
              </div>

              {user.skills.length > 0 && (
                <div>
                  <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)" }} className="mb-3">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {user.skills.map((skill: any) => (
                      <span
                        key={skill.id}
                        style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6875rem", fontWeight: 500 }}
                        className="px-2 py-0.5 rounded-md bg-secondary text-muted-foreground"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Projects */}
            <div>
              <h2 style={{ fontFamily: "var(--font-display), system-ui, sans-serif", fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "-0.03em", color: "var(--foreground)" }} className="mb-4">
                Projects by {user?.name ? user.name.trim().split(" ")[0] : "User"}
              </h2>

              {user.projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.projects.map((project: any) => (
                    <ProjectCard key={project.id} project={project as any} />
                  ))}
                </div>
              ) : (
                <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.04)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }} className="p-10 text-center rounded-xl">
                  <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>No projects posted yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
