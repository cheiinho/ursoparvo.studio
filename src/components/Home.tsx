"use client";

import { useRef, useState } from "react";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Index from "@/components/Index";
import PositioningSection from "@/components/PositioningSection";
import Nav from "@/components/Nav";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const carouselVelocityRef = useRef(0);

  return (
    <>
      <Nav visible={headerVisible} />
      <main className="page-enter">
        <section
          id="landing"
          className="relative isolate overflow-visible pb-32 md:pb-48"
        >
          <Hero
            onReady={() => setHeaderVisible(true)}
            carouselVelocityRef={carouselVelocityRef}
          />
          <Index
            onCarouselVelocity={(velocity) => {
              carouselVelocityRef.current = velocity;
            }}
          />
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
