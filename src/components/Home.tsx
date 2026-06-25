"use client";

import { useRef, useState } from "react";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Index from "@/components/Index";
import PositioningSection from "@/components/PositioningSection";
import Nav from "@/components/Nav";
import ContactCTA from "@/components/ContactCTA";
import { hasPublishedWork } from "@/data/projects";

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const carouselVelocityRef = useRef(0);
  const showWorkGallery = hasPublishedWork();

  return (
    <>
      <Nav visible={headerVisible} />
      <main className="page-enter">
        <section
          id="landing"
          className={`relative isolate overflow-visible ${
            showWorkGallery ? "pb-20 md:pb-48" : "pb-10 md:pb-24"
          }`}
        >
          <Hero
            onReady={() => setHeaderVisible(true)}
            carouselVelocityRef={showWorkGallery ? carouselVelocityRef : undefined}
            galleryOverlap={showWorkGallery}
          />
          {showWorkGallery && (
            <Index
              onCarouselVelocity={(velocity) => {
                carouselVelocityRef.current = velocity;
              }}
            />
          )}
        </section>
        <PositioningSection />
        <ContactCTA />
        <section id="end" aria-label="Site footer">
          <Footer />
        </section>
      </main>
    </>
  );
}
