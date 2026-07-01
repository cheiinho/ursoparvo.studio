"use client";

import { useEffect } from "react";
import Button from "@/components/Button";

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
      <p className="type-display">Algo correu mal</p>
      <Button variant="secondary" onClick={() => reset()}>
        Tentar de novo
      </Button>
    </div>
  );
}
