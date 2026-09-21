"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { projectsByKind, type Project } from "@/data/projects";
import type { Lang } from "@/lib/i18n";

type SectionCopy = {
  title: string;
  empty: string;
};

type ProjectGridProps = {
  lang: Lang;
  product: SectionCopy;
  graphic: SectionCopy;
  openLabel: string;
};

function ProjectRow({
  project,
  lang,
  openLabel,
  index,
  reduceMotion,
}: {
  project: Project;
  lang: Lang;
  openLabel: string;
  index: number;
  reduceMotion: boolean | null;
}) {
  const href = project.href?.[lang];
  const body = (
    <>
      <div className="work-row__text">
        <p className="work-row__title type-heading">{project.title[lang]}</p>
        <p className="work-row__meta type-nota text-secondary">{project.meta[lang]}</p>
      </div>
      {href ? (
        <span className="work-row__action type-meta">{openLabel}</span>
      ) : null}
    </>
  );

  const motionProps = {
    initial: reduceMotion ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 30,
      delay: reduceMotion ? 0 : index * 0.05,
    },
  };

  if (href) {
    return (
      <motion.li className="work-row" {...motionProps}>
        <Link href={href} className="work-row__link">
          {body}
        </Link>
      </motion.li>
    );
  }

  return (
    <motion.li className="work-row work-row--static" {...motionProps}>
      <div className="work-row__link">{body}</div>
    </motion.li>
  );
}

function WorkSection({
  lang,
  kind,
  copy,
  openLabel,
  reduceMotion,
}: {
  lang: Lang;
  kind: "product" | "graphic";
  copy: SectionCopy;
  openLabel: string;
  reduceMotion: boolean | null;
}) {
  const items = projectsByKind(kind);

  return (
    <section className={`work-section work-section--${kind}`} aria-labelledby={`work-${kind}`}>
      <h2 id={`work-${kind}`} className="work-section__title type-meta">
        {copy.title}
      </h2>
      {items.length > 0 ? (
        <ul className="work-list">
          {items.map((project, index) => (
            <ProjectRow
              key={project.slug}
              project={project}
              lang={lang}
              openLabel={openLabel}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </ul>
      ) : (
        <p className="work-section__empty type-nota text-secondary">{copy.empty}</p>
      )}
    </section>
  );
}

export default function ProjectGrid({
  lang,
  product,
  graphic,
  openLabel,
}: ProjectGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="work-index">
      <WorkSection
        lang={lang}
        kind="product"
        copy={product}
        openLabel={openLabel}
        reduceMotion={reduceMotion}
      />
      <WorkSection
        lang={lang}
        kind="graphic"
        copy={graphic}
        openLabel={openLabel}
        reduceMotion={reduceMotion}
      />
    </div>
  );
}
