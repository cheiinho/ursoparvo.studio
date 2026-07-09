"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
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
          <p className="type-display">Isto falhou.</p>
          <p className="type-corpo text-secondary">
            Tente de novo. <span lang="en">Something broke, please try again.</span>
          </p>
          <motion.button
            type="button"
            className="form-submit"
            onClick={() => reset()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            Tentar de novo
          </motion.button>
        </div>
      </body>
    </html>
  );
}
