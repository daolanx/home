"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ParticleCanvas = dynamic(
  () => import("@/components/ui/particle-canvas").then((mod) => mod.ParticleCanvas),
  { ssr: false, loading: () => null },
);

export function ParticleCanvasWrapper() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = requestIdleCallback(() => setShow(true));
    return () => cancelIdleCallback(id);
  }, []);

  if (!show) return null;
  return <ParticleCanvas />;
}
