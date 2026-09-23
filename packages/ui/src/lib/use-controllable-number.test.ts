import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useControllableNumber } from "./use-controllable-number";

describe("useControllableNumber", () => {
  it("uses the default value when uncontrolled", () => {
    const { result } = renderHook(() => useControllableNumber(undefined, 25));

    expect(result.current.currentValue).toBe(25);
  });

  it("updates the inner value when uncontrolled", () => {
    const { result } = renderHook(() => useControllableNumber(undefined, 0));

    act(() => {
      result.current.setCurrentValue(50);
    });

    expect(result.current.currentValue).toBe(50);
  });

  it("does not update inner value when controlled", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useControllableNumber(value, 0),
      { initialProps: { value: 10 as number | undefined } },
    );

    act(() => {
      result.current.setCurrentValue(50);
    });

    expect(result.current.currentValue).toBe(10);

    rerender({ value: 20 });
    expect(result.current.currentValue).toBe(20);
  });
});
