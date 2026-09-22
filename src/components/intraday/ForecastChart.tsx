"use client";

import { useId, useState } from "react";
import { domain } from "@/content/intraday/derive";

export type ChartPoint = {
  time: string;
  value: number | null;
};

export type ChartSeries = {
  id: string;
  label: string;
  points: ChartPoint[];
  style: "solid" | "dashed" | "markers";
  weight?: "regular" | "strong";
  area?: boolean;
};

type Props = {
  axis: readonly string[];
  series: ChartSeries[];
  band?: { start: string; end: string; label: string } | null;
  yLabel: string;
  region: string;
};

const WIDTH = 1000;
const HEIGHT = 440;
const PAD_L = 54;
const PAD_R = 22;
const PAD_T = 26;
const PAD_B = 42;

const INK = {
  current: "#4B1AA8",
  previous: "#9A93AC",
  actual: "#0F7A4A",
} as const;

function seriesInk(id: string): string {
  if (id.startsWith("actual")) return INK.actual;
  if (id === "previous") return INK.previous;
  return INK.current;
}

function runs(points: ChartPoint[], xOf: (time: string) => number, yOf: (value: number) => number) {
  const list: Array<Array<[number, number]>> = [];
  let current: Array<[number, number]> = [];
  for (const point of points) {
    if (point.value === null) {
      if (current.length) list.push(current);
      current = [];
      continue;
    }
    current.push([xOf(point.time), yOf(point.value)]);
  }
  if (current.length) list.push(current);
  return list;
}

