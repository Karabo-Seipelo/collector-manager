import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useControllableBoolean } from "./use-controllable-boolean";

describe("useControllableBoolean", () => {
  it("uses defaultValue when uncontrolled", () => {
    const { result } = renderHook(() => useControllableBoolean(undefined, true));
    expect(result.current.currentValue).toBe(true);
  });

  it("updates internal state when uncontrolled", () => {
    const { result } = renderHook(() => useControllableBoolean(undefined, false));

    act(() => result.current.setCurrentValue(true));

    expect(result.current.currentValue).toBe(true);
  });

  it("reflects controlled value without mutating internal state", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useControllableBoolean(value, false),
      { initialProps: { value: false as boolean | undefined } },
    );

    act(() => result.current.setCurrentValue(true));
    expect(result.current.currentValue).toBe(false);

    rerender({ value: true });
    expect(result.current.currentValue).toBe(true);
  });
});
