import type { Ref } from "react";

type Props = {
  headingId: string;
  heading: string;
  rows: readonly { name: string; detail: string }[];
  note: string;
  asHeading?: boolean;
  headingRef?: Ref<HTMLHeadingElement>;
};

export default function ScheduleList({
  headingId,
  heading,
  rows,
  note,
  asHeading = false,
  headingRef,
}: Props) {
  const className = "type-label";
  return (
    <div className="intraday-schedule">
      {asHeading ? (
        <h3 id={headingId} ref={headingRef} tabIndex={-1} className={className}>
          {heading}
        </h3>
      ) : (
        <p id={headingId} className={className}>
          {heading}
        </p>
      )}
      <ul>
        {rows.map((row) => (
          <li key={row.name}>
            <span>{row.name}</span>
            <span className="intraday-muted">{row.detail}</span>
          </li>
        ))}
      </ul>
      <p className="type-nota">{note}</p>
    </div>
  );
}
