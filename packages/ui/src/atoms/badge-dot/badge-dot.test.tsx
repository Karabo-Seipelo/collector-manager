import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BadgeDot } from "./badge-dot";

describe("BadgeDot", () => {
  it("renders a decorative notification dot by default", () => {
    render(<BadgeDot />);

    expect(screen.getByTestId("badge-dot")).toHaveClass(
      "size-3",
      "bg-fill-error-strong",
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByTestId("badge-dot-glyph")).not.toBeInTheDocument();
  });

  it("matches Figma sizes", () => {
    const { rerender } = render(<BadgeDot size="small" />);
    expect(screen.getByTestId("badge-dot")).toHaveClass("size-2");

    rerender(<BadgeDot size="medium" />);
    expect(screen.getByTestId("badge-dot")).toHaveClass("size-3");

    rerender(<BadgeDot size="large" />);
    expect(screen.getByTestId("badge-dot")).toHaveClass("size-4");
  });

  it("omits the glyph at small size", () => {
    render(<BadgeDot type="online" size="small" />);

    expect(screen.queryByTestId("badge-dot-glyph")).not.toBeInTheDocument();
  });

  it("renders an online check glyph", () => {
    render(<BadgeDot type="online" />);

    expect(screen.getByTestId("badge-dot")).toHaveClass("bg-fill-success-strong");
    expect(screen.getByTestId("badge-dot-glyph")).toHaveAttribute(
      "data-glyph",
      "check",
    );
  });

  it("renders busy, away, and offline glyphs", () => {
    const { rerender } = render(<BadgeDot type="busy" />);
    expect(screen.getByTestId("badge-dot-glyph")).toHaveAttribute(
      "data-glyph",
      "minus",
    );

    rerender(<BadgeDot type="away" />);
    expect(screen.getByTestId("badge-dot-glyph")).toHaveAttribute(
      "data-glyph",
      "clock",
    );

    rerender(<BadgeDot type="offline" />);
    expect(screen.getByTestId("badge-dot-glyph")).toHaveAttribute(
      "data-glyph",
      "x",
    );
  });
});
