import Nav from "@/components/Nav";
import WorkList from "@/components/WorkList";

export default function WorkPageContent() {
  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-background">
        <section
          className="scroll-mt-20 px-5 py-16 md:px-10 md:py-28"
          aria-label="All work"
        >
          <div className="mx-auto max-w-[1400px]">
            <h1 className="text-title mb-10 text-ink md:mb-16">Trabalho</h1>
            <WorkList />
          </div>
        </section>
      </main>
    </>
  );
}
