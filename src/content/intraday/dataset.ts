import type { Person, Quarter } from "./types";

/**
 * Authored illustration. Values are not produced by a forecasting function.
 * The specification's table is the source. Do not derive `next` from `previous`.
 */
export const dataset = {
  account: "Greyharbour Contact Centre",
  queue: "Support",
  contrastQueue: "Orders",
  dateLabel: "Tuesday 6 June 2023",
  timeZone: "Europe/Lisbon",
  affected: { start: "10:00", end: "11:00" },
  quarters: [
    { time: "08:00", previous: 48, actual: 46, next: null },
    { time: "08:15", previous: 50, actual: 51, next: null },
    { time: "08:30", previous: 52, actual: 50, next: null },
    { time: "08:45", previous: 54, actual: 55, next: null },
    { time: "09:00", previous: 56, actual: 58, next: null },
    { time: "09:15", previous: 58, actual: 57, next: null },
    { time: "09:30", previous: 60, actual: 62, next: null },
    { time: "09:45", previous: 62, actual: 64, next: null },
    { time: "10:00", previous: 64, actual: 83, next: null },
    { time: "10:15", previous: 64, actual: 83, next: null },
    { time: "10:30", previous: 66, actual: 86, next: null },
    { time: "10:45", previous: 66, actual: 86, next: null },
    { time: "11:00", previous: 68, actual: null, next: 88 },
    { time: "11:15", previous: 68, actual: null, next: 88 },
    { time: "11:30", previous: 66, actual: null, next: 86 },
    { time: "11:45", previous: 64, actual: null, next: 84 },
    { time: "12:00", previous: 58, actual: null, next: 78 },
    { time: "12:15", previous: 52, actual: null, next: 72 },
    { time: "12:30", previous: 48, actual: null, next: 68 },
    { time: "12:45", previous: 46, actual: null, next: 66 },
    { time: "13:00", previous: 50, actual: null, next: 70 },
    { time: "13:15", previous: 54, actual: null, next: 74 },
    { time: "13:30", previous: 56, actual: null, next: 76 },
    { time: "13:45", previous: 58, actual: null, next: 78 },
    { time: "14:00", previous: 60, actual: null, next: 80 },
    { time: "14:15", previous: 60, actual: null, next: 80 },
    { time: "14:30", previous: 58, actual: null, next: 78 },
    { time: "14:45", previous: 56, actual: null, next: 76 },
    { time: "15:00", previous: 54, actual: null, next: 74 },
    { time: "15:15", previous: 52, actual: null, next: 72 },
    { time: "15:30", previous: 50, actual: null, next: 70 },
    { time: "15:45", previous: 48, actual: null, next: 68 },
    { time: "16:00", previous: 46, actual: null, next: 66 },
    { time: "16:15", previous: 44, actual: null, next: 64 },
    { time: "16:30", previous: 42, actual: null, next: 62 },
    { time: "16:45", previous: 40, actual: null, next: 60 },
  ] as const satisfies readonly Quarter[],
  people: [
    { name: "Ana Varela", shiftStart: "08:00", shiftEnd: "16:00" },
    { name: "Bruno Caldas", shiftStart: "08:00", shiftEnd: "16:00" },
    { name: "Clara Nogueira", shiftStart: "09:00", shiftEnd: "17:00" },
    { name: "Duarte Fialho", shiftStart: "09:00", shiftEnd: "17:00" },
    { name: "Eva Ramalho", shiftStart: "10:00", shiftEnd: "18:00" },
    { name: "Filipe Gouveia", shiftStart: "12:00", shiftEnd: "20:00" },
  ] as const satisfies readonly Person[],
} as const;

export type Dataset = typeof dataset;
