import type { RatingIconState } from "./rating-icon";

export function getRatingIconState(
  value: number,
  index: number,
): RatingIconState {
  const position = index + 1;

  if (value >= position) {
    return "full";
  }

  if (value >= position - 0.5) {
    return "half";
  }

  return "empty";
}

export function formatRatingValue(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
