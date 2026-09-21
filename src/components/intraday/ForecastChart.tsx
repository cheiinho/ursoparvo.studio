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

const WIDTH = 880;
const HEIGHT = 340;
const PAD_L = 52;
const PAD_R = 16;
const PAD_T = 28;
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
    const command = `${xOf(point.time).toFixed(1)},${yOf(point.value).toFixed(1)}`;
    current = current ? `${current} ${command}` : command;
  }
  if (current) runs.push(current);
  return runs;
}

function axisMax(value: number): number {
  const step = value <= 40 ? 10 : value <= 100 ? 20 : 25;
  return Math.max(step, Math.ceil(value / step) * step);
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
  const scaleMax = axisMax(max);
  const innerW = WIDTH - PAD_L - PAD_R;
  const innerH = HEIGHT - PAD_T - PAD_B;
  const step = axis.length > 1 ? innerW / (axis.length - 1) : innerW;
  const xOf = (time: string) => {
    const index = axis.indexOf(time);
    return PAD_L + (index < 0 ? 0 : index) * step;
  };
  const yOf = (value: number) => PAD_T + (1 - value / scaleMax) * innerH;
  const ink = tone === "field" ? "#F6F1E6" : "#1C1C1C";
  const muted = tone === "field" ? "#E4D9F2" : "#5E584F";
  const grid = tone === "field" ? "rgba(246,241,230,0.22)" : "#E6E4DE";
  const bandStroke = "#6A4B12";
  const startIndex = band ? axis.indexOf(band.start) : -1;
  const endIndex = band ? axis.indexOf(band.end) : -1;
  const bandX = startIndex >= 0 ? xOf(axis[startIndex]) - step / 2 : 0;
  const bandEnd = endIndex >= 0 ? xOf(axis[endIndex]) + step / 2 : bandX;
  const ticks = axis.filter((time) => time.endsWith(":00"));
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((share) => Math.round(scaleMax * share));
  const legend = series.filter(
    (item, index, list) => list.findIndex((candidate) => candidate.label === item.label) === index,
  );

  return (
    <div className="intraday-chartblock">
      <ul className="intraday-legend" aria-hidden="true">
        {legend.map((item) => (
          <li key={item.label}>
            <span className={`intraday-swatch intraday-swatch--${item.style}${item.weight === "strong" ? " is-strong" : ""}`} />
            {item.label}
          </li>
        ))}
      </ul>
      <div className="intraday-chart-scroll">
      <svg className="intraday-chart" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-hidden="true">
        <defs>
          <pattern id={patternId} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
            <line x1="0" y1="0" x2="0" y2="7" stroke={bandStroke} strokeWidth="1.25" />
          </pattern>
        </defs>
        {yTicks.map((tick) => (
          <g key={`y-${tick}`}>
            <line x1={PAD_L} x2={WIDTH - PAD_R} y1={yOf(tick)} y2={yOf(tick)} stroke={grid} />
            <text x={PAD_L - 8} y={yOf(tick) + 3} textAnchor="end" fill={muted} fontSize="11">
              {tick}
            </text>
          </g>
        ))}
        <text x={8} y={PAD_T - 10} fill={muted} fontSize="11">
          {yLabel}
        </text>
        {ticks.map((time) => (
          <line
            key={`grid-${time}`}
            x1={xOf(time)}
            x2={xOf(time)}
            y1={PAD_T}
            y2={PAD_T + innerH}
            stroke={grid}
          />
        ))}
        {band && startIndex >= 0 && endIndex >= startIndex ? (
          <g>
            <rect
              x={bandX}
              y={PAD_T}
              width={Math.max(bandEnd - bandX, step)}
              height={innerH}
              fill={tone === "field" ? "rgba(246,241,230,0.08)" : "rgba(106,75,18,0.08)"}
            />
            <rect
              x={bandX}
              y={PAD_T}
              width={Math.max(bandEnd - bandX, step)}
              height={innerH}
              fill={`url(#${patternId})`}
              stroke={bandStroke}
              strokeWidth="1.5"
            />
            <text x={bandX + 8} y={PAD_T + 16} fill={bandStroke} fontSize="11">
              {band.label}
            </text>
          </g>
        ) : null}
        {selectedTime ? (
          <rect
            x={xOf(selectedTime) - step / 2}
            y={PAD_T}
            width={step}
            height={innerH}
            fill={tone === "field" ? "rgba(246,241,230,0.08)" : "rgba(28,28,28,0.05)"}
          />
        ) : null}
        {series.map((item) => {
          if (item.style === "markers") {
            return (
              <g key={item.id} className={enter ? "intraday-series-enter" : undefined}>
                {item.points.map((point) =>
                  point.value === null ? null : (
                    <rect
                      key={point.time}
                      x={xOf(point.time) - 3.5}
                      y={yOf(point.value) - 3.5}
                      width="7"
                      height="7"
                      fill={ink}
                      stroke={tone === "field" ? "#3C2A63" : "#FFFFFF"}
                      strokeWidth="1"
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
                  strokeLinejoin="round"
                  strokeLinecap="round"
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
                fill="transparent"
                onClick={() => onSelectTime(time)}
              />
            ))
          : null}
      </svg>
      </div>
    </div>
  );
}
