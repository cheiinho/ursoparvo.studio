"use client";

import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";
import type { ThemeDict } from "@/content/dict/types";
import {
  applyTheme,
  readStoredTheme,
  storeTheme,
  type ThemeMode,
} from "@/lib/theme";

type ThemeToggleProps = {
  labels: ThemeDict;
  className?: string;
};

function isDarkApplied(): boolean {
  return document.documentElement.classList.contains("dark");
}

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onMediaChange = () => {
    if (readStoredTheme() === "system") {
      applyTheme("system");
    }
    onChange();
  };
  media.addEventListener("change", onMediaChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onMediaChange);
  };
}

export default function ThemeToggle({ labels, className = "" }: ThemeToggleProps) {
  const dark = useSyncExternalStore(subscribe, isDarkApplied, () => false);

  const toggle = () => {
    const next: ThemeMode = isDarkApplied() ? "light" : "dark";
    storeTheme(next);
    applyTheme(next);
  };

  return (
    <motion.button
      type="button"
      className={`theme-link ${className}`.trim()}
      onClick={toggle}
      aria-label={dark ? labels.toLight : labels.toDark}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, rotate: -30 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <span className="theme-dot" aria-hidden="true" />
    </motion.button>
  );
}
