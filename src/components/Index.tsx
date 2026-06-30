"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { GalleryItem } from "@/components/ui/circular-gallery-2";
import { hasPublishedWork, projects } from "@/data/projects";
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

export default function Index() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryItems = useMemo<GalleryItem[]>(
    () =>
      projects.map((project) => ({
        image: projectPoster(project.id, project.name, project.year),
        text: project.name,
        href: `/work/${project.id}`,
      })),
    [],
  );

  if (!hasPublishedWork()) return null;

  return (
    <section
      id="work"
      className="relative z-[1] flex w-full flex-col scroll-mt-20 px-6 md:px-10"
      aria-label="Trabalho seleccionado"
    >
      <div className="h-[36dvh] min-h-[240px] w-full touch-pan-x md:h-[44dvh] md:min-h-[320px]">
        <CircularGallery
          items={galleryItems}
          bend={3}
          borderRadius={0.05}
          scrollEase={0.02}
          fontClassName="display"
          className="h-full w-full"
          aria-label="Galeria de projectos"
          onNavigate={(href) => router.push(href)}
          onActiveIndex={setActiveIndex}
        />
      </div>

      <div className="pb-12 pt-6 md:pb-16 md:pt-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-4">
          <p
            key={activeIndex}
            className="display text-project text-ink transition-opacity duration-300"
          >
            {galleryItems[activeIndex]?.text ?? ""}
          </p>
          <Link
            href="/work"
            className="press inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground md:px-6 md:py-3 md:text-base"
          >
            Ver todo o trabalho
          </Link>
        </div>
      </div>
    </section>
  );
}
