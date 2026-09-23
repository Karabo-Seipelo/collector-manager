import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { useFocusTrap } from "./use-focus-trap";

function TrapExample({ active }: { active: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  useFocusTrap(ref, active);

  return (
    <div>
      <button type="button">Outside</button>
      <div ref={ref}>
        <button type="button">First</button>
        <button type="button">Last</button>
      </div>
    </div>
  );
}

describe("useFocusTrap", () => {
  it("focuses the first element and cycles tab order", async () => {
    const user = userEvent.setup();
    render(<TrapExample active />);

    expect(screen.getByRole("button", { name: "First" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "Last" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "First" })).toHaveFocus();
  });
});
