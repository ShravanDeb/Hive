"use client";

import dynamic from "next/dynamic";

const LenisScroller = dynamic(() => import("./animated/LenisScroller"), {
  ssr: false,
});

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LenisScroller>{children}</LenisScroller>;
}
