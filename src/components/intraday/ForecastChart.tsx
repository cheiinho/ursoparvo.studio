import { domain } from "@/content/intraday/derive";

export type ChartPoint = {
  time: string;
  value: number | null;
};

export type ChartSeries = {
  id: string;
  label: string;
  points: ChartPoint[];
  style: "solid" | "dotted" | "markers";
  weight?: "regular" | "strong";
};

type Props = {
  patternId: string;
  axis: readonly string[];
  series: ChartSeries[];
  band?: { start: string; end: string; label: string } | null;
  markedTimes?: readonly string[];
  tone: "paper" | "field";
  yLabel: string;
  enter?: boolean;
  selectedTime?: string | null;
  onSelectTime?: (time: string) => void;
};

const WIDTH = 720;
const HEIGHT = 280;
const PAD_L = 44;
const PAD_R = 16;
const PAD_T = 20;
const PAD_B = 36;

function segments(points: ChartPoint[], xOf: (time: string) => number, yOf: (value: number) => number) {
  const runs: string[] = [];
  let current = "";
  for (const point of points) {
    if (point.value === null) {
      if (current) runs.push(current);
      current = "";
      continue;
    }
    const command = `${xOf(point.time)},${yOf(point.value)}`;
    current = current ? `${current} ${command}` : command;
  }
  if (current) runs.push(current);
  return runs;
}

export default function ForecastChart({
  patternId,
  axis,
  series,
  band,
  markedTimes,
  tone,
  yLabel,
  enter = false,
  selectedTime,
  onSelectTime,
}: Props) {
  const values = series.flatMap((item) =>
    item.points.flatMap((point) => (point.value === null ? [] : [point.value])),
  );
  const { max } = domain(values);
  const innerW = WIDTH - PAD_L - PAD_R;
  const innerH = HEIGHT - PAD_T - PAD_B;
  const step = axis.length > 1 ? innerW / (axis.length - 1) : innerW;
  const xOf = (time: string) => {
    const index = axis.indexOf(time);
    return PAD_L + (index < 0 ? 0 : index) * step;
  };
  const yOf = (value: number) => PAD_T + (1 - value / max) * innerH;
  const ink = tone === "field" ? "#F6F1E6" : "#1C1C1C";
  const muted = tone === "field" ? "#E4D9F2" : "#5E584F";
  const bandStroke = "#6A4B12";
  const startIndex = band ? axis.indexOf(band.start) : -1;
  const endIndex = band ? axis.indexOf(band.end) : -1;
  const bandX = startIndex >= 0 ? xOf(axis[startIndex]) - step / 2 : 0;
  const bandEnd = endIndex >= 0 ? xOf(axis[endIndex]) + step / 2 : bandX;
  const ticks = axis.filter((time) => time.endsWith(":00"));

  return (
    <svg
      className="intraday-chart"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={bandStroke} strokeWidth="1.5" />
        </pattern>
      </defs>
      <text x={8} y={16} fill={muted} fontSize="11">
        {yLabel}
      </text>
      {band && startIndex >= 0 && endIndex > startIndex ? (
        <g>
          <rect
            x={bandX}
            y={PAD_T}
            width={Math.max(bandEnd - bandX, step)}
            height={innerH}
            fill={`url(#${patternId})`}
            stroke={bandStroke}
            strokeWidth="1.5"
          />
          <text x={bandX + 6} y={PAD_T + 14} fill={bandStroke} fontSize="11">
            {band.label}
          </text>
        </g>
      ) : null}
      {series.map((item) => {
        if (item.style === "markers") {
          return (
            <g key={item.id} className={enter ? "intraday-series-enter" : undefined}>
              {item.points.map((point) =>
                point.value === null ? null : (
                  <rect
                    key={point.time}
                    x={xOf(point.time) - 3}
                    y={yOf(point.value) - 3}
                    width="6"
                    height="6"
                    fill={ink}
                  />
                ),
              )}
            </g>
          );
        }
        return (
          <g key={item.id} className={enter ? "intraday-series-enter" : undefined}>
            {segments(item.points, xOf, yOf).map((points) => (
              <polyline
                key={points}
                points={points}
                fill="none"
                stroke={item.weight === "strong" ? ink : muted}
                strokeWidth={item.weight === "strong" ? 2.5 : 1.5}
                strokeDasharray={item.style === "dotted" ? "2 4" : undefined}
              />
            ))}
          </g>
        );
      })}
      {markedTimes?.map((time) => (
        <rect
          key={`mark-${time}`}
          className="intraday-mark"
          x={xOf(time) - step / 2}
          y={PAD_T}
          width={step}
          height={innerH}
          fill="none"
          stroke={ink}
          strokeWidth="1.5"
        />
      ))}
      {ticks.map((time) => (
        <text key={`tick-${time}`} x={xOf(time)} y={HEIGHT - 12} textAnchor="middle" fill={muted} fontSize="11">
          {time}
        </text>
      ))}
      {onSelectTime
        ? axis.map((time) => (
            <rect
              key={`hit-${time}`}
              x={xOf(time) - step / 2}
              y={PAD_T}
              width={step}
              height={innerH}
              fill={selectedTime === time ? "rgba(28,28,28,0.06)" : "transparent"}
              onClick={() => onSelectTime(time)}
            />
          ))
        : null}
    </svg>
  );
}
