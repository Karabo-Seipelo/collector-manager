import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { useScrollLock } from "./use-scroll-lock";

describe("useScrollLock", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("locks body scroll while active", () => {
    const { rerender } = renderHook(({ active }) => useScrollLock(active), {
      initialProps: { active: true },
    });

    expect(document.body.style.overflow).toBe("hidden");

    rerender({ active: false });
    expect(document.body.style.overflow).toBe("");
  });
});
