type Props = { text: string };

export default function InsightsBody({ text }: Props) {
  return <p className="type-corpo intraday-insights">{text}</p>;
}
