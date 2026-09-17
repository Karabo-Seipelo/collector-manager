import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useFieldIds } from "./use-field-ids";

describe("useFieldIds", () => {
  it("uses the provided id", () => {
    const { result } = renderHook(() =>
      useFieldIds("item-name", { hint: "Hint", error: "Error" }),
    );

    expect(result.current.fieldId).toBe("item-name");
    expect(result.current.hintId).toBe("item-name-hint");
    expect(result.current.errorId).toBe("item-name-error");
    expect(result.current.describedBy).toBe("item-name-hint item-name-error");
  });

  it("auto-generates an id when omitted", () => {
    const { result } = renderHook(() => useFieldIds(undefined, {}));
    expect(result.current.fieldId).toBeTruthy();
    expect(result.current.hintId).toBeUndefined();
    expect(result.current.errorId).toBeUndefined();
    expect(result.current.describedBy).toBeUndefined();
  });

  it("builds describedBy from hint or error only", () => {
    const { result: hintOnly } = renderHook(() =>
      useFieldIds("field", { hint: "Hint" }),
    );
    expect(hintOnly.current.describedBy).toBe("field-hint");

    const { result: errorOnly } = renderHook(() =>
      useFieldIds("field", { error: "Error" }),
    );
    expect(errorOnly.current.describedBy).toBe("field-error");
  });
});
