"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    setDark(next);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className={`public-control-link text-nav ${className}`}
        aria-label="Alternar tema"
        disabled
      >
        Tema
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`public-control-link text-nav ${className}`}
      onClick={toggle}
      aria-label={dark ? "Activar modo claro" : "Activar modo escuro"}
      aria-pressed={dark}
    >
      {dark ? "Claro" : "Escuro"}
    </button>
  );
}
