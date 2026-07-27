"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  className?: string;
  characters?: string;
  speed?: number;
  trigger?: boolean;
}

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function TextScramble({
  text,
  className,
  characters = CHARS,
  speed = 30,
  trigger = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    if (!trigger) return;

    const chars = characters.split("");
    const originalText = text.split("");
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .map((char, index) => {
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration++;

      if (iteration > originalText.length) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, characters, speed, trigger]);

  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {displayText}
    </span>
  );
}
