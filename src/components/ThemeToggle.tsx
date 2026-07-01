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

const options: { value: ThemeMode; label: string; ariaLabel: string }[] = [
  { value: "light", label: UI.theme.light, ariaLabel: UI.theme.toLight },
  { value: "dark", label: UI.theme.dark, ariaLabel: UI.theme.toDark },
  { value: "system", label: UI.theme.system, ariaLabel: UI.theme.toSystem },
];

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

  const select = (next: ThemeMode) => {
    storeTheme(next);
    applyTheme(next);
    setMode(next);
  };

  if (!mounted) {
    return (
      <div
        className={`theme-toggle ${className}`.trim()}
        role="radiogroup"
        aria-label={UI.theme.group}
      >
        {options.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className="theme-toggle__option type-nota"
            role="radio"
            aria-checked={value === "system"}
            disabled
          >
            {label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`theme-toggle ${className}`.trim()}
      role="radiogroup"
      aria-label={UI.theme.group}
    >
      {options.map(({ value, label, ariaLabel }) => (
        <button
          key={value}
          type="button"
          className={`theme-toggle__option type-nota${mode === value ? " is-active" : ""}`}
          role="radio"
          aria-checked={mode === value}
          aria-label={ariaLabel}
          onClick={() => select(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
