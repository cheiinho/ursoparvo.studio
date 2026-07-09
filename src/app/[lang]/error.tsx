"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

const STRINGS = {
  pt: {
    heading: "Isto falhou.",
    body: "Tente de novo.",
    tryAgain: "Tentar de novo",
  },
  en: {
    heading: "Something broke.",
    body: "Please try again.",
    tryAgain: "Try again",
  },
} as const;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ lang: string }>();
  const strings = params.lang === "en" ? STRINGS.en : STRINGS.pt;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center gap-6"
      style={{ padding: "var(--space-6)" }}
    >
      <p className="type-display">{strings.heading}</p>
      <p className="type-corpo text-secondary">{strings.body}</p>
      <button type="button" className="form-submit" onClick={() => reset()}>
        {strings.tryAgain}
      </button>
    </div>
  );
}
