"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  splitBy?: "chars" | "words" | "lines";
  stagger?: number;
  duration?: number;
  y?: number;
  delay?: number;
  trigger?: string;
}

export default function AnimatedText({
  children,
  as: Tag = "h2",
  className,
  splitBy = "chars",
  stagger = 0.03,
  duration = 0.8,
  y = 40,
  delay = 0,
  trigger,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const textEl = el.querySelector("[data-text]");
    if (!textEl) return;

    const text = children;
    let elements: HTMLElement[] = [];

    if (splitBy === "chars") {
      textEl.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? " "
            : `<span class="inline-block will-change-transform">${char}</span>`
        )
        .join("");
      elements = Array.from(textEl.querySelectorAll("span"));
    } else if (splitBy === "words") {
      textEl.innerHTML = text
        .split(" ")
        .map(
          (word) =>
            `<span class="inline-block will-change-transform">${word}</span>`
        )
        .join(" ");
      elements = Array.from(textEl.querySelectorAll("span"));
    } else {
      elements = [textEl as HTMLElement];
    }

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        y,
        opacity: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trigger ? el.closest(trigger) || el : el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [children, splitBy, stagger, duration, y, delay, trigger]);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <Tag data-text aria-label={children}>
        {children}
      </Tag>
    </div>
  );
}
