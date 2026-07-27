"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
  start?: string;
  end?: string;
}

export function useParallax(options: UseParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { speed = 0.3, direction = "up", start = "top bottom", end = "bottom top" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const yPercent = direction === "up" ? -speed * 100 : speed * 100;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 1.5,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed, direction, start, end]);

  return ref;
}
