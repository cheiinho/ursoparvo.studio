"use client";

import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Index from "@/components/Index";
import ManifestoSection from "@/components/ManifestoSection";
import Nav from "@/components/Nav";
import { hasPublishedWork } from "@/data/projects";

export default function Home() {
  const showWorkGallery = hasPublishedWork();

  return (
    <>
      <Nav />
      <main>
        <section
          id="landing"
          className={showWorkGallery ? "pb-12 md:pb-20" : ""}
        >
          <Hero hasPublishedWork={showWorkGallery} galleryOverlap={showWorkGallery} />
          {showWorkGallery && <Index />}
        </section>
        <ManifestoSection />
        <ContactCTA />
        <Footer />
      </main>
    </>
  );
}
