"use client";

import { useEffect, useRef, useState } from "react";

interface UseMagneticOptions {
  strength?: number;
  spring?: number;
  damping?: number;
}

export function useMagnetic(options: UseMagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const { strength = 0.3, spring = 0.15, damping = 0.8 } = options;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const targetX = (e.clientX - centerX) * strength;
      const targetY = (e.clientY - centerY) * strength;

      velocity.current.x += (targetX - position.x) * spring;
      velocity.current.y += (targetY - position.y) * spring;
      velocity.current.x *= damping;
      velocity.current.y *= damping;

      setPosition((prev) => ({
        x: prev.x + velocity.current.x,
        y: prev.y + velocity.current.y,
      }));
    };

    const handleMouseLeave = () => {
      velocity.current = { x: 0, y: 0 };
      setPosition({ x: 0, y: 0 });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [strength, spring, damping, position.x, position.y]);

  return { ref, x: position.x, y: position.y };
}
