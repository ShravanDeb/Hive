"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HiveLogo from "@/components/HiveLogo";

const D = "var(--font-display), system-ui, sans-serif";
const B = "var(--font-body), system-ui, sans-serif";
const M = "var(--font-mono), monospace";

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

export default function OnboardingPage() {
  const router = useRouter();
  const [name,       setName]       = useState("");
  const [department, setDepartment] = useState("");
  const [year,       setYear]       = useState("");
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!department) {
      setError("Please select your department / course.");
      setLoading(false);
      return;
    }
    if (!year) {
      setError("Please select your year of study.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(name.trim() ? { name: name.trim() } : {}),
          department,
          year: Number(year),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save profile.");

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#0A0A0A" }}>
      {/* ── Left panel: Editorial ── */}
      <div className="hidden lg:flex" style={{
        width: "52%", position: "relative", flexDirection: "column",
        justifyContent: "space-between", padding: "clamp(2rem, 3vw, 3rem)",
        overflow: "hidden",
      }}>
        {/* Atmosphere */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(255,255,255,0.035) 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 70%, rgba(255,255,255,0.02) 0%, transparent 50%)" }} />

        {/* Top */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, position: "relative", zIndex: 10 }}>
          <HiveLogo size={22} />
          <span style={{ fontFamily: D, fontWeight: 800, fontSize: "0.9375rem", letterSpacing: "-0.04em", color: "#EDEDED" }}>Hive</span>
        </Link>

        {/* Center editorial */}
        <div style={{ position: "relative", zIndex: 10, maxWidth: 440 }}>
          <h1 style={{
            fontFamily: D, fontWeight: 800,
            fontSize: "clamp(3rem, 5vw, 5rem)",
            lineHeight: 0.9, letterSpacing: "-0.05em",
            color: "#EDEDED", margin: 0,
          }}>
            One step<br />closer<span style={{ opacity: 0.3 }}>.</span>
          </h1>
          <p style={{
            fontFamily: B, fontSize: "clamp(0.875rem, 1vw, 1rem)",
            lineHeight: 1.75, color: "#666",
            maxWidth: "34ch", marginTop: "2rem",
          }}>
            Tell us about yourself so we can connect you with the right teammates and projects.
          </p>
        </div>

        {/* Bottom accent */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.15)", marginBottom: 16 }} />
          <p style={{
            fontFamily: M, fontSize: "0.625rem", fontWeight: 600,
            letterSpacing: "0.15em", textTransform: "uppercase" as const,
            color: "#555",
          }}>
            Almost there
          </p>
        </div>
      </div>

      {/* ── Right panel: Form ── */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(1.5rem, 3vw, 3rem)", position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(255,255,255,0.015) 0%, transparent 100%)" }} />
        <div style={{ width: "100%", maxWidth: 380, position: "relative" }}>

          {/* Mobile logo */}
          <div className="lg:hidden" style={{ textAlign: "center", marginBottom: 40 }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <HiveLogo size={22} />
              <span style={{ fontFamily: D, fontWeight: 800, fontSize: "0.9375rem", letterSpacing: "-0.04em", color: "#EDEDED" }}>Hive</span>
            </Link>
          </div>

          <div>
            <h2 style={{
              fontFamily: D, fontWeight: 800,
              fontSize: "clamp(1.5rem, 2vw, 1.75rem)",
              letterSpacing: "-0.03em", color: "#EDEDED",
              margin: "0 0 0.5rem",
            }}>Complete your profile</h2>
            <p style={{
              fontFamily: B, fontSize: "0.8125rem", color: "#666",
              lineHeight: 1.6, marginBottom: 32,
            }}>
              Tell us your department and year to personalize your experience.
            </p>

            {error && (
              <div style={{
                padding: "0.75rem 1rem", marginBottom: 20, fontSize: "0.75rem",
                borderRadius: 10, background: "rgba(220,38,38,0.08)", color: "#f87171",
                border: "1px solid rgba(220,38,38,0.15)",
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{
                  fontFamily: M, fontSize: "0.6875rem", fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase" as const,
                  color: "#666", display: "block", marginBottom: 6,
                }}>Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="hive-input"
                />
              </div>

              <div>
                <label style={{
                  fontFamily: M, fontSize: "0.6875rem", fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase" as const,
                  color: "#666", display: "block", marginBottom: 6,
                }}>
                  Department / Course <span style={{ color: "#f87171" }}>*</span>
                </label>
                <select
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="hive-input"
                  style={{ cursor: "pointer" }}
                >
                  <option value="">Select your department…</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  fontFamily: M, fontSize: "0.6875rem", fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase" as const,
                  color: "#666", display: "block", marginBottom: 6,
                }}>
                  Year of Study <span style={{ color: "#f87171" }}>*</span>
                </label>
                <select
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="hive-input"
                  style={{ cursor: "pointer" }}
                >
                  <option value="">Select year…</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", height: 44, borderRadius: 12,
                  background: "#EDEDED", color: "#0A0A0A",
                  fontFamily: D, fontWeight: 700, fontSize: "0.8125rem",
                  border: "none", cursor: "pointer",
                  opacity: loading ? 0.5 : 1,
                  transition: "opacity 0.15s",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 8, marginTop: 8,
                }}
              >
                {loading ? "Saving..." : "Complete Profile & Start →"}
              </button>
            </form>
          </div>

          <p style={{
            textAlign: "center", fontFamily: B, fontSize: "0.75rem",
            color: "#555", marginTop: 32,
          }}>
            <Link href="/dashboard" style={{ fontWeight: 600, color: "#EDEDED", textDecoration: "none" }}>
              Skip for now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
