"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
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
        className="h-full w-full animate-pulse rounded-lg bg-white/5"
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
      id="index"
      className="relative z-[2] -mt-[6vh] h-[52dvh] min-h-[360px] w-full scroll-mt-20"
      aria-label="Selected work"
    >
      <CircularGallery
        items={galleryItems}
        bend={3}
        borderRadius={0.05}
        scrollEase={0.02}
        fontClassName="font-display"
        className="h-full w-full"
        aria-label="Project gallery"
        onScrollVelocity={onCarouselVelocity}
        onNavigate={(href) => router.push(href)}
        onActiveIndex={setActiveIndex}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-10 md:pb-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-3">
          <p
            key={activeIndex}
            className="display text-sm text-ink/50 transition-opacity duration-300 md:text-base"
          >
            {galleryItems[activeIndex]?.text ?? ""}
          </p>
          <Link
            href="/work"
            className="pointer-events-auto press text-sm font-normal text-ink/60 transition-colors duration-200 hover:text-ink md:text-base"
          >
            View all work →
          </Link>
        </div>
      </div>
    </section>
  );
}
