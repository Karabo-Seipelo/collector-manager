import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BadgeCount } from "./badge-count";

describe("BadgeCount", () => {
  it("renders the notification count", () => {
    render(<BadgeCount>8</BadgeCount>);

    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("uses error-strong fill for the default strong emphasis", () => {
    render(<BadgeCount>8</BadgeCount>);

    expect(screen.getByTestId("badge-count")).toHaveClass(
      "bg-fill-error-strong",
      "h-6",
    );
  });

  it("applies moderate error-weak tokens", () => {
    render(<BadgeCount emphasis="moderate">8</BadgeCount>);

    expect(screen.getByTestId("badge-count")).toHaveClass(
      "bg-fill-error-weak",
      "border-stroke-error-weak",
      "text-text-error",
    );
  });

  it("applies weak fill tokens", () => {
    render(<BadgeCount emphasis="weak">8</BadgeCount>);

    expect(screen.getByTestId("badge-count")).toHaveClass(
      "bg-fill-weak",
      "border-stroke-weak",
      "text-fg-weak",
    );
  });
});
