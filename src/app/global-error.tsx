"use client";

import { useEffect } from "react";
import Button from "@/components/Button";
import { sohne } from "@/lib/fonts";
import "./globals.css";

export default function GlobalError({
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
    <html lang="pt-PT" className={sohne.variable}>
      <body className={sohne.className}>
        <div
          className="flex min-h-dvh flex-col items-center justify-center gap-6"
          style={{ padding: "var(--space-6)" }}
        >
          <p className="type-display">Algo correu mal</p>
          <Button variant="secondary" onClick={() => reset()}>
            Tentar de novo
          </Button>
        </div>
      </body>
    </html>
  );
}
