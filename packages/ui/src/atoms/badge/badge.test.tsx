import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./badge";

describe("Badge", () => {
  it("renders a display-only status label", () => {
    render(<Badge>In stock</Badge>);

    expect(screen.getByText("In stock")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("applies the requested tone tokens", () => {
    render(<Badge tone="error">Error</Badge>);

    expect(screen.getByText("Error").parentElement).toHaveClass(
      "bg-fill-error-weak",
      "border-stroke-error-weak",
      "text-text-error",
    );
  });

  it("matches Figma small and medium heights", () => {
    const { rerender } = render(<Badge size="medium">Label</Badge>);

    expect(screen.getByText("Label").parentElement).toHaveClass("h-8");

    rerender(<Badge size="small">Label</Badge>);

    expect(screen.getByText("Label").parentElement).toHaveClass("h-6");
  });

  it("renders a leading icon", () => {
    render(<Badge icon={<span data-testid="icon" />}>Label</Badge>);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders a status dot instead of an icon", () => {
    render(
      <Badge tone="success" dot icon={<span data-testid="icon" />}>
        Live
      </Badge>,
    );

    expect(screen.getByTestId("badge-dot")).toBeInTheDocument();
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
  });
});
