import { PROJECTS } from "@/data/projects";
import type { Lang } from "@/lib/i18n";

type ProjectGridProps = {
  lang: Lang;
  gridLabel: string;
};

export default function ProjectGrid({ lang, gridLabel }: ProjectGridProps) {
  return (
    <ul className="masonry" aria-label={gridLabel}>
      {PROJECTS.map((project, index) => (
        <li
          key={project.slug}
          className="masonry-item rise"
          style={{ "--stagger": Math.min(index, 6) } as React.CSSProperties}
        >
          <div
            className={`tile tile--${project.tone}`}
            style={{ aspectRatio: project.ratio }}
            aria-hidden="true"
          />
          <div className="tile-caption">
            <h2 className="type-corpo">{project.title[lang]}</h2>
            <p className="type-nota text-secondary">{project.meta[lang]}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
