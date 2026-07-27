"use client";

import { useRef } from "react";

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Gradient orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[120px]"
        style={{
          background: "radial-gradient(circle, #E85D04 0%, transparent 70%)",
          top: "-10%",
          right: "-5%",
          animation: "float-orb 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
        style={{
          background: "radial-gradient(circle, #E85D04 0%, transparent 70%)",
          bottom: "10%",
          left: "-8%",
          animation: "float-orb 25s ease-in-out infinite reverse",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 hero-grid-bg opacity-40" />

      {/* Floating dots */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 40 }, (_, i) => (
          <circle
            key={i}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r={Math.random() * 2 + 0.5}
            fill="currentColor"
            className="text-foreground"
            opacity={Math.random() * 0.4 + 0.1}
          >
            <animate
              attributeName="opacity"
              values={`${Math.random() * 0.2 + 0.1};${Math.random() * 0.5 + 0.2};${Math.random() * 0.2 + 0.1}`}
              dur={`${Math.random() * 5 + 4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      <style jsx>{`
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}
