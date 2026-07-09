"use client";

import { useEffect } from "react";
import { UI } from "@/content/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center gap-6"
      style={{ padding: "var(--space-6)" }}
    >
      <p className="type-display">{UI.errors.genericHeading}</p>
      <p className="type-corpo text-secondary">{UI.errors.genericBody}</p>
      <button type="button" className="form-submit" onClick={() => reset()}>
        {UI.actions.tryAgain}
      </button>
    </div>
  );
}
