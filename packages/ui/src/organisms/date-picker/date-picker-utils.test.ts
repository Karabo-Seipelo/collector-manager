import { describe, expect, it } from "vitest";

import {
  addDays,
  addMonthsClamped,
  formatAccessibleDate,
  formatDate,
  formatMonthLabel,
  getCalendarWeeks,
  getFocusDate,
  getNextFocusedDate,
  parseDate,
  sameDay,
  startOfMonth,
} from "./date-picker-utils";

describe("date-picker-utils", () => {
  it("formats and parses dd/mm/yyyy values", () => {
    const date = new Date(2024, 4, 23, 12);
    expect(formatDate(date)).toBe("23/05/2024");
    expect(parseDate("23/05/2024")).toEqual(date);
    expect(parseDate("31/02/2024")).toBeNull();
    expect(parseDate("2024-05-23")).toBeNull();
  });

  it("compares dates by day", () => {
    const left = new Date(2024, 4, 15, 12);
    const right = new Date(2024, 4, 15, 18);
    expect(sameDay(left, right)).toBe(true);
    expect(sameDay(left, new Date(2024, 4, 16, 12))).toBe(false);
  });

  it("builds a Sunday-first calendar grid for May 2024", () => {
    const weeks = getCalendarWeeks(new Date(2024, 4, 1, 12));
    const firstWeek = weeks[0]!;
    const lastWeek = weeks[4]!;

    expect(weeks).toHaveLength(5);
    expect(firstWeek.slice(0, 3)).toEqual([null, null, null]);
    expect(firstWeek[3]!.getDate()).toBe(1);
    expect(lastWeek[5]!.getDate()).toBe(31);
  });

  it("adds days and clamps month changes", () => {
    const date = new Date(2024, 0, 31, 12);
    expect(addDays(date, 1).getDate()).toBe(1);
    expect(addMonthsClamped(date, 1).getDate()).toBe(29);
    expect(addMonthsClamped(date, 1).getMonth()).toBe(1);
  });

  it("chooses the initial focused day for a month", () => {
    const month = startOfMonth(new Date(2024, 4, 1, 12));
    const selected = new Date(2024, 4, 15, 12);
    const today = new Date(2024, 4, 10, 12);
    expect(getFocusDate(month, selected, today)).toEqual(selected);
    expect(getFocusDate(month, null, today)).toEqual(today);
    expect(getFocusDate(month, null, new Date(2024, 3, 10, 12))).toEqual(month);
  });

  it("formats accessible labels", () => {
    const date = new Date(2024, 4, 15, 12);
    expect(formatAccessibleDate(date)).toBe("15 May 2024");
    expect(formatMonthLabel(date)).toBe("May 2024");
  });

  it("maps keyboard navigation to the next focused date", () => {
    const date = new Date(2024, 4, 15, 12);
    expect(getNextFocusedDate(date, "ArrowRight", false)?.getDate()).toBe(16);
    expect(getNextFocusedDate(date, "PageUp", false)?.getMonth()).toBe(3);
    expect(getNextFocusedDate(date, "PageDown", true)?.getFullYear()).toBe(2025);
    expect(getNextFocusedDate(date, "Escape", false)).toBeNull();
  });
});
