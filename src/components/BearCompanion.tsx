"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BEAR_LINES, BEAR_MOODS, type BearMood } from "@/constants/bear";

/**
 * Site-wide companion: a small 2D "parvo" bear that lives in the bottom-left
 * margin once you scroll past the hero. It changes mood with scroll velocity,
 * leans with direction, and mutters dry asides. Desktop-only; reduced-motion
 * keeps it still. The 3D velvet bear stays the hero; this is the personality
 * thread that follows you down the page.
 */
export default function BearCompanion() {
  const [mood, setMood] = useState<BearMood>("curious");
  const [visible, setVisible] = useState(false);
  const [line, setLine] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(false);
  const lastLineAt = useRef(0);
  const lineTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const say = useCallback((text?: string, force = false) => {
    const now = performance.now();
    if (!force && now - lastLineAt.current < 7000) return;
    lastLineAt.current = now;
    setLine(
      text ?? BEAR_LINES[Math.floor(Math.random() * BEAR_LINES.length)],
    );
    clearTimeout(lineTimer.current);
    lineTimer.current = setTimeout(() => setLine(null), 2600);
  }, []);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wrap = wrapRef.current;
    let lastY = window.scrollY;
    let v = 0;
    let frame = 0;
    let idleTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY;
        lastY = y;
        v = v * 0.7 + dy * 0.3;
        const vh = window.innerHeight;
        setVisible(y > vh * 0.6);

        if (!reducedRef.current) {
          const av = Math.abs(v);
          if (av > 55) {
            setMood("dizzy");
            if (av > 95) say("ei, devagar.");
          } else if (av > 22) {
            setMood("frazzled");
          } else {
            setMood("curious");
          }
          if (wrap) {
            const lean = Math.max(-12, Math.min(12, -v * 0.4));
            wrap.style.setProperty("--lean", `${lean.toFixed(1)}deg`);
          }
        }

        if (y + vh >= document.documentElement.scrollHeight - 4) {
          say("fim. obrigado.");
        }

        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          setMood("calm");
          if (wrap) wrap.style.setProperty("--lean", "0deg");
        }, 900);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(idleTimer);
      clearTimeout(lineTimer.current);
    };
  }, [say]);

  return (
    <div
      ref={wrapRef}
      className={`bear-companion${visible ? " is-visible" : ""}`}
    >
      {line && (
        <span className="bear-companion__say" aria-hidden>
          {line}
        </span>
      )}
      <button
        type="button"
        className="bear-companion__btn"
        onClick={() => {
          setMood("curious");
          say(undefined, true);
        }}
        aria-label="Poke the bear"
        data-cursor-hover
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BEAR_MOODS[mood]}
          alt=""
          width={64}
          height={64}
          draggable={false}
        />
      </button>
    </div>
  );
}
