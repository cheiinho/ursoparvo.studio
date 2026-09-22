"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { PlaceId, SceneView, ScenarioId, ShellState, StepId } from "@/content/intraday/types";

export type Destination = "forecast" | "schedule";

type State = {
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
  | { type: "place"; place: PlaceId }
  | { type: "signal"; signal: ScenarioId }
  | { type: "previous"; on: boolean }
  | { type: "destination"; destination: Destination }
  | { type: "clearDestination" }
  | { type: "reforecast"; on: boolean }
  | { type: "panel"; open: boolean }
  | { type: "filter"; on: boolean };

function initialOf(view: SceneView): State {
  return {
    phase: view.phase,
    place: view.place,
    signal: "volume",
    showPrevious: view.showPrevious ?? false,
    destination: null,
    reforecastOn: view.reforecastOn ?? false,
    panelOpen: view.panelOpen ?? false,
    panelSeen: view.panelOpen ?? false,
    filterOn: false,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "place":
      return { ...state, place: action.place, destination: null, panelOpen: false };
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
  shell: ShellState;
  unread: boolean;
  nav: boolean;
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

export function ExperienceProvider({ view, children }: { view: SceneView; children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, view, initialOf);

  const setPlace = useCallback((place: PlaceId) => dispatch({ type: "place", place }), []);

  const value = useMemo<Value>(
    () => ({
      ...state,
      shell: shellOf(state.phase),
      unread: state.phase >= 4 && !state.panelSeen,
      nav: view.nav ?? false,
      setPlace,
      setSignal: (signal) => dispatch({ type: "signal", signal }),
      setShowPrevious: (on) => dispatch({ type: "previous", on }),
      openPeriod: (destination) => dispatch({ type: "destination", destination }),
      clearDestination: () => dispatch({ type: "clearDestination" }),
      setReforecast: (on) => dispatch({ type: "reforecast", on }),
      setPanel: (open) => dispatch({ type: "panel", open }),
      setFilter: (on) => dispatch({ type: "filter", on }),
    }),
    [state, view.nav, setPlace],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience(): Value {
  const value = useContext(ExperienceContext);
  if (!value) throw new Error("Intraday experience is missing its provider");
  return value;
}
