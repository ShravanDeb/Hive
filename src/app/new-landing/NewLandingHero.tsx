"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HiveLogo from "@/components/HiveLogo";

gsap.registerPlugin(ScrollTrigger);

const D = "var(--font-display), system-ui, sans-serif";
const B = "var(--font-body), system-ui, sans-serif";
const M = "var(--font-mono), monospace";
const badgeColor = (s: string) =>
  s === "Active" ? "green" : s === "In Progress" ? "yellow" : "gray";
const AVATARS = ["SK", "MR", "JD", "AL", "RW"];

function Avatar({
  initials,
  size = 28,
  zIndex = 0,
  borderColor = "#0A0A0A",
}: {
  initials: string;
  size?: number;
  zIndex?: number;
  borderColor?: string;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#1a1a1a",
        border: `2px solid ${borderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.25,
        color: "#888",
        fontFamily: D,
        fontWeight: 600,
        marginLeft: zIndex > 0 ? -size * 0.3 : 0,
        position: "relative",
        zIndex: 10 - zIndex,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function StatusDot({ color = "#22C55E" }: { color?: string }) {
  return (
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
        boxShadow: `0 0 6px ${color}44`,
      }}
    />
  );
}

function NotificationFragment({ className }: { className: string }) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        right: "8%",
        top: "28%",
        background: "rgba(17,17,17,0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: "0.625rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <StatusDot />
      <span style={{ fontFamily: B, fontSize: "0.8125rem", color: "#EDEDED", whiteSpace: "nowrap" }}>
        3 students are building right now
      </span>
    </div>
  );
}

function CodeFragment({ className }: { className: string }) {
  const kw = "#C586C0";
  const fn = "#DCDCAA";
  const str = "#CE9178";
  const vr = "#9CDCFE";
  const cmt = "#6A9955";
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        right: "6%",
        top: "12%",
        width: 320,
        background: "rgba(17,17,17,0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        padding: "1.125rem 1.25rem",
        fontFamily: M,
        fontSize: "0.75rem",
        lineHeight: 1.7,
        boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ color: cmt, marginBottom: "0.375rem" }}>{"// find teammates"}</div>
      <div><span style={{ color: kw }}>const</span>{" "}<span style={{ color: vr }}>findTeam</span> = <span style={{ color: kw }}>async</span> (skills) {"{"}</div>
      <div style={{ paddingLeft: "1rem" }}><span style={{ color: kw }}>return</span> <span style={{ color: str }}>await</span> hive.<span style={{ color: fn }}>search</span>({"{"}</div>
      <div style={{ paddingLeft: "2rem" }}>skills,</div>
      <div style={{ paddingLeft: "2rem" }}>campus: <span style={{ color: str }}>"MIT"</span>,</div>
      <div style={{ paddingLeft: "1rem" }}>{"})"}</div>
      <div>{"}"}</div>
    </div>
  );
}

function ActivityFragment({ className }: { className: string }) {
  const items = [
    { user: "Sarah", action: "pushed to", target: "main", time: "2m ago" },
    { user: "Marcus", action: "opened issue", target: "#47", time: "5m ago" },
    { user: "Jamie", action: "merged PR", target: "#42", time: "12m ago" },
  ];
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        right: "6%",
        bottom: "12%",
        width: 280,
        background: "rgba(17,17,17,0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        padding: "1rem 1.125rem",
        boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ fontFamily: M, fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#666", marginBottom: "0.75rem" }}>
        Activity
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 0", borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
          <Avatar initials={item.user[0] + item.user[1]} size={20} zIndex={0} borderColor="#111" />
          <span style={{ fontFamily: B, fontSize: "0.75rem", color: "#888", flex: 1 }}>
            <span style={{ color: "#ccc" }}>{item.user}</span> {item.action} <span style={{ color: "#aaa" }}>{item.target}</span>
          </span>
          <span style={{ fontFamily: M, fontSize: "0.6875rem", color: "#555", whiteSpace: "nowrap" }}>{item.time}</span>
        </div>
      ))}
    </div>
  );
}

function TeamPresence({ className }: { className: string }) {
  return (
    <div className={className} style={{ position: "absolute", right: "8%", bottom: "18%", display: "flex", alignItems: "center", gap: "0.625rem" }}>
      <div style={{ display: "flex" }}>
        {AVATARS.map((a, i) => (
          <Avatar key={i} initials={a} size={30} zIndex={i} />
        ))}
      </div>
      <div>
        <div style={{ fontFamily: B, fontSize: "0.8125rem", color: "#EDEDED", fontWeight: 500 }}>12 online</div>
        <div style={{ fontFamily: M, fontSize: "0.6875rem", color: "#666" }}>across 4 projects</div>
      </div>
    </div>
  );
}

function ProjectCardFragment({
  title, desc, status, members, style, className,
}: {
  title: string; desc: string; status: string; members: string[];
  style?: React.CSSProperties; className?: string;
}) {
  return (
    <div className={className} style={{ position: "absolute", width: 300, background: "rgba(17,17,17,0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "1.25rem 1.25rem 1rem", ...style }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <span style={{ fontFamily: D, fontWeight: 700, fontSize: "0.875rem", color: "#EDEDED" }}>{title}</span>
        <span className={`badge badge-${badgeColor(status)}`}>{status}</span>
      </div>
      <p style={{ fontFamily: B, fontSize: "0.8125rem", color: "#666", margin: 0, lineHeight: 1.5 }}>{desc}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginTop: "0.875rem" }}>
        <div style={{ display: "flex" }}>
          {members.slice(0, 3).map((m, i) => (
            <Avatar key={i} initials={m} size={22} zIndex={i} borderColor="#111" />
          ))}
        </div>
        {members.length > 3 && (
          <span style={{ fontFamily: M, fontSize: "0.6875rem", color: "#666", marginLeft: "0.125rem" }}>+{members.length - 3}</span>
        )}
      </div>
    </div>
  );
}

function DashboardFragment({ className }: { className: string }) {
  const projects = [
    { title: "CampusConnect", status: "Active", members: 4, progress: 72 },
    { title: "HackHub", status: "In Progress", members: 3, progress: 45 },
    { title: "StudySync", status: "Planning", members: 2, progress: 15 },
    { title: "CodeCollab", status: "Active", members: 5, progress: 88 },
  ];
  return (
    <div className={className} style={{ position: "absolute", inset: "4%", background: "rgba(17,17,17,0.98)", backdropFilter: "blur(40px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, overflow: "hidden", display: "flex", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
      <div style={{ width: 220, borderRight: "1px solid rgba(255,255,255,0.04)", padding: "1.5rem 0.75rem", display: "flex", flexDirection: "column" as const }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0 0.5rem", marginBottom: "2rem" }}>
          <HiveLogo size={18} />
          <span style={{ fontFamily: D, fontWeight: 800, fontSize: "0.9375rem", color: "#EDEDED", letterSpacing: "-0.03em" }}>Hive</span>
        </div>
        {[
          { icon: "◎", label: "Dashboard", active: true },
          { icon: "◇", label: "Projects", active: false },
          { icon: "⬡", label: "Teams", active: false },
          { icon: "△", label: "Events", active: false },
          { icon: "○", label: "Messages", active: false },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.5rem 0.625rem", borderRadius: 8, marginBottom: "0.125rem", background: item.active ? "rgba(255,255,255,0.06)" : "transparent", fontFamily: B, fontSize: "0.8125rem", color: item.active ? "#EDEDED" : "#666", fontWeight: item.active ? 600 : 400 }}>
            <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.625rem" }}>
          <Avatar initials="SK" size={28} zIndex={0} borderColor="#333" />
          <div>
            <div style={{ fontFamily: B, fontSize: "0.75rem", color: "#EDEDED", fontWeight: 500 }}>Sarah K.</div>
            <div style={{ fontFamily: M, fontSize: "0.6875rem", color: "#666" }}>MIT</div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, padding: "1.5rem 2rem", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontFamily: D, fontWeight: 700, fontSize: "1.25rem", color: "#EDEDED", margin: 0, letterSpacing: "-0.02em" }}>Your Projects</h2>
            <p style={{ fontFamily: B, fontSize: "0.8125rem", color: "#666", margin: "0.25rem 0 0" }}>4 active projects {"·"} 14 team members</p>
          </div>
          <button style={{ background: "#EDEDED", color: "#0A0A0A", fontFamily: B, fontWeight: 600, fontSize: "0.8125rem", padding: "0.5rem 1.125rem", borderRadius: 10, border: "none", cursor: "pointer" }}>+ New Project</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.875rem" }}>
          {projects.map((p, i) => (
            <div key={i} style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: "1.125rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.625rem" }}>
                <span style={{ fontFamily: D, fontWeight: 600, fontSize: "0.875rem", color: "#EDEDED" }}>{p.title}</span>
                <span className={`badge badge-${badgeColor(p.status)}`}>{p.status}</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden", marginBottom: "0.75rem" }}>
                <div style={{ height: "100%", width: `${p.progress}%`, background: "rgba(255,255,255,0.2)", borderRadius: 99 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  {Array.from({ length: Math.min(p.members, 3) }).map((_, j) => (
                    <Avatar key={j} initials={AVATARS[j]} size={20} zIndex={j} borderColor="#0A0A0A" />
                  ))}
                  {p.members > 3 && <span style={{ fontFamily: M, fontSize: "0.625rem", color: "#666", marginLeft: "0.25rem", alignSelf: "center" }}>+{p.members - 3}</span>}
                </div>
                <span style={{ fontFamily: M, fontSize: "0.6875rem", color: "#555" }}>{p.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NewLandingHero() {
  const root = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=600vh",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Beat 1: "2 AM." — hold readable for ~50vh
      tl.fromTo(".b1-time", { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.06, ease: "power3.out" }, 0);

      // Fade scroll indicator in then out
      tl.fromTo(".scroll-indicator", { opacity: 0 }, { opacity: 0.5, duration: 0.04, ease: "power2.out" }, 0.02);
      tl.to(".scroll-indicator", { opacity: 0, duration: 0.04, ease: "power2.in" }, 0.06);

      // Compress "2 AM." to corner — slow enough to feel intentional
      tl.to(".b1-time", { x: -220, y: -160, scale: 0.18, duration: 0.12, ease: "power3.inOut" }, 0.10);

      // Beat 2: "The world is quiet." + UI — hold for ~120vh (comfortable reading)
      tl.fromTo(".b2-line", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.08, ease: "power2.out" }, 0.22);
      tl.fromTo(".b2-toast", { opacity: 0, x: 30, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: 0.06, ease: "power2.out" }, 0.26);
      tl.fromTo(".b2-presence", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.28);

      // Fade out beat 1+2
      tl.to(".b1-time, .b2-line, .b2-toast, .b2-presence", { opacity: 0, duration: 0.06, ease: "power2.in" }, 0.42);

      // Beat 3: Cards, code, activity — hold for ~100vh
      tl.fromTo(".b3-card1", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.48);
      tl.fromTo(".b3-card2", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.51);
      tl.fromTo(".b3-code", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.53);
      tl.fromTo(".b3-activity", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.55);
      tl.fromTo(".b3-line2", { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.06, ease: "power2.out" }, 0.57);

      // Fade out beat 3
      tl.to(".b3-card1, .b3-card2, .b3-code, .b3-activity, .b3-line2", { opacity: 0, duration: 0.06, ease: "power2.in" }, 0.68);

      // Beat 4: Dashboard — hold for ~80vh
      tl.fromTo(".b4-dash", { opacity: 0, scale: 0.94, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.72);

      tl.to(".b4-dash", { opacity: 0.12, duration: 0.06, ease: "power2.in" }, 0.82);

      // Beat 5: "Hive."
      tl.fromTo(".b5-title", { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.06, ease: "power3.out" }, 0.85);

      // Beat 6: CTA
      tl.fromTo(".b6-cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.92);

      // Fade out atmosphere as pin ends so post-pin sections have clean bg
      // (removed — atmosphere stays for visual continuity)

      // ─── Cinematic post-pin reveals (scrub-linked) ───

      // What is Hive — label slides left, heading reveals line-by-line, body fades up
      const aboutTl = gsap.timeline({
        scrollTrigger: { trigger: ".about-intro", start: "top 80%", end: "top 20%", scrub: 1 },
      });
      aboutTl.fromTo(".about-label", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }, 0);
      aboutTl.fromTo(".about-heading", { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }, { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.35, ease: "power3.out" }, 0.05);
      aboutTl.fromTo(".about-body", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.2);

      // How it works — each step reveals with stagger
      const howTl = gsap.timeline({
        scrollTrigger: { trigger: ".about-how", start: "top 80%", end: "top 15%", scrub: 1 },
      });
      howTl.fromTo(".how-label", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.15, ease: "power2.out" }, 0);
      const howSteps = gsap.utils.toArray<HTMLElement>(".how-step");
      howSteps.forEach((step, i) => {
        const offset = 0.08 + i * 0.12;
        howTl.fromTo(step.querySelector(".step-num")!, { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "power3.out" }, offset);
        howTl.fromTo(step.querySelector(".step-title")!, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, offset + 0.06);
        howTl.fromTo(step.querySelector(".step-body")!, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, offset + 0.1);
      });

      // Features — label + grid draws in, cards stagger
      const featTl = gsap.timeline({
        scrollTrigger: { trigger: ".about-feat", start: "top 80%", end: "top 10%", scrub: 1 },
      });
      featTl.fromTo(".feat-label", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.15, ease: "power2.out" }, 0);
      featTl.fromTo(".feat-grid", { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "power2.out" }, 0.05);
      const featCards = gsap.utils.toArray<HTMLElement>(".feat-card");
      featCards.forEach((card, i) => {
        featTl.fromTo(card, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.08 + i * 0.06);
      });

      // Final CTA — scale up from center
      const ctaTl = gsap.timeline({
        scrollTrigger: { trigger: ".about-cta", start: "top 80%", end: "top 35%", scrub: 1 },
      });
      ctaTl.fromTo(".cta-heading", { opacity: 0, scale: 0.94, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0);
      ctaTl.fromTo(".cta-body", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }, 0.1);
      ctaTl.fromTo(".cta-btn", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.18);
      ctaTl.fromTo(".cta-note", { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "power2.out" }, 0.25);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} style={{ position: "relative", background: "#0A0A0A" }}>
      {/* LAYER 1: Atmosphere */}
      <div className="atmo" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, background: "#0A0A0A" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(255,255,255,0.035) 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.015) 0%, transparent 50%)" }} />
      </div>

      {/* LAYER 2: Pinned experience */}
      <section ref={pinRef} style={{ height: "100vh", position: "relative", overflow: "hidden", zIndex: 1 }}>
        {/* Beat 1: "2 AM." */}
        <h1 className="b1-time" style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: D, fontWeight: 800,
          fontSize: "clamp(5rem, 15vw, 16rem)",
          lineHeight: 0.88, letterSpacing: "-0.06em",
          color: "#EDEDED", whiteSpace: "nowrap",
          opacity: 0, zIndex: 2,
        }}>
          2 AM<span style={{ opacity: 0.3 }}>.</span>
        </h1>

        {/* Scroll indicator */}
        <div className="scroll-indicator" style={{
          position: "absolute", bottom: "6%", left: "50%",
          transform: "translateX(-50%)", display: "flex",
          flexDirection: "column", alignItems: "center", gap: 8,
          opacity: 0, zIndex: 5,
        }}>
          <span style={{ fontFamily: M, fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#555", fontWeight: 500 }}>
            scroll
          </span>
          <div style={{
            width: 1, height: 28, background: "linear-gradient(to bottom, #555, transparent)",
          }} />
        </div>

        {/* Beat 2: Typography + UI */}
        <div className="b2-line" style={{
          position: "absolute", left: "8%", top: "42%",
          fontFamily: D, fontWeight: 400,
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          lineHeight: 1.3, letterSpacing: "-0.02em",
          color: "#EDEDED", opacity: 0, zIndex: 3,
        }}>
          The world is quiet.<br />
          <span style={{ color: "#666" }}>But ideas aren&#39;t.</span>
        </div>

        <NotificationFragment className="b2-toast" />
        <TeamPresence className="b2-presence" />

        {/* Beat 3: Cards + Code + Activity */}
        <ProjectCardFragment
          className="b3-card1"
          title="CampusConnect"
          desc="Campus event management for student organizations"
          status="Active"
          members={["SK", "MR", "JD", "AL"]}
          style={{ left: "6%", top: "12%", opacity: 0, zIndex: 4 }}
        />
        <ProjectCardFragment
          className="b3-card2"
          title="HackHub"
          desc="Hackathon project management and team formation"
          status="In Progress"
          members={["RW", "JD", "SK"]}
          style={{ left: "6%", bottom: "18%", opacity: 0, zIndex: 4 }}
        />
        <CodeFragment className="b3-code" />
        <ActivityFragment className="b3-activity" />
        <div className="b3-line2" style={{
          position: "absolute", left: "50%", bottom: "8%",
          transform: "translateX(-50%)",
          fontFamily: D, fontWeight: 400,
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          lineHeight: 1.3, letterSpacing: "-0.02em",
          color: "#EDEDED", opacity: 0, textAlign: "center", zIndex: 4,
        }}>
          Every project needs<br />
          <span style={{ fontWeight: 700 }}>a team.</span>
        </div>

        {/* Beat 4: Dashboard */}
        <DashboardFragment className="b4-dash" />

        {/* Beat 5: "Hive." */}
        <h1 className="b5-title" style={{
          position: "absolute", left: "50%", top: "38%",
          transform: "translate(-50%, -50%)",
          fontFamily: D, fontWeight: 800,
          fontSize: "clamp(5rem, 15vw, 16rem)",
          lineHeight: 0.88, letterSpacing: "-0.06em",
          color: "#EDEDED", whiteSpace: "nowrap",
          opacity: 0, textAlign: "center", zIndex: 10,
        }}>
          Hive<span style={{ opacity: 0.3 }}>.</span>
        </h1>

        {/* Beat 6: CTA */}
        <div className="b6-cta" style={{
          position: "absolute", left: "50%", bottom: "12%",
          transform: "translateX(-50%)",
          textAlign: "center", opacity: 0, zIndex: 10,
        }}>
          <p style={{ fontFamily: B, fontWeight: 400, fontSize: "clamp(1.25rem, 2.5vw, 2rem)", color: "#999", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
            Stop scrolling. Start building.
          </p>
          <Link href="/signup" style={{
            display: "inline-flex", alignItems: "center", gap: "0.625rem",
            padding: "0.875rem 2.25rem", background: "#EDEDED", color: "#0A0A0A",
            fontFamily: D, fontWeight: 700, fontSize: "0.9375rem",
            borderRadius: 12, textDecoration: "none",
            transition: "opacity 0.2s",
          }}>
            Join the hive
          </Link>
          <p style={{ marginTop: "1.25rem", fontFamily: M, fontSize: "0.6875rem", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600 }}>
            Free forever {"·"} Verified students only
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          POST-PIN: ABOUT HIVE — cinematic continuation
      ═══════════════════════════════════════════════════════════════════ */}

      {/* ── What is Hive ── */}
      <section className="about-intro" style={{
        position: "relative", zIndex: 1,
        padding: "clamp(8rem, 18vh, 16rem) clamp(1.5rem, 8vw, 10rem)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 50% at 30% 60%, rgba(255,255,255,0.025) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 900, position: "relative" }}>
          <span className="about-label" style={{
            fontFamily: M, fontSize: "0.6875rem", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: "#555", display: "block", marginBottom: "2rem",
          }}>
            00 — Introduction
          </span>
          <h2 className="about-heading" style={{
            fontFamily: D, fontWeight: 800,
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            lineHeight: 1.02, letterSpacing: "-0.045em",
            color: "#EDEDED", margin: 0, marginBottom: "2.5rem",
          }}>
            Find your crew.<br />Build something real.
          </h2>
          <p className="about-body" style={{
            fontFamily: B, fontWeight: 400,
            fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
            lineHeight: 1.75, color: "#777",
            maxWidth: 560, margin: 0,
          }}>
            Hive is where campus builders come together. Whether you&#39;re coding
            a hackathon project at 2 AM, looking for a design partner for your
            startup idea, or just want to ship something real with smart
            people — Hive makes it happen.
          </p>
          <p className="about-body" style={{
            fontFamily: B, fontWeight: 400,
            fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
            lineHeight: 1.75, color: "#555",
            maxWidth: 560, margin: "1.5rem 0 0",
          }}>
            No noise. No networking. Just building.
          </p>
        </div>
      </section>

      {/* ── Divider line ── */}
      <div style={{
        position: "relative", zIndex: 1,
        height: 1,
        marginLeft: "clamp(1.5rem, 8vw, 10rem)",
        marginRight: "clamp(1.5rem, 8vw, 10rem)",
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
      }} />

      {/* ── How it works ── */}
      <section className="about-how" style={{
        position: "relative", zIndex: 1,
        padding: "clamp(6rem, 14vh, 12rem) clamp(1.5rem, 8vw, 10rem)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 40% at 70% 30%, rgba(255,255,255,0.02) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
        <span className="how-label" style={{
          fontFamily: M, fontSize: "0.6875rem", fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase" as const,
          color: "#555", display: "block", marginBottom: "clamp(3rem, 5vw, 5rem)",
          position: "relative",
        }}>
          01 — How it works
        </span>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(2rem, 4vw, 4rem)",
          position: "relative",
        }}>
          {[
            {
              num: "01",
              title: "Post what you\u2019re building",
              body: "Share your project idea, the skills you need, and your timeline. Whether it\u2019s a weekend hack or a semester-long build.",
            },
            {
              num: "02",
              title: "Get matched with your team",
              body: "Hive connects you with students whose skills complement yours. Filter by campus, availability, tech stack, and ambition.",
            },
            {
              num: "03",
              title: "Ship it together",
              body: "Integrated tools for project management, code sharing, real-time chat, and milestone tracking. Everything in one place.",
            },
          ].map((step) => (
            <div key={step.num} className="how-step" style={{ position: "relative" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(to right, rgba(255,255,255,0.06), transparent)",
                marginBottom: "2rem",
              }} />
              <span className="step-num" style={{
                fontFamily: M, fontWeight: 700,
                fontSize: "clamp(3rem, 5vw, 4.5rem)",
                color: "rgba(255,255,255,0.06)", lineHeight: 1,
                display: "block", marginBottom: "1.5rem",
                letterSpacing: "-0.03em",
              }}>
                {step.num}
              </span>
              <h3 className="step-title" style={{
                fontFamily: D, fontWeight: 700,
                fontSize: "clamp(1.375rem, 2.2vw, 1.875rem)",
                lineHeight: 1.15, letterSpacing: "-0.03em",
                color: "#EDEDED", margin: "0 0 1rem",
              }}>
                {step.title}
              </h3>
              <p className="step-body" style={{
                fontFamily: B, fontWeight: 400,
                fontSize: "clamp(0.875rem, 1vw, 0.9375rem)",
                lineHeight: 1.7, color: "#666",
                margin: 0,
              }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider line ── */}
      <div style={{
        position: "relative", zIndex: 1,
        height: 1,
        marginLeft: "clamp(1.5rem, 8vw, 10rem)",
        marginRight: "clamp(1.5rem, 8vw, 10rem)",
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
      }} />

      {/* ── Features ── */}
      <section className="about-feat" style={{
        position: "relative", zIndex: 1,
        padding: "clamp(6rem, 14vh, 12rem) clamp(1.5rem, 8vw, 10rem)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 50% 60% at 20% 70%, rgba(255,255,255,0.02) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
        <span className="feat-label" style={{
          fontFamily: M, fontSize: "0.6875rem", fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase" as const,
          color: "#555", display: "block", marginBottom: "clamp(3rem, 5vw, 5rem)",
          position: "relative",
        }}>
          02 — Features
        </span>
        <div className="feat-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 18,
          overflow: "hidden",
          opacity: 0,
          position: "relative",
        }}>
          {[
            {
              tag: "Discovery",
              title: "Smart Matching",
              body: "Hive learns what you build and connects you with complementary teammates across your campus.",
            },
            {
              tag: "Collaboration",
              title: "Project Hub",
              body: "Tasks, code, files, and conversations — organized by project. No more scattered group chats.",
            },
            {
              tag: "Communication",
              title: "Real-time Chat",
              body: "Threaded discussions per project with file sharing, code snippets, and @mentions. Context-aware.",
            },
            {
              tag: "Progress",
              title: "Milestone Tracking",
              body: "Set deadlines, track commits, measure velocity. See your team\u2019s progress at a glance.",
            },
            {
              tag: "Campus",
              title: "Verified Networks",
              body: "Only verified students. Build within your campus network or reach across universities.",
            },
            {
              tag: "Events",
              title: "Hackathon Mode",
              body: "Dedicated hackathon workspace with team formation, judging integration, and post-event showcases.",
            },
          ].map((f) => (
            <div key={f.tag} className="feat-card" style={{
              background: "#0A0A0A",
              padding: "clamp(2rem, 3vw, 2.5rem)",
              opacity: 0,
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, bottom: 0, width: 1,
                background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.04), transparent)",
              }} />
              <span style={{
                fontFamily: M, fontSize: "0.625rem", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase" as const,
                color: "#555", display: "block", marginBottom: "1.25rem",
              }}>
                {f.tag}
              </span>
              <h4 style={{
                fontFamily: D, fontWeight: 700,
                fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)",
                lineHeight: 1.15, letterSpacing: "-0.025em",
                color: "#EDEDED", margin: "0 0 0.75rem",
              }}>
                {f.title}
              </h4>
              <p style={{
                fontFamily: B, fontWeight: 400,
                fontSize: "clamp(0.8125rem, 0.9vw, 0.875rem)",
                lineHeight: 1.65, color: "#666", margin: 0,
              }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider line ── */}
      <div style={{
        position: "relative", zIndex: 1,
        height: 1,
        marginLeft: "clamp(1.5rem, 8vw, 10rem)",
        marginRight: "clamp(1.5rem, 8vw, 10rem)",
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
      }} />

      {/* ── Final CTA ── */}
      <section className="about-cta" style={{
        position: "relative", zIndex: 1,
        padding: "clamp(8rem, 20vh, 18rem) clamp(1.5rem, 8vw, 10rem)",
        textAlign: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
        <h2 className="cta-heading" style={{
          fontFamily: D, fontWeight: 800,
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          lineHeight: 1.05, letterSpacing: "-0.04em",
          color: "#EDEDED", margin: "0 0 1.25rem",
          position: "relative",
        }}>
          Ready to build?
        </h2>
        <p className="cta-body" style={{
          fontFamily: B, fontWeight: 400,
          fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)",
          lineHeight: 1.7, color: "#666",
          maxWidth: 440, margin: "0 auto 2.5rem",
          position: "relative",
        }}>
          Your next project, your next team, your next late-night build
          session — it starts here.
        </p>
        <Link className="cta-btn" href="/signup" style={{
          display: "inline-flex", alignItems: "center", gap: "0.625rem",
          padding: "1rem 2.5rem", background: "#EDEDED", color: "#0A0A0A",
          fontFamily: D, fontWeight: 700, fontSize: "1rem",
          borderRadius: 14, textDecoration: "none",
          transition: "opacity 0.2s",
          position: "relative",
        }}>
          Join the hive
        </Link>
        <p className="cta-note" style={{
          marginTop: "1.5rem", fontFamily: M,
          fontSize: "0.6875rem", color: "#555",
          letterSpacing: "0.1em", textTransform: "uppercase" as const,
          fontWeight: 600, position: "relative",
        }}>
          Free forever {"·"} Verified students only
        </p>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        position: "relative", zIndex: 1,
        padding: "2.5rem clamp(1.5rem, 5vw, 4rem)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <HiveLogo size={18} />
          <span style={{ fontFamily: D, fontWeight: 800, fontSize: "0.875rem", letterSpacing: "-0.04em", color: "#666" }}>Hive</span>
        </div>
        <span style={{ fontSize: "0.6875rem", color: "#444", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, fontFamily: M }}>
          {"©"} {new Date().getFullYear()}
        </span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/login" style={{ fontSize: "0.6875rem", color: "#666", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, textDecoration: "none", fontFamily: M }}>Sign in</Link>
          <Link href="/signup" style={{ fontSize: "0.6875rem", color: "#666", letterSpacing: "0.1em", textTransform: "uppercase" as const, fontWeight: 600, textDecoration: "none", fontFamily: M }}>Register</Link>
        </div>
      </footer>
    </div>
  );
}
