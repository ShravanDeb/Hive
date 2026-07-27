"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

interface HiveLogoProps {
  size?: number;
}

export default function HiveLogo({ size = 40 }: HiveLogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveTheme = mounted ? theme : "light";
  const color = effectiveTheme === "dark" ? "#F5F0EB" : "#1A1A1A";
  const accentColor = effectiveTheme === "dark" ? "#FF7A2F" : "#E85D04";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Hexagon shape */}
      <path
        d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
        fill={accentColor}
        stroke={color}
        strokeWidth="3"
      />
      {/* Inner honeycomb pattern */}
      <path
        d="M50 20 L72 32.5 L72 57.5 L50 70 L28 57.5 L28 32.5 Z"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.3"
      />
      <path
        d="M50 32 L61 38.5 L61 51.5 L50 58 L39 51.5 L39 38.5 Z"
        fill={color}
        opacity="0.15"
      />
      {/* Center dot */}
      <circle cx="50" cy="45" r="4" fill={color} />
    </svg>
  );
}
