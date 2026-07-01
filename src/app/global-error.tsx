"use client";

import { useEffect } from "react";
import Button from "@/components/Button";
import { UI } from "@/content/ui";
import { inter } from "@/lib/fonts";
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
    <html lang="pt-PT" className={inter.variable}>
      <body className={inter.className}>
        <div
          className="flex min-h-dvh flex-col items-center justify-center gap-6"
          style={{ padding: "var(--space-6)" }}
        >
          <p className="type-display">{UI.errors.genericHeading}</p>
          <p className="type-corpo text-secondary">{UI.errors.genericBody}</p>
          <Button variant="secondary" onClick={() => reset()}>
            {UI.actions.tryAgain}
          </Button>
        </div>
      </body>
    </html>
  );
}
