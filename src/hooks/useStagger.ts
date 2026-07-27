"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseStaggerOptions {
  trigger?: string;
  start?: string;
  stagger?: number;
  duration?: number;
  y?: number;
  scale?: number;
  from?: "start" | "center" | "edges" | "random";
}

export function useStagger(options: UseStaggerOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    trigger,
    start = "top 85%",
    stagger = 0.08,
    duration = 0.6,
    y = 30,
    scale,
    from = "start",
  } = options;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const children = el.children;
    if (!children.length) return;

    const ctx = gsap.context(() => {
      gsap.from(children, {
        y,
        opacity: 0,
        scale: scale || 1,
        duration,
        stagger: { each: stagger, from },
        ease: "power3.out",
        scrollTrigger: {
          trigger: trigger ? el.closest(trigger) || el : el,
          start,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [trigger, start, stagger, duration, y, scale, from]);

  return containerRef;
}
