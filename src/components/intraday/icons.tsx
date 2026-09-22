const PATHS: Record<string, string> = {
  forecast: "M3 14.6 7.4 9.2l2.9 2.5L17 5.2",
  issues: "M10 3.6 17.2 16H2.8L10 3.6ZM10 8.6v3.2M10 14h.01",
  teamSchedule: "M4 5h12M6.6 3.4v3M13.4 3.4v3M4 8.4h12V16H4z",
  insights: "M4.6 15.6v-4.4M10 15.6V6.4M15.4 15.6V9.2",
  configurations: "M4 6h12M4 10h12M4 14h7",
  bell: "M10 3.4a3.5 3.5 0 0 0-3.5 3.5v2.3L5.2 11.4v.9h9.6v-.9L13.5 9.2V6.9A3.5 3.5 0 0 0 10 3.4ZM8.5 14.1a1.5 1.5 0 0 0 3 0",
  clock: "M10 5.2v5l3 1.6M10 3.2a6.8 6.8 0 1 0 0 13.6 6.8 6.8 0 0 0 0-13.6Z",
  check: "M4.8 10.4 8.4 14l6.8-7.6",
  alert: "M10 6v4.6M10 13.4h.01M10 3.2a6.8 6.8 0 1 0 0 13.6 6.8 6.8 0 0 0 0-13.6Z",
  back: "M11.5 5 6.5 10l5 5",
};

export function Glyph({ name, className }: { name: keyof typeof PATHS | string; className?: string }) {
  return (
    <svg className={className ?? "pglyph"} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d={PATHS[name] ?? ""} />
    </svg>
  );
}
