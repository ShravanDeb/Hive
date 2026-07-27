"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface UseTextScrambleOptions {
  characters?: string;
  speed?: number;
  maxIterations?: number;
}

export function useTextScramble(options: UseTextScrambleOptions = {}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { characters = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", speed = 30, maxIterations = 15 } = options;

  const animate = (finalText: string) => {
    const el = ref.current;
    if (!el) return;

    const chars = characters.split("");
    const originalText = finalText.split("");
    const iterations = maxIterations;

    let currentIteration = 0;

    const interval = setInterval(() => {
      el.textContent = originalText
        .map((char, index) => {
          if (index < currentIteration) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      currentIteration++;

      if (currentIteration > originalText.length) {
        clearInterval(interval);
        el.textContent = finalText;
      }
    }, speed);

    return () => clearInterval(interval);
  };

  return { ref, animate };
}
