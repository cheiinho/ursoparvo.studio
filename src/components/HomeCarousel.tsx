"use client";

import { useReducedMotion } from "framer-motion";
import { Carousel_001 } from "@/components/v1/skiper47";
import { HOME_CAROUSEL_IMAGES } from "@/content/home-carousel";

export default function HomeCarousel() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="home-carousel">
      <Carousel_001
        images={HOME_CAROUSEL_IMAGES}
        showPagination
        showNavigation
        loop
        autoplay={!reducedMotion}
        spaceBetween={40}
        className="home-carousel__inner"
      />
    </div>
  );
}
