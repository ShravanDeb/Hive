"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseTextRevealOptions {
  trigger?: string;
  start?: string;
  stagger?: number;
  duration?: number;
  y?: number;
  splitBy?: "chars" | "words" | "lines";
}

export function useTextReveal(options: UseTextRevealOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    trigger,
    start = "top 85%",
    stagger = 0.03,
    duration = 0.8,
    y = 40,
    splitBy = "chars",
  } = options;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    // Wrap each target's text content in spans
    targets.forEach((target) => {
      const text = target.textContent || "";
      if (splitBy === "chars") {
        target.innerHTML = text
          .split("")
          .map((char) =>
            char === " "
              ? " "
              : `<span class="inline-block" style="will-change:transform,opacity">${char}</span>`
          )
          .join("");
      } else if (splitBy === "words") {
        target.innerHTML = text
          .split(" ")
          .map(
            (word) =>
              `<span class="inline-block" style="will-change:transform,opacity">${word}</span>`
          )
          .join(" ");
      }
    });

    const spans = el.querySelectorAll("[data-reveal] span");

    const ctx = gsap.context(() => {
      gsap.from(spans, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trigger ? el.closest(trigger) || el : el,
          start,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [trigger, start, stagger, duration, y, splitBy]);

  return containerRef;
}
