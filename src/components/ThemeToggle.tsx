"use client";

import { useEffect, useState } from "react";
import {
  applyTheme,
  readStoredTheme,
  storeTheme,
  type ThemeMode,
} from "@/lib/theme";

type ThemeToggleProps = {
  className?: string;
};

const options: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "Claro" },
  { value: "dark", label: "Escuro" },
  { value: "system", label: "Sistema" },
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
        aria-label="Tema"
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
      aria-label="Tema"
    >
      {options.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={`theme-toggle__option type-nota${mode === value ? " is-active" : ""}`}
          role="radio"
          aria-checked={mode === value}
          aria-label={
            value === "light"
              ? "Tema claro"
              : value === "dark"
                ? "Tema escuro"
                : "Tema do sistema"
          }
          onClick={() => select(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
