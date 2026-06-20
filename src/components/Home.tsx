"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import PositioningSection from "@/components/PositioningSection";
import Nav from "@/components/Nav";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false);

  return (
    <>
      <Nav visible={headerVisible} />
      <main className="page-enter">
        <section id="landing" className="relative isolate overflow-visible">
          <Hero onReady={() => setHeaderVisible(true)} />
        </section>
        <FeaturedWork />
        <PositioningSection />
        <ContactCTA />
        <section id="end" aria-label="Site footer">
          <Footer />
        </section>
      </main>
    </>
  );
}
