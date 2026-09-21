import type { Ref } from "react";

type Row = {
  name: string;
  detail: string;
  shiftStart: string;
  shiftEnd: string;
};

type Props = {
  headingId: string;
  heading: string;
  rows: readonly Row[];
  note: string;
  asHeading?: boolean;
  headingRef?: Ref<HTMLHeadingElement>;
  affectedStart: string;
  affectedEnd: string;
};

function hourNumber(time: string): number {
  return Number(time.slice(0, 2));
}

function hoursBetween(start: number, end: number): number[] {
  const list: number[] = [];
  for (let hour = start; hour <= end; hour += 1) list.push(hour);
  return list;
}

function label(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}

export default function ScheduleList({
  headingId,
  heading,
  rows,
  note,
  asHeading = false,
  headingRef,
  affectedStart,
  affectedEnd,
}: Props) {
  const className = "intraday-schedule__title";
  const first = Math.min(...rows.map((row) => hourNumber(row.shiftStart)));
  const last = Math.max(...rows.map((row) => hourNumber(row.shiftEnd)));
  const hours = hoursBetween(first, last);
  const affectedHour = hourNumber(affectedStart);

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
      <div className="intraday-schedscroll">
        <table className="intraday-schedgrid">
          <caption>{heading}</caption>
          <thead>
            <tr>
              <th scope="col" />
              {hours.map((hour) => (
                <th key={hour} scope="col" className={hour === affectedHour ? "is-affected" : undefined}>
                  {label(hour)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const start = hourNumber(row.shiftStart);
              const end = hourNumber(row.shiftEnd);
              return (
                <tr key={row.name}>
                  <th scope="row">
                    <span className="intraday-person">
                      <span>{row.name}</span>
                      <span className="intraday-muted">
                        {row.shiftStart}–{row.shiftEnd}
                      </span>
                    </span>
                    <span className="intraday-muted">{row.detail}</span>
                  </th>
                  {hours.map((hour) => {
                    const onShift = hour >= start && hour < end;
                    const affected = hour === affectedHour && hour < hourNumber(affectedEnd);
                    return (
                      <td
                        key={hour}
                        className={
                          [
                            onShift ? "is-shift" : "",
                            onShift && hour === start ? "is-shift-start" : "",
                            onShift && hour === end - 1 ? "is-shift-end" : "",
                            affected ? "is-affected" : "",
                          ]
                            .filter(Boolean)
                            .join(" ") || undefined
                        }
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ul className="intraday-schedcards">
        {rows.map((row) => {
          const inPeriod = row.shiftStart <= affectedStart && affectedStart < row.shiftEnd;
          return (
            <li key={row.name} className={inPeriod ? "is-in" : undefined}>
              <span>{row.name}</span>
              <span>
                {row.shiftStart}–{row.shiftEnd}
              </span>
              <span className="intraday-muted">{row.detail}</span>
            </li>
          );
        })}
      </ul>
      <p className="intraday-schedule__note">{note}</p>
    </div>
  );
}
