import SectionReveal from "@/components/SectionReveal";

export default function AboutSection() {
  return (
    <section aria-label="About" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionReveal>
          <p className="meta mb-6 text-ink/40">About</p>
          <h2 className="display mb-8 text-[clamp(2.5rem,6vw,4rem)] text-ink">
            We design meaning
            <br />
            for brands that matter.
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
            UrsoParvo is an independent design studio working at the
            intersection of identity, strategy and experience. We take on fewer
            projects so we can go deeper on each one.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
