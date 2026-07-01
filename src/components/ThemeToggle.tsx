"use client";

import { useEffect, useState } from "react";
import { UI } from "@/content/ui";
import {
  applyTheme,
  readStoredTheme,
  storeTheme,
  type ThemeMode,
} from "@/lib/theme";

type ThemeToggleProps = {
  className?: string;
};

function isDarkApplied(): boolean {
  return document.documentElement.classList.contains("dark");
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(isDarkApplied());
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const sync = () => setDark(isDarkApplied());
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const observer = new MutationObserver(sync);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    media.addEventListener("change", () => {
      if (readStoredTheme() === "system") {
        applyTheme("system");
        sync();
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  const toggle = () => {
    const nextDark = !isDarkApplied();
    const next: ThemeMode = nextDark ? "dark" : "light";
    storeTheme(next);
    applyTheme(next);
    setDark(nextDark);
  };

  const label = dark ? UI.theme.toggleToLight : UI.theme.toggleToDark;
  const ariaLabel = dark ? UI.theme.toLight : UI.theme.toDark;

  return (
    <button
      type="button"
      className={`text-link type-corpo text-secondary theme-link ${className}`.trim()}
      onClick={toggle}
      aria-label={mounted ? ariaLabel : UI.theme.group}
      disabled={!mounted}
    >
      {mounted ? label : UI.theme.toggleToDark}
    </button>
  );
}
