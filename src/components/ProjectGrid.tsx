"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import type { Lang } from "@/lib/i18n";

type ProjectGridProps = {
  lang: Lang;
  gridLabel: string;
};

export default function ProjectGrid({ lang, gridLabel }: ProjectGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="masonry" aria-label={gridLabel}>
      {PROJECTS.map((project, index) => (
        <motion.li
          key={project.slug}
          className="masonry-item"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
            delay: reduceMotion ? 0 : Math.min(index, 8) * 0.06,
          }}
        >
          <motion.div
            className={`tile tile--${project.tone}`}
            style={{ aspectRatio: project.ratio }}
            initial="rest"
            whileHover="hover"
            whileTap="hover"
          >
            <span className="sr-only">{project.title[lang]}</span>
            <motion.div
              className="tile-overlay"
              aria-hidden="true"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
            >
              <motion.span
                className="tile-overlay__name type-corpo"
                variants={{
                  rest: { y: reduceMotion ? 0 : 8 },
                  hover: { y: 0 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              >
                {project.title[lang]}
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.li>
      ))}
    </ul>
  );
}
