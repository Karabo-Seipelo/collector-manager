import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Divider } from "./divider";

describe("Divider", () => {
  it("renders a weak horizontal separator by default", () => {
    render(<Divider />);

    expect(screen.getByRole("separator")).toHaveClass(
      "h-px",
      "w-full",
      "border-0",
      "bg-stroke-weak",
    );
  });

  it("uses the strong stroke token", () => {
    render(<Divider type="strong" />);

    expect(screen.getByRole("separator")).toHaveClass("bg-stroke-strong");
    expect(screen.getByRole("separator")).not.toHaveClass("bg-stroke-weak");
  });
});
