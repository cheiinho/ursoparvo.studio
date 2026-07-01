import HomeCarousel from "@/components/HomeCarousel";
import PublicShell from "@/components/PublicShell";
import WorkIndex from "@/components/WorkIndex";
import { TAGLINE } from "@/content/site";
import { hasPublishedWork } from "@/data/projects";

export default function Home() {
  if (hasPublishedWork()) {
    return (
      <PublicShell>
        <div className="home-screen">
          <h1 className="sr-only">{TAGLINE}</h1>
          <HomeCarousel />
        </div>
        <WorkIndex />
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <div className="home-screen">
        <h1 className="sr-only">{TAGLINE}</h1>
        <HomeCarousel />
      </div>
    </PublicShell>
  );
}
