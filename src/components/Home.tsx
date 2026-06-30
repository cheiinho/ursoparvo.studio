import Link from "next/link";
import PublicShell from "@/components/PublicShell";
import IndexCarousel from "@/components/IndexCarousel";
import {
  CONTACT,
  HERO,
  POSITIONING_BODY,
  SITE,
  TAGLINE,
} from "@/content/site";
import { hasPublishedWork } from "@/data/projects";

export default function Home() {
  const showCarousel = hasPublishedWork();

  if (showCarousel) {
    return (
      <PublicShell home>
        <IndexCarousel />
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <div className="site-container home-editorial">
        <div className="page-top-spacer" style={{ paddingBottom: 24 }} />
        <div className="about-layout">
          <div className="about-layout__main">
            <p className="about-lede home-editorial__lede">{TAGLINE}</p>
            <div className="mt-10 space-y-6">
              {POSITIONING_BODY.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-body">
                  {paragraph}
                </p>
              ))}
            </div>
            <aside className="about-processo">
              <p className="about-processo__text">{HERO.subtitle}</p>
            </aside>
            <div className="home-editorial__actions">
              <Link href="/about" className="about-aside__cta">
                Sobre
              </Link>
              <a href={`mailto:${SITE.email}`} className="about-aside__cta">
                {CONTACT.title}
              </a>
            </div>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
