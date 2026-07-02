"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { HOME_GALLERY_ITEMS } from "@/content/home-gallery";

const CircularGallery = dynamic(
  () =>
    import("@/components/ui/circular-gallery-2").then((m) => m.CircularGallery),
  {
    ssr: false,
    loading: () => <div className="home-gallery__loading" aria-hidden />,
  },
);

type HomeGalleryProps = {
  onScrollVelocity?: (velocity: number) => void;
};

export default function HomeGallery({ onScrollVelocity }: HomeGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="home-gallery">
      <div className="home-gallery__stage" aria-label="Os ursos do estúdio">
        <CircularGallery
          items={HOME_GALLERY_ITEMS}
          bend={3}
          borderRadius={0.05}
          scrollEase={0.02}
          className="home-gallery__canvas"
          onScrollVelocity={onScrollVelocity}
          onActiveIndex={setActiveIndex}
        />
      </div>
      <p key={activeIndex} className="type-corpo text-secondary home-gallery__label">
        {HOME_GALLERY_ITEMS[activeIndex]?.text ?? ""}
      </p>
    </div>
  );
}
