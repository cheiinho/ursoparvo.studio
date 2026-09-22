"use client";

import type { IntradayContent, Solution } from "@/content/intraday/types";
import WfmApp from "./WfmApp";
import { ExperienceProvider } from "./store";

type Props = {
  content: IntradayContent;
  solution: Solution;
  position: number;
};

/**
 * One solution: what it is, why, and the screen that does it. Each scene keeps
 * its own product state, so the page reads by scrolling and nothing has to be
 * operated to get to the end.
 */
export default function Scene({ content, solution, position }: Props) {
  const headingId = `solution-${solution.id}`;
  const number = String(position).padStart(2, "0");

  return (
    <section id={solution.id} className="ix-scene" aria-labelledby={headingId}>
      <div className="ix-scene__inner">
        <div className="ix-scene__head">
          <p className="ix-scene__num" aria-hidden="true">
            {number}
          </p>
          <div className="ix-scene__copy">
            <h3 id={headingId} className="ix-scene__label">
              {solution.label}
            </h3>
            <p className="ix-scene__statement">{solution.statement}</p>
            <p className="ix-scene__line">{solution.line}</p>
          </div>
        </div>

        <p className="ix-scene__look">
          <span aria-hidden="true">↓</span>
          {solution.look}
        </p>

        <ExperienceProvider view={solution.view}>
          <WfmApp content={content} />
        </ExperienceProvider>
      </div>
    </section>
  );
}
