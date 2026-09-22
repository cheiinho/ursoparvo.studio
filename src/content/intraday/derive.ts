import { dataset } from "./dataset";
import type { Person, Quarter } from "./types";

function minutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

export function hourKey(time: string): string {
  return `${time.slice(0, 2)}:00`;
}

export function hourlyPrevious(): Array<{ hour: string; total: number }> {
  const totals = new Map<string, number>();
  for (const quarter of dataset.quarters) {
    const hour = hourKey(quarter.time);
    totals.set(hour, (totals.get(hour) ?? 0) + quarter.previous);
  }
  return [...totals.entries()].map(([hour, total]) => ({ hour, total }));
}

export function hourlyNext(hour: string): number | null {
  const rows = dataset.quarters.filter((quarter) => hourKey(quarter.time) === hour);
  if (rows.some((quarter) => quarter.next === null)) return null;
  return rows.reduce((sum, quarter) => sum + (quarter.next ?? 0), 0);
}

export function sumField(
  times: readonly string[],
  field: "previous" | "actual" | "next",
): number {
  return times.reduce((sum, time) => {
    const quarter = dataset.quarters.find((row) => row.time === time);
    const value = quarter?.[field];
    return sum + (typeof value === "number" ? value : 0);
  }, 0);
}

export function quarterByTime(time: string): Quarter | undefined {
  return dataset.quarters.find((quarter) => quarter.time === time);
}

export function domain(values: readonly number[]): { min: number; max: number } {
  const max = values.reduce((highest, value) => Math.max(highest, value), 0);
  return { min: 0, max: max === 0 ? 1 : max };
}

export function isPresent(person: Person, start: string, end: string): boolean {
  const at = minutes(start);
  return minutes(person.shiftStart) <= at && at < minutes(person.shiftEnd) && minutes(end) > at;
}

export function presentNames(start: string, end: string): string[] {
  return dataset.people.filter((person) => isPresent(person, start, end)).map((person) => person.name);
}

export function periodSpan(start: string, end: string): string {
  return `${start} to ${end}`;
}

export function affectedPeriodLabel(prefix: string, start: string, end: string): string {
  return `${prefix}, ${periodSpan(start, end)}`;
}
