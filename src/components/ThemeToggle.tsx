"use client";

import { useEffect, useState } from "react";
import { UI } from "@/content/ui";
import {
  applyTheme,
  nextThemeMode,
  readStoredTheme,
  storeTheme,
  type ThemeMode,
} from "@/lib/theme";

type ThemeToggleProps = {
  className?: string;
};

const labelByMode: Record<ThemeMode, string> = {
  light: UI.theme.light,
  dark: UI.theme.dark,
  system: UI.theme.system,
};

const nextAriaByMode: Record<ThemeMode, string> = {
  light: UI.theme.toDark,
  dark: UI.theme.toSystem,
  system: UI.theme.toLight,
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMode(readStoredTheme());
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readStoredTheme() === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [mounted]);

  const cycle = () => {
    const next = nextThemeMode(mode);
    storeTheme(next);
    applyTheme(next);
    setMode(next);
  };

  return (
    <button
      type="button"
      className={`btn btn-secondary type-corpo ${className}`.trim()}
      onClick={cycle}
      aria-label={mounted ? nextAriaByMode[mode] : UI.theme.group}
      disabled={!mounted}
    >
      {mounted ? labelByMode[mode] : UI.theme.system}
    </button>
  );
}
