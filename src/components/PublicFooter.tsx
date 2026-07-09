import { MotionA, press } from "@/components/ui-motion";
import { SITE } from "@/content/site";

export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer type-nota">
      <div className="site-container site-footer__inner">
        <p className="site-footer__item">© {year} {SITE.name}</p>
        <MotionA
          href={`mailto:${SITE.email}`}
          className="site-footer__item"
          {...press}
        >
          {SITE.email}
        </MotionA>
      </div>
    </footer>
  );
}
