"use client";

import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { GalleryItem } from "@/components/ui/circular-gallery-2";
import { projects } from "@/data/projects";
import { projectPoster } from "@/lib/projectPoster";

const CircularGallery = dynamic(
  () =>
    import("@/components/ui/circular-gallery-2").then((m) => m.CircularGallery),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-full w-full animate-pulse rounded-lg bg-ink/[0.03]"
        aria-hidden
      />
    ),
  },
);

const galleryOrder = [
  "nordhaven",
  "forma",
  "arcadia",
  "clayworks",
  "meridian",
  "mossline",
] as const;

type IndexProps = {
  onCarouselVelocity?: (velocity: number) => void;
};

export default function Index({ onCarouselVelocity }: IndexProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryItems = useMemo<GalleryItem[]>(
    () =>
      galleryOrder.map((id) => {
        const project = projects.find((p) => p.id === id)!;
        return {
          image: projectPoster(project.id, project.name, project.year),
          text: project.name,
          href: `/work/${project.id}`,
        };
      }),
    [],
  );

  return (
    <section
      id="work"
      className="relative z-[1] -mt-[14vh] flex w-full flex-col scroll-mt-20 md:-mt-[16vh]"
      aria-label="Selected work"
    >
      <div className="h-[44dvh] min-h-[320px] w-full touch-pan-x">
        <CircularGallery
          items={galleryItems}
          bend={3}
          borderRadius={0.05}
          scrollEase={0.02}
          fontClassName="display"
          className="h-full w-full"
          aria-label="Project gallery"
          onScrollVelocity={onCarouselVelocity}
          onNavigate={(href) => router.push(href)}
          onActiveIndex={setActiveIndex}
        />
      </div>

      <div className="px-6 pb-14 pt-8 md:px-10 md:pb-16 md:pt-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4">
          <p
            key={activeIndex}
            className="display text-project text-ink transition-opacity duration-300"
          >
            {galleryItems[activeIndex]?.text ?? ""}
          </p>
          <Link
            href="/work"
            className="pointer-events-auto press nav-cta-split group inline-flex h-auto items-stretch gap-0.5 rounded-full border-0 bg-transparent p-0 text-sm font-normal shadow-none md:text-base"
            data-cursor-hover
          >
            <span className="nav-cta-split__label rounded-full bg-primary px-5 py-2.5 text-primary-foreground md:px-6 md:py-3">
              View all work
            </span>
            <span className="nav-cta-split__arrow relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground">
              <ArrowUpRight
                className="nav-cta-split__icon nav-cta-split__icon--out size-4 md:size-[18px]"
                aria-hidden
              />
              <ArrowUpRight
                className="nav-cta-split__icon nav-cta-split__icon--in absolute size-4 md:size-[18px]"
                aria-hidden
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
