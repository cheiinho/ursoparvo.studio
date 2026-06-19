"use client";

import { useEffect, useState } from "react";
import { FlowGradientBackground } from "@/components/ui/flow-gradient-hero-section";
import { GradientBackground } from "@/components/ui/gradient-backgrounds";

export function SiteBackground() {
  const [useStatic, setUseStatic] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setMode = () => setUseStatic(reduced.matches);
    setMode();
    reduced.addEventListener("change", setMode);
    return () => reduced.removeEventListener("change", setMode);
  }, []);

  if (useStatic) {
    return <GradientBackground variant="indigo" />;
  }

  return <FlowGradientBackground />;
}
