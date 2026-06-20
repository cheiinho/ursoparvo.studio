"use client";

import { useEffect, useState } from "react";

/**
 * Branded entrance: a paper curtain with a serif "olá" that wipes up to reveal
 * the site. Plays once per session (sessionStorage), skips on reduced-motion,
 * and lifts within ~1.6s. The real content renders underneath the whole time,
 * so the overlay is purely decorative (aria-hidden) and never blocks access.
 */
export default function Intro() {
  // Render the curtain on the first paint for everyone; the effect removes it
  // instantly for repeat visitors / reduced-motion, or plays it once otherwise.
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen = sessionStorage.getItem("up_intro");
    const root = document.documentElement;

    if (reduced || seen) {
      setDone(true);
      return;
    }
    sessionStorage.setItem("up_intro", "1");
    root.classList.add("intro-lock");

    const lift = setTimeout(() => root.classList.add("intro-lift"), 850);
    const finish = setTimeout(() => {
      setDone(true);
      root.classList.remove("intro-lock", "intro-lift");
    }, 1650);

    return () => {
      clearTimeout(lift);
      clearTimeout(finish);
      root.classList.remove("intro-lock", "intro-lift");
    };
  }, []);

  if (done) return null;

  return (
    <div className="intro" aria-hidden>
      <span className="intro__word">olá</span>
    </div>
  );
}
