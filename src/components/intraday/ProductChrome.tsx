import type { ReactNode } from "react";

const NAV = [
  { id: "forecast", label: "Forecast" },
  { id: "teamSchedule", label: "Team schedule" },
  { id: "insights", label: "Insights" },
  { id: "yourSchedule", label: "Your schedule" },
  { id: "configurations", label: "Configurations" },
] as const;

export type ChromeId = (typeof NAV)[number]["id"];

type Props = {
  product: string;
  active: ChromeId;
  nav?: ReactNode;
  children: ReactNode;
};

export function NavIcon({ id }: { id: string }) {
  return (
    <svg className="td-icon" viewBox="0 0 16 16" aria-hidden="true">
      {id === "forecast" ? <path d="M1.5 12.5 5.2 8l2.6 2.2L14.5 3.5" /> : null}
      {id === "teamSchedule" ? (
        <path d="M2 3.5h12M4 2v3M12 2v3M2 6.5h12v7H2z" />
      ) : null}
      {id === "insights" ? <path d="M3 13V8M8 13V3M13 13V6" /> : null}
      {id === "yourSchedule" ? <path d="M8 2.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM8 10.5V14M5.5 14h5" /> : null}
      {id === "configurations" ? (
        <path d="M8 2.2 9.2 4l2.1.3-1.5 1.5.4 2.1L8 7l-2.2.9.4-2.1L4.7 4.3 6.8 4zM8 6.2a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z" />
      ) : null}
    </svg>
  );
}

export default function ProductChrome({ product, active, nav, children }: Props) {
  return (
    <div className="td-body">
      {nav ?? (
        <div className="td-nav td-nav--static" aria-hidden="true">
          <p className="td-brand">
            <span className="td-mark" />
            <span>{product}</span>
          </p>
          <ul className="td-nav__list">
            {NAV.map((item) => (
              <li key={item.id} className={item.id === active ? "is-current" : undefined}>
                <NavIcon id={item.id} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="td-main">{children}</div>
    </div>
  );
}
