import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
};

export default function Section({
  children,
  className = "",
  id,
  ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section ${className}`.trim()}
      aria-labelledby={ariaLabelledby}
    >
      <div className="site-container">{children}</div>
    </section>
  );
}
