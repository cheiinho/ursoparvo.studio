"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import type { GalleryItem } from "@/components/ui/circular-gallery-2";
import { projects, projectPreviewSrc } from "@/data/projects";

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

const galleryImages: Record<string, string> = {
  nordhaven:
    "https://images.unsplash.com/photo-1499951360447-b19be8fe836f?w=800&q=80",
  forma:
    "https://images.unsplash.com/photo-1561070791-252571790854?w=800&q=80",
  arcadia:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  meridian:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  clayworks:
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
  mossline:
    "https://images.unsplash.com/photo-1507842217343-583bb7270ef7?w=800&q=80",
};

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
  const galleryItems = useMemo<GalleryItem[]>(
    () =>
      galleryOrder.map((id) => {
        const project = projects.find((p) => p.id === id)!;
        return {
          image:
            galleryImages[project.id] ??
            projectPreviewSrc(project.name, project.previewColor),
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
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-10 md:pb-10">
        <div className="mx-auto flex max-w-[1400px] justify-center">
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
