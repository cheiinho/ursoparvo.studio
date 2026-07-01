import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { SITE, WORK_EMPTY } from "@/content/site";

export default function WorkEmptyState() {
  return (
    <Reveal>
      <div className="work-empty">
        <div className="work-empty__mark" aria-hidden="true" />
        <div className="work-empty__content">
          <p className="work-empty__lead type-corpo text-primary">{WORK_EMPTY.lead}</p>
          <Button href={`mailto:${SITE.email}`}>{WORK_EMPTY.cta}</Button>
          <p className="work-empty__support">
            {WORK_EMPTY.supportPrefix}{" "}
            <a href={`mailto:${SITE.email}`} className="work-empty__email">
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
    </Reveal>
  );
}
