"use client";

import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Index from "@/components/Index";
import PositioningSection from "@/components/PositioningSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import Nav from "@/components/Nav";
import ContactCTA from "@/components/ContactCTA";
import { hasPublishedWork } from "@/data/projects";

export default function Home() {
  const showWorkGallery = hasPublishedWork();

  return (
    <>
      <Nav />
      <main className="page-enter">
        <section
          id="landing"
          className={`relative isolate overflow-visible ${
            showWorkGallery ? "pb-12 md:pb-24" : ""
          }`}
        >
          <Hero galleryOverlap={showWorkGallery} />
          {showWorkGallery && <Index />}
        </section>
        <PositioningSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <ContactCTA />
        <section id="end" aria-label="Site footer">
          <Footer />
        </section>
      </main>
    </>
  );
}
