import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Slot } from "./slot";

describe("Slot", () => {
  it("renders the default placeholder label", () => {
    render(<Slot />);

    expect(screen.getByText("Swap with another component")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("applies Practical UI slot styling", () => {
    const { container } = render(<Slot data-testid="slot" />);

    expect(container.firstElementChild).toHaveClass(
      "rounded-lg",
      "border-dashed",
      "border-stroke-strong",
      "bg-fill-weaker",
      "px-8",
      "py-6",
    );
  });

  it("supports a custom label", () => {
    render(<Slot label="Custom slot" />);

    expect(screen.getByText("Custom slot")).toBeInTheDocument();
  });

  it("renders children instead of the placeholder label", () => {
    render(
      <Slot>
        <button type="button">Action</button>
      </Slot>,
    );

    expect(
      screen.queryByText("Swap with another component"),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action" })).toBeVisible();
  });
});
