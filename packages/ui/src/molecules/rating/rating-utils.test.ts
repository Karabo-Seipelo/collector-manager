import { describe, expect, it } from "vitest";

import { formatRatingValue, getRatingIconState } from "./rating-utils";

describe("getRatingIconState", () => {
  it("maps full, half, and empty states from a fractional value", () => {
    expect(getRatingIconState(3.5, 0)).toBe("full");
    expect(getRatingIconState(3.5, 2)).toBe("full");
    expect(getRatingIconState(3.5, 3)).toBe("half");
    expect(getRatingIconState(3.5, 4)).toBe("empty");
  });
});

describe("formatRatingValue", () => {
  it("formats integers without decimals and keeps one decimal otherwise", () => {
    expect(formatRatingValue(4)).toBe("4");
    expect(formatRatingValue(3.5)).toBe("3.5");
  });
});
