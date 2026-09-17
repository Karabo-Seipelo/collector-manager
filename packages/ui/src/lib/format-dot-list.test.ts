import { describe, expect, it } from "vitest";

import { formatDotList } from "./format-dot-list";

describe("formatDotList", () => {
  it("returns null for empty values", () => {
    expect(formatDotList(undefined)).toBeNull();
    expect(formatDotList("")).toBeNull();
    expect(formatDotList([])).toBeNull();
  });

  it("joins array values with the default separator", () => {
    expect(formatDotList(["Vinyl", "1959", "NM"])).toBe("Vinyl · 1959 · NM");
  });

  it("splits, trims, and joins comma-separated strings", () => {
    expect(formatDotList("Vinyl, 1959 , NM")).toBe("Vinyl · 1959 · NM");
  });

  it("supports a custom separator", () => {
    expect(formatDotList(["A", "B"], " | ")).toBe("A | B");
  });
});
