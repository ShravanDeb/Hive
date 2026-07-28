"use client";

interface HiveLogoProps {
  size?: number;
}

export default function HiveLogo({ size = 40 }: HiveLogoProps) {
  return (
    <img
      src="/icon.png"
      alt="Hive"
      width={size}
      height={size}
      className="shrink-0 rounded-[4px]"
      draggable={false}
    />
  );
}
