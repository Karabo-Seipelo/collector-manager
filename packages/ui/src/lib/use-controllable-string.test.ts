import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useControllableString } from "./use-controllable-string";

describe("useControllableString", () => {
  it("updates uncontrolled value", () => {
    const { result } = renderHook(() =>
      useControllableString(undefined, "initial"),
    );

    expect(result.current.isControlled).toBe(false);
    expect(result.current.currentValue).toBe("initial");

    act(() => {
      result.current.setCurrentValue("updated");
    });

    expect(result.current.currentValue).toBe("updated");
  });

  it("uses the controlled value without internal updates", () => {
    const { result } = renderHook(() => useControllableString("controlled"));

    expect(result.current.isControlled).toBe(true);
    expect(result.current.currentValue).toBe("controlled");

    act(() => {
      result.current.setCurrentValue("ignored");
    });

    expect(result.current.currentValue).toBe("controlled");
  });
});