function line(run: Array<[number, number]>): string {
  return run.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

function axisMax(value: number): number {
  const step = value <= 40 ? 10 : value <= 120 ? 20 : 25;
  return Math.max(step, Math.ceil(value / step) * step);
}

export default function ForecastChart({ axis, series, band, yLabel, region }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [focus, setFocus] = useState<string | null>(null);
  const values = series.flatMap((item) =>
    item.points.flatMap((point) => (point.value === null ? [] : [point.value])),
  );
  const { max } = domain(values);
  const scaleMax = axisMax(max);
  const innerW = WIDTH - PAD_L - PAD_R;
  const innerH = HEIGHT - PAD_T - PAD_B;
  const step = axis.length > 1 ? innerW / (axis.length - 1) : innerW;
  const xOf = (time: string) => {
    const index = axis.indexOf(time);
    return PAD_L + (index < 0 ? 0 : index) * step;
  };
  const yOf = (value: number) => PAD_T + (1 - value / scaleMax) * innerH;
  const baseline = PAD_T + innerH;
  const hours = axis.filter((time) => time.endsWith(":00"));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((share) => Math.round(scaleMax * share));
  const startIndex = band ? axis.indexOf(band.start) : -1;
  const endIndex = band ? axis.indexOf(band.end) : -1;
  const bandX = startIndex >= 0 ? xOf(axis[startIndex]) : 0;
  const bandW = endIndex > startIndex ? xOf(axis[endIndex]) - bandX : step;
  const legend = series.filter(
    (item, index, list) => list.findIndex((candidate) => candidate.label === item.label) === index,
  );
  const readout = focus
    ? legend.map((item) => ({
        label: item.label,
        id: item.id,
        value:
          series
            .filter((candidate) => candidate.label === item.label)
            .map((candidate) => candidate.points.find((point) => point.time === focus)?.value ?? null)
            .find((candidate) => candidate !== null) ?? null,
      }))
    : [];
  const hasReadout = readout.some((item) => item.value !== null);

  function move(direction: -1 | 1) {
    const index = Math.max(0, axis.indexOf(focus ?? axis[0] ?? ""));
    const next = axis[Math.min(axis.length - 1, Math.max(0, index + direction))];
    if (next) setFocus(next);
  }

  return (
    <figure className="pchart">
      <div
        className="pchart__plot"
        tabIndex={0}
        role="group"
        aria-label={region}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "Escape") setFocus(null);
        }}
        onBlur={() => setFocus(null)}
      >
        <svg
          className="pchart__svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          aria-hidden="true"
          focusable="false"
          onMouseLeave={() => setFocus(null)}
        >
          <defs>
            <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={INK.current} stopOpacity="0.16" />
              <stop offset="100%" stopColor={INK.current} stopOpacity="0" />
            </linearGradient>
          </defs>

          {ticks.map((tick) => (
            <g key={`y${tick}`}>
              <line
                x1={PAD_L}
                x2={WIDTH - PAD_R}
                y1={yOf(tick)}
                y2={yOf(tick)}
                stroke={tick === 0 ? "#CFC9DC" : "#EDEAF3"}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text x={PAD_L - 12} y={yOf(tick) + 4} textAnchor="end" className="pchart__tick">
                {tick}
              </text>
            </g>
          ))}

          {hours.map((time) => (
            <line
              key={`x${time}`}
              x1={xOf(time)}
              x2={xOf(time)}
              y1={PAD_T}
              y2={baseline}
              stroke="#F2F0F7"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {band && startIndex >= 0 ? (
            <g>
              <rect x={bandX} y={PAD_T} width={bandW} height={innerH} fill="#8A5A00" fillOpacity="0.07" />
              <line
                x1={bandX}
                x2={bandX}
                y1={PAD_T}
                y2={baseline}
                stroke="#8A5A00"
                strokeOpacity="0.5"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={bandX + bandW}
                x2={bandX + bandW}
                y1={PAD_T}
                y2={baseline}
                stroke="#8A5A00"
                strokeOpacity="0.5"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ) : null}

          {series.map((item) =>
            item.area
              ? runs(item.points, xOf, yOf).map((run) => (
                  <polygon
                    key={`area-${item.id}-${run[0]?.[0]}`}
                    points={`${run[0][0].toFixed(1)},${baseline} ${line(run)} ${run[run.length - 1][0].toFixed(1)},${baseline}`}
                    fill={`url(#${uid}-area)`}
                  />
                ))
              : null,
          )}

          {focus && axis.includes(focus) ? (
            <line
              x1={xOf(focus)}
              x2={xOf(focus)}
              y1={PAD_T}
              y2={baseline}
              stroke={INK.current}
              strokeOpacity="0.45"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}

          {series.map((item) => {
            if (item.style === "markers") {
              return (
                <g key={item.id} className="pchart__enter">
                  {item.points.map((point) =>
                    point.value === null ? null : (
                      <circle
                        key={point.time}
                        cx={xOf(point.time)}
                        cy={yOf(point.value)}
                        r="5"
                        fill={seriesInk(item.id)}
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    ),
                  )}
                </g>
              );
            }
            return (
              <g key={item.id} className="pchart__enter">
                {runs(item.points, xOf, yOf).map((run) => (
                  <polyline
                    key={`${item.id}-${run[0]?.[0]}`}
                    points={line(run)}
                    fill="none"
                    stroke={seriesInk(item.id)}
                    strokeWidth={item.weight === "strong" ? 3.5 : 2.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={item.style === "dashed" ? "7 6" : undefined}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>
            );
          })}

          {focus && axis.includes(focus)
            ? series.map((item) => {
                const point = item.points.find((candidate) => candidate.time === focus);
                if (!point || point.value === null || item.style === "markers") return null;
                return (
                  <circle
                    key={`dot-${item.id}`}
                    cx={xOf(focus)}
                    cy={yOf(point.value)}
                    r="4.5"
                    fill="#ffffff"
                    stroke={seriesInk(item.id)}
                    strokeWidth="2.5"
                  />
                );
              })
            : null}

          {hours.map((time) => (
            <text key={`t${time}`} x={xOf(time)} y={HEIGHT - 14} textAnchor="middle" className="pchart__tick">
              {time}
            </text>
          ))}

          {axis.map((time) => (
            <rect
              key={`hit${time}`}
              x={xOf(time) - step / 2}
              y={PAD_T}
              width={step}
              height={innerH}
              fill="transparent"
              onMouseEnter={() => setFocus(time)}
            />
          ))}
        </svg>

        {band && startIndex >= 0 ? (
          <span
            className="pchart__band"
            style={{ left: `${((bandX + bandW / 2) / WIDTH) * 100}%` }}
            aria-hidden="true"
          >
            {band.label}
          </span>
        ) : null}

        {focus && hasReadout ? (
          <div
            className="pchart__tip"
            style={{ left: `${(xOf(focus) / WIDTH) * 100}%` }}
            aria-hidden="true"
          >
            <p className="pchart__tip-time">{focus}</p>
            {readout.map((item) => (
              <p key={item.label} className="pchart__tip-row">
                <span className={`pchart__key pchart__key--${item.id.startsWith("actual") ? "actual" : item.id}`} />
                {item.label}
                <strong>{item.value === null ? "-" : item.value}</strong>
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <figcaption className="pchart__legend">
        <span className="pchart__ylabel">{yLabel}</span>
        <ul>
          {band ? (
            <li>
              <span className="pchart__key pchart__key--band" />
              {band.label}
            </li>
          ) : null}
          {legend.map((item) => (
            <li key={item.label}>
              <span
                className={`pchart__key pchart__key--${item.id.startsWith("actual") ? "actual" : item.id}${item.style === "dashed" ? " is-dashed" : ""}`}
              />
              {item.label}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
