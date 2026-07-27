"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import HiveLogo from "@/components/HiveLogo";
import StudentIdModal from "@/components/StudentIdModal";

const D = "var(--font-display), system-ui, sans-serif";
const B = "var(--font-body), system-ui, sans-serif";
const M = "var(--font-mono), monospace";

export default function SignupPage() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#0A0A0A" }}>
      {/* ── Left panel: Editorial statement ── */}
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
            Start<br />building<span style={{ opacity: 0.3 }}>.</span>
          </h1>
          <p style={{
            fontFamily: B, fontSize: "clamp(0.875rem, 1vw, 1rem)",
            lineHeight: 1.75, color: "#666",
            maxWidth: "34ch", marginTop: "2rem",
          }}>
            Create your account and find your next team. Verified students only.
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
            Free forever for students
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
            }}>Create your account</h2>
            <p style={{
              fontFamily: B, fontSize: "0.8125rem", color: "#666",
              lineHeight: 1.6, marginBottom: 32,
            }}>
              Have an official college email? Sign in directly with your{" "}
              <span style={{ fontWeight: 600, color: "#aaa" }}>.edu / .ac.in</span> Google account.
            </p>

            {/* Continue with Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              style={{
                width: "100%", height: 44, padding: "0 16px",
                borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)",
                background: "transparent", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 10, fontFamily: B, fontSize: "0.8125rem", fontWeight: 500,
                color: "#EDEDED", opacity: googleLoading ? 0.5 : 1,
                transition: "background 0.15s",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              {googleLoading ? "Connecting to Google..." : "Continue with Google (.edu / .ac.in)"}
            </button>

            {/* Student ID Verification */}
            <div style={{
              marginTop: 28, paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.04)",
              textAlign: "center",
            }}>
              <p style={{ fontFamily: B, fontSize: "0.6875rem", color: "#555", margin: "0 0 6px" }}>
                Don&apos;t have a .edu email address?
              </p>
              <button
                type="button"
                onClick={() => setShowIdModal(true)}
                style={{
                  fontFamily: B, fontSize: "0.75rem", fontWeight: 600,
                  color: "#EDEDED", background: "none", border: "none",
                  cursor: "pointer", padding: 0,
                }}
              >
                Upload Student ID for Verification →
              </button>
            </div>
          </div>

          <p style={{
            textAlign: "center", fontFamily: B, fontSize: "0.75rem",
            color: "#555", marginTop: 32,
          }}>
            Already have an account?{" "}
            <Link href="/login" style={{ fontWeight: 600, color: "#EDEDED", textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <StudentIdModal isOpen={showIdModal} onClose={() => setShowIdModal(false)} />
    </div>
  );
}
