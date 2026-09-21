import type { EvidenceKind } from "@/content/intraday/types";

type Props = { kind: EvidenceKind; text: string };

export default function EvidenceLabel({ kind, text }: Props) {
  return <p className={`intraday-evidence type-label intraday-evidence--${kind}`}>{text}</p>;
}
