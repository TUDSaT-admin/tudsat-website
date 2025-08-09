"use client";

import dynamic from "next/dynamic";

const StarrySkyCanvas = dynamic(() => import("@/components/starry-sky-canvas"), {
  ssr: false,
});

export default function Background() {
  return <StarrySkyCanvas />;
}
