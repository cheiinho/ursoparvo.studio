"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { StepId } from "@/content/intraday/types";

export type Destination = "issue" | "forecast" | "schedule";

type StoryValue = {
  step: StepId;
  setStep: (step: StepId) => void;
  showPrevious: boolean;
  setShowPrevious: (value: boolean) => void;
  destination: Destination;
  setDestination: (value: Destination) => void;
};

const StoryContext = createContext<StoryValue | null>(null);

export function StoryProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<StepId>(1);
  const [showPrevious, setShowPrevious] = useState(false);
  const [destination, setDestination] = useState<Destination>("issue");
  return (
    <StoryContext.Provider value={{ step, setStep, showPrevious, setShowPrevious, destination, setDestination }}>
      {children}
    </StoryContext.Provider>
  );
}

export function useStory(): StoryValue {
  const value = useContext(StoryContext);
  if (!value) throw new Error("Intraday story is missing its provider");
  return value;
}
