"use client";

import { useSyncExternalStore } from "react";
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

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const dark = useSyncExternalStore(subscribe, isDarkApplied, () => false);

  const toggle = () => {
    const next: ThemeMode = isDarkApplied() ? "light" : "dark";
    storeTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      className={`theme-link ${className}`.trim()}
      onClick={toggle}
      aria-label={dark ? UI.theme.toLight : UI.theme.toDark}
    >
      {dark ? UI.theme.toggleToLight : UI.theme.toggleToDark}
    </button>
  );
}
