"use client";

import { createContext, useCallback, useContext, useState } from "react";

const AnnounceContext = createContext<(message: string) => void>(() => {});

export function Announcer({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");
  const announce = useCallback((next: string) => {
    setMessage(next);
  }, []);

  return (
    <AnnounceContext.Provider value={announce}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {message}
      </div>
    </AnnounceContext.Provider>
  );
}

export function useAnnounce(): (message: string) => void {
  return useContext(AnnounceContext);
}
