import AppShell from "@/components/AppShell";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ChevronLeft,
  Sprout,
  Brain,
  Dumbbell,
  Folder,
} from "lucide-react";
import ProjectDetailClient from "./ProjectDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?error=You+must+be+logged+in+to+view+project+details.");
  }

  const { id } = await params;
  const projectId = Number(id);
  if (isNaN(projectId)) notFound();

  const currentUserId = Number((session.user as any).id);

  const [project, application, existingBookmark, unreadNotificationsCount] = await Promise.all([
    prisma.project.findUnique({
      where: { id: projectId },
      include: {
        owner: {
          select: { id: true, name: true, email: true, department: true, year: true, bio: true },
        },
        skills: true,
      },
    }),
    prisma.application.findUnique({
      where: { projectId_userId: { projectId, userId: currentUserId } },
    }),
    prisma.bookmark.findUnique({
      where: { userId_projectId: { userId: currentUserId, projectId } },
    }),
    prisma.notification.count({
      where: { userId: currentUserId, read: false },
    }),
  ]);

  if (!project) notFound();

  const isOwner = currentUserId === project.ownerId;
  const hasApplied = !isOwner && !!application;
  const applicationStatus = !isOwner && application ? application.status : undefined;
  const initialBookmarked = !!existingBookmark;

  const iconInfo = getProjectIcon(project.title);
  const Icon = iconInfo.icon;
  const postedTime = getRelativeTimeString(project.createdAt);

  const t = project.title.toLowerCase() + " " + project.description.toLowerCase();
  const category =
    t.includes("eco") || t.includes("track") || t.includes("waste") || t.includes("green") || t.includes("environ") ? "Environment"
    : t.includes("study") || t.includes("buddy") ? "Education"
    : t.includes("fit") || t.includes("health") ? "Health & Fitness"
    : "Software Development";
  const experience = t.includes("rover") ? "Intermediate" : t.includes("kit") || t.includes("begin") ? "Beginner" : "Advanced";
  const type =
    t.includes("web") || t.includes("track") ? "Web App"
    : t.includes("mobile") || t.includes("app") ? "Mobile App"
    : t.includes("rover") || t.includes("ros") ? "Hardware / Robotics"
    : "Software";

  return (
    <AppShell user={session.user} unreadNotifications={unreadNotificationsCount}>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/projects"
            style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)" }}
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} strokeWidth={2} />
            Back to projects
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Apply widget — shown at top on mobile only, hidden on desktop (lives in sidebar there) */}
          <div className="lg:hidden">
            <ProjectDetailClient
              projectId={projectId}
              isOwner={isOwner}
              hasApplied={hasApplied}
              applicationStatus={applicationStatus}
              projectStatus={project.status}
              initialBookmarked={initialBookmarked}
              ownerEmail={project.owner.email}
              projectData={project}
            />
          </div>

          {/* ── Main column ──────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-5">

            {/* Hero card */}
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.04)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }} className="p-6 flex flex-col gap-4 rounded-xl">
              <div className="flex items-start justify-between gap-4">
                <div className={`h-14 w-14 rounded-xl ${iconInfo.bg} border border-border flex items-center justify-center shrink-0`}>
                  <Icon size={26} className={iconInfo.text} />
                </div>

                {/* Bookmark button lives here in main column for non-owners */}
                {!isOwner && (
                  <span className="text-[10px] text-muted-foreground font-medium mt-1 select-none">
                    {/* Placeholder — bookmark toggled from sidebar widget */}
                  </span>
                )}
              </div>

              <div>
                <div className="mb-2">
                  {project.status === "OPEN" ? (
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.5625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4ade80", background: "rgba(74,222,128,0.08)" }} className="px-2 py-0.5 rounded-full">Looking for team</span>
                  ) : project.status === "FULL" ? (
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.5625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#facc15", background: "rgba(250,204,21,0.08)" }} className="px-2 py-0.5 rounded-full">In Progress</span>
                  ) : (
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.5625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#f87171", background: "rgba(248,113,113,0.08)" }} className="px-2 py-0.5 rounded-full">Closed</span>
                  )}
                </div>
                <h1 style={{ fontFamily: "var(--font-display), system-ui, sans-serif", fontWeight: 800, fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", letterSpacing: "-0.04em", color: "var(--foreground)" }} className="leading-snug">
                  {project.title}
                </h1>
                <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.8125rem", color: "var(--muted-foreground)" }} className="mt-1.5 leading-relaxed">
                  {project.description.split("\n")[0] || ""}
                </p>
              </div>
            </div>

            {/* Metadata */}
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.04)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }} className="p-5 space-y-3 rounded-xl">
              <h3 style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>Project Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-0.5">
                  <span style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.625rem", color: "var(--muted-foreground)", fontWeight: 500 }}>Category</span>
                  <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "var(--foreground)" }}>{category}</p>
                </div>
                <div className="space-y-0.5">
                  <span style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.625rem", color: "var(--muted-foreground)", fontWeight: 500 }}>Type</span>
                  <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "var(--foreground)" }}>{type}</p>
                </div>
                <div className="space-y-0.5">
                  <span style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.625rem", color: "var(--muted-foreground)", fontWeight: 500 }}>Experience</span>
                  <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "var(--foreground)" }}>{experience}</p>
                </div>
                <div className="space-y-0.5">
                  <span style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.625rem", color: "var(--muted-foreground)", fontWeight: 500 }}>Posted</span>
                  <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "var(--foreground)" }}>{postedTime}</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.04)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }} className="p-5 space-y-3 rounded-xl">
              <h3 style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>Skills &amp; Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((skill: any) => (
                  <span
                    key={skill.id}
                    style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6875rem", fontWeight: 500 }}
                    className="px-2.5 py-1 rounded bg-secondary border border-border text-muted-foreground"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Full description */}
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.04)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }} className="p-5 space-y-3 rounded-xl">
              <h3 style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>About this project</h3>
              <div style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.8125rem", color: "var(--foreground)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {project.description}
              </div>
            </div>

            {/* What you'll do */}
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.04)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }} className="p-5 space-y-3 rounded-xl">
              <h3 style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>What you&apos;ll do</h3>
              <ul style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.8125rem", color: "var(--muted-foreground)" }} className="space-y-2 list-disc pl-5">
                <li>Collaborate with the team to define scope and specifications.</li>
                <li>Design, build, and test features according to the project goals.</li>
                <li>Participate in code reviews and weekly syncs.</li>
              </ul>
            </div>

          </div>

          {/* ── Sidebar column — hidden on mobile, widget shown above instead ── */}
          <div className="hidden lg:block lg:col-span-4 space-y-4">

            {/* Apply / bookmark / contact widget */}
            <ProjectDetailClient
              projectId={projectId}
              isOwner={isOwner}
              hasApplied={hasApplied}
              applicationStatus={applicationStatus}
              projectStatus={project.status}
              initialBookmarked={initialBookmarked}
              ownerEmail={project.owner.email}
              projectData={project}
            />

            {/* Owner card */}
            <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.04)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }} className="p-5 space-y-4 rounded-xl">
              <h3 style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>Project Owner</h3>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0 overflow-hidden">
                  {((project.owner?.name || "U").trim()[0] || "U").toUpperCase()}
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.8125rem", fontWeight: 600, color: "var(--foreground)" }}>
                    <Link href={`/profile/${project.owner.id}`} className="hover:underline">
                      {project.owner.name}
                    </Link>
                  </h4>
                  <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.625rem", color: "var(--muted-foreground)" }} className="mt-0.5">
                    {project.owner.department} · Year {project.owner.year}
                  </p>
                </div>
              </div>

              {project.owner.bio && (
                <p style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.6875rem", color: "var(--muted-foreground)", lineHeight: 1.6 }} className="italic border-l-2 border-border pl-3">
                  {project.owner.bio}
                </p>
              )}
            </div>

          </div>
        </div>
      </main>
    </AppShell>
  );
}

/* ── helpers ──────────────────────────────────────────────── */

function getProjectIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("eco") || t.includes("track") || t.includes("waste") || t.includes("green") || t.includes("environ"))
    return { icon: Sprout,   bg: "bg-green-500/10",  text: "text-green-600 dark:text-green-400" };
  if (t.includes("study") || t.includes("buddy") || t.includes("learn") || t.includes("book") || t.includes("ai") || t.includes("companion"))
    return { icon: Brain,    bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400" };
  if (t.includes("fit") || t.includes("gym") || t.includes("health") || t.includes("workout"))
    return { icon: Dumbbell, bg: "bg-yellow-500/10", text: "text-yellow-600 dark:text-yellow-400" };
  return { icon: Folder, bg: "bg-secondary", text: "text-foreground" };
}

function getRelativeTimeString(date: Date) {
  const diffMs    = Date.now() - date.getTime();
  const diffMins  = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays  = Math.floor(diffMs / 86_400_000);
  if (diffMins  < 60) return `${diffMins  || 1}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}
