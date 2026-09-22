"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { ActId, PlaceId, ScenarioId, ShellState, StepId } from "@/content/intraday/types";

export const ACT_ORDER: readonly ActId[] = [
  "plan",
  "divergence",
  "detection",
  "permission",
  "reforecast",
  "inspection",
];

export type Destination = "forecast" | "schedule";

type State = {
  act: ActId;
  phase: StepId;
  place: PlaceId;
  signal: ScenarioId;
  showPrevious: boolean;
  /** Set when the visitor opens the affected period from an issue, so the destination can take focus. */
  destination: Destination | null;
  reforecastOn: boolean;
  panelOpen: boolean;
  panelSeen: boolean;
  filterOn: boolean;
};

type Action =
  | { type: "act"; act: ActId }
  | { type: "place"; place: PlaceId }
  | { type: "signal"; signal: ScenarioId }
  | { type: "previous"; on: boolean }
  | { type: "destination"; destination: Destination }
  | { type: "clearDestination" }
  | { type: "reforecast"; on: boolean }
  | { type: "panel"; open: boolean }
  | { type: "filter"; on: boolean };

const ACT_STATE: Record<ActId, Pick<State, "phase" | "place">> = {
  plan: { phase: 1, place: "forecast" },
  divergence: { phase: 2, place: "forecast" },
  detection: { phase: 3, place: "forecast" },
  permission: { phase: 3, place: "configurations" },
  reforecast: { phase: 4, place: "forecast" },
  inspection: { phase: 5, place: "forecast" },
};

const INITIAL: State = {
  act: "plan",
  phase: 1,
  place: "forecast",
  signal: "volume",
  showPrevious: false,
  destination: null,
  reforecastOn: false,
  panelOpen: false,
  panelSeen: false,
  filterOn: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "act": {
      const preset = ACT_STATE[action.act];
      return {
        ...state,
        ...preset,
        act: action.act,
        signal: action.act === "plan" ? "volume" : state.signal,
        showPrevious: action.act === "inspection" ? state.showPrevious : false,
        destination: null,
        panelOpen: false,
        panelSeen: preset.phase < 4,
        filterOn: preset.phase === 4 ? state.filterOn : false,
      };
    }
    case "place":
      return {
        ...state,
        place: action.place,
        destination: null,
        panelOpen: false,
      };
    case "signal":
      return { ...state, signal: action.signal };
    case "previous":
      return { ...state, showPrevious: action.on };
    case "destination":
      return {
        ...state,
        destination: action.destination,
        place: action.destination === "forecast" ? "forecast" : "teamSchedule",
        panelOpen: false,
      };
    case "clearDestination":
      return { ...state, destination: null };
    case "reforecast":
      return { ...state, reforecastOn: action.on };
    case "panel":
      return { ...state, panelOpen: action.open, panelSeen: action.open ? true : state.panelSeen };
    case "filter":
      return { ...state, filterOn: action.on };
    default:
      return state;
  }
}

type Value = State & {
  index: number;
  total: number;
  shell: ShellState;
  unread: boolean;
  goTo: (act: ActId) => void;
  step: (direction: -1 | 1) => void;
  restart: () => void;
  setPlace: (place: PlaceId) => void;
  setSignal: (signal: ScenarioId) => void;
  setShowPrevious: (on: boolean) => void;
  openPeriod: (destination: Destination) => void;
  clearDestination: () => void;
  setReforecast: (on: boolean) => void;
  setPanel: (open: boolean) => void;
  setFilter: (on: boolean) => void;
};

const ExperienceContext = createContext<Value | null>(null);

export function shellOf(phase: StepId): ShellState {
  if (phase >= 5) return "updated";
  if (phase === 4) return "inProgress";
  return "watching";
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const goTo = useCallback((act: ActId) => dispatch({ type: "act", act }), []);
  const step = useCallback(
    (direction: -1 | 1) => {
      const next = ACT_ORDER[ACT_ORDER.indexOf(state.act) + direction];
      if (next) dispatch({ type: "act", act: next });
    },
    [state.act],
  );

  const value = useMemo<Value>(
    () => ({
      ...state,
      index: ACT_ORDER.indexOf(state.act),
      total: ACT_ORDER.length,
      shell: shellOf(state.phase),
      unread: state.phase >= 4 && !state.panelSeen,
      goTo,
      step,
      restart: () => dispatch({ type: "act", act: "plan" }),
      setPlace: (place) => dispatch({ type: "place", place }),
      setSignal: (signal) => dispatch({ type: "signal", signal }),
      setShowPrevious: (on) => dispatch({ type: "previous", on }),
      openPeriod: (destination) => dispatch({ type: "destination", destination }),
      clearDestination: () => dispatch({ type: "clearDestination" }),
      setReforecast: (on) => dispatch({ type: "reforecast", on }),
      setPanel: (open) => dispatch({ type: "panel", open }),
      setFilter: (on) => dispatch({ type: "filter", on }),
    }),
    [state, goTo, step],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience(): Value {
  const value = useContext(ExperienceContext);
  if (!value) throw new Error("Intraday experience is missing its provider");
  return value;
}
