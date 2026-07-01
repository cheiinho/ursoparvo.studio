"use client";

import { Carousel_001 } from "@/components/v1/skiper47";
import { HOME_CAROUSEL_IMAGES } from "@/content/home-carousel";

export default function HomeCarousel() {
  return (
    <div className="home-carousel">
      <Carousel_001
        images={HOME_CAROUSEL_IMAGES}
        showPagination
        showNavigation
        loop
        autoplay
        spaceBetween={40}
        className="home-carousel__inner"
      />
    </div>
  );
}
