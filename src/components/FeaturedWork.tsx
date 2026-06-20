import Link from "next/link";
import SectionReveal from "@/components/SectionReveal";
import {
  getFeaturedProjects,
  projectHref,
  projects,
  type Project,
} from "@/data/projects";
import { projectPoster } from "@/lib/projectPoster";

type BentoCardProps = {
  project: Project;
  variant: "hero" | "tile";
};

function BentoCard({ project, variant }: BentoCardProps) {
  return (
    <Link
      href={projectHref(project.id)}
      aria-label={`View ${project.name}`}
      className={`bento-card bento-card--${variant} group block`}
      data-cursor-hover
    >
      <div className="bento-card__surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={projectPoster(project.id, project.name, project.year)}
          alt=""
          width={1600}
          height={1000}
          className="bento-card__image"
          draggable={false}
        />
        <span className="bento-card__sheen" aria-hidden />
      </div>
    </Link>
  );
}

export default function FeaturedWork() {
  const featured = getFeaturedProjects();
  const [primary, secondaryA, secondaryB] = featured;

  if (!primary) return null;

  return (
    <section
      id="work"
      className="relative z-[2] scroll-mt-20 bg-background py-[var(--space-xl)] md:py-[var(--space-2xl)]"
      aria-label="Selected work"
    >
      <div className="grid-editorial">
        <SectionReveal className="col-full mb-8 flex items-end justify-between gap-6 md:mb-10">
          <h2 className="display text-h1 text-ink">Selected work</h2>
          <p className="tech tabular-nums text-ink/40">
            {String(projects.length).padStart(2, "0")} projects
          </p>
        </SectionReveal>

        <SectionReveal className="col-full">
          <div className="bento-grid">
            <BentoCard project={primary} variant="hero" />
            {secondaryA && <BentoCard project={secondaryA} variant="tile" />}
            {secondaryB && <BentoCard project={secondaryB} variant="tile" />}
          </div>
        </SectionReveal>

        <SectionReveal
          className="col-full mt-10 flex justify-end md:mt-12"
          delay={0.08}
        >
          <Link
            href="/work"
            className="link-underline tech text-ink/60 transition-colors hover:text-ink"
            data-cursor-hover
          >
            View all projects →
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
