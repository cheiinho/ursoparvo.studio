import type { ReactNode } from "react";

export function NavIcon({ id }: { id: string }) {
  return (
    <svg className="wfm-icon" viewBox="0 0 20 20" aria-hidden="true">
      {id === "forecast" ? <path d="M3 14.5 7.2 9.4l2.7 2.3L17 5.5" /> : null}
      {id === "teamSchedule" ? <path d="M4 4.5h12M6.5 3v3M13.5 3v3M4 8h12v8.5H4z" /> : null}
      {id === "insights" ? <path d="M4.5 15.5v-5M10 15.5v-9M15.5 15.5V8" /> : null}
      {id === "configurations" ? <path d="M4 5.5h12M4 10h12M4 14.5h8" /> : null}
      {id === "bell" ? (
        <path d="M10 3.2a3.6 3.6 0 0 0-3.6 3.6v2.2L5 11.2v1h10v-1l-1.4-2.2V6.8A3.6 3.6 0 0 0 10 3.2zM8.4 13.2a1.6 1.6 0 0 0 3.2 0" />
      ) : null}
    </svg>
  );
}

export function AppBar({
  product,
  section,
  context,
  children,
}: {
  product: string;
  section: string;
  context?: string;
  children?: ReactNode;
}) {
  return (
    <header className="wfm-appbar">
      <p className="wfm-brand">
        <span className="wfm-mark" aria-hidden="true" />
        <span>{product}</span>
      </p>
      <p className="wfm-appbar__section">{section}</p>
      {context ? <p className="wfm-appbar__context">{context}</p> : null}
      {children}
    </header>
  );
}

export type RailItem = { id: string; label: string; current?: boolean };

export function StaticRail({ label, items }: { label: string; items: readonly RailItem[] }) {
  return (
    <nav className="wfm-rail" aria-label={label}>
      <ul className="wfm-rail__list">
        {items.map((item) => (
          <li key={item.id} className={item.current ? "is-current" : undefined} aria-current={item.current ? "page" : undefined}>
            <NavIcon id={item.id} />
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const PRODUCT_PLACES: readonly RailItem[] = [
  { id: "forecast", label: "Forecast" },
  { id: "teamSchedule", label: "Team schedule" },
  { id: "insights", label: "Insights" },
  { id: "configurations", label: "Configurations" },
];

export default function ProductChrome({
  product,
  section,
  context,
  rail,
  children,
}: {
  product: string;
  section: string;
  context?: string;
  rail?: readonly RailItem[];
  children: ReactNode;
}) {
  return (
    <div className="wfm-app">
      <AppBar product={product} section={section} context={context} />
      {rail ? (
        <div className="wfm-body">
          <StaticRail label={product} items={rail} />
          <div className="wfm-stage">{children}</div>
        </div>
      ) : (
        <div className="wfm-stage wfm-stage--solo">{children}</div>
      )}
    </div>
  );
}
