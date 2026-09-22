"use client";

import { useEffect, useRef } from "react";
import type { IntradayContent, ScenarioId } from "@/content/intraday/types";
import { useAnnounce } from "./Announcer";
import WfmApp from "./WfmApp";
import { ExperienceProvider, useExperience } from "./store";

type Props = {
  content: IntradayContent;
  note: string;
  illustrative: string;
};

function pad(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function Stage({ content, note, illustrative }: Props) {
  const { act, index, total, goTo, step, restart, signal, setSignal, reforecastOn } =
    useExperience();
  const announce = useAnnounce();
  const acts = content.experience.acts;
  const current = acts[index];
  const signalNote = content.diverges.options.find((option) => option.id === signal);
  const actsRef = useRef<HTMLOListElement>(null);

  /* Narrow screens scroll the act list. Keep the current act in view without
     moving the page, so scrollLeft rather than scrollIntoView. */
  useEffect(() => {
    const list = actsRef.current;
    const chip = list?.querySelector<HTMLElement>("button[aria-current]");
    if (!list || !chip) return;
    const target = chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2;
    const left = Math.max(0, Math.min(target, list.scrollWidth - list.clientWidth));
    if (Math.abs(list.scrollLeft - left) < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [index]);

  function jump(next: (typeof acts)[number]) {
    goTo(next.id);
    announce(next.statement);
  }

  function move(direction: -1 | 1) {
    const target = acts[index + direction];
    if (!target) return;
    step(direction);
    announce(target.statement);
  }

  function pickSignal(id: ScenarioId) {
    setSignal(id);
    const note = content.diverges.options.find((option) => option.id === id);
    if (note) announce(note.label);
  }

  return (
    <section id="product" className="ix-stage" aria-labelledby="ix-statement">
      <div className="ix-console">
        <div className="ix-console__inner">
          <p className="ix-console__label">{content.experience.label}</p>
          <ol className="ix-acts" ref={actsRef}>
            {acts.map((item, position) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={item.id === act ? "is-current" : position < index ? "is-done" : undefined}
                  aria-current={item.id === act ? "step" : undefined}
                  onClick={() => jump(item)}
                >
                  <span className="ix-rail__num">{pad(position)}</span>
                  <span className="ix-rail__name">{item.label}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="ix-transport">
            <button type="button" className="ixbtn" onClick={() => move(-1)} disabled={index === 0}>
              {content.system.back}
            </button>
            <button
              type="button"
              className="ixbtn ixbtn--primary"
              onClick={() => move(1)}
              disabled={index === total - 1}
            >
              {content.system.next}
            </button>
            <button type="button" className="ixbtn ixbtn--quiet" onClick={restart}>
              {content.experience.restart}
            </button>
          </div>
        </div>
      </div>

      <div className="ix-stage__inner">
        <div className="ix-main">
          <div className="ix-act">
            <p className="ix-act__index">
              <span>{pad(index)}</span> / {pad(total - 1)}
            </p>
            <h2 id="ix-statement" className="ix-act__statement">
              {current.statement}
            </h2>
            <p className="ix-act__line">{current.line}</p>

            {act === "divergence" ? (
              <div className="ix-signal">
                <div className="ix-signal__seg" role="group" aria-label={content.diverges.groupLabel}>
                  {content.diverges.options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={option.id === signal ? "is-on" : undefined}
                      aria-pressed={option.id === signal}
                      onClick={() => pickSignal(option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="ix-signal__note">{signalNote?.note}</p>
              </div>
            ) : null}

            {act === "permission" && reforecastOn ? (
              <p className="ix-caveat">{content.decisionOne.onLine}</p>
            ) : null}
          </div>

          <WfmApp content={content} />

          <div className="ix-foot">
            <p className="ix-recon">
              <span className="ix-recon__tag">{illustrative}</span>
              <span>{note}</span>
            </p>
            <p className="ix-hint">{content.experience.hint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Experience(props: Props) {
  return (
    <ExperienceProvider>
      <Stage {...props} />
    </ExperienceProvider>
  );
}
