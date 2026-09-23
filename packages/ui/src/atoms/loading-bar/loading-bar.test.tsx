import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LoadingBar } from "./loading-bar";

describe("LoadingBar", () => {
  it("renders progress with percentage label by default", () => {
    render(<LoadingBar value={50} />);

    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "50");
    expect(bar).toHaveAttribute("aria-valuetext", "50%");
    expect(screen.getByText("50%")).toBeVisible();
  });

  it("clamps values below 0 and above 100", () => {
    const { rerender } = render(<LoadingBar value={-10} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByText("0%")).toBeVisible();

    rerender(<LoadingBar value={150} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByText("100%")).toBeVisible();
  });

  it("hides the label when showLabel is false", () => {
    render(<LoadingBar value={25} showLabel={false} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "25");
    expect(screen.queryByText("25%")).not.toBeInTheDocument();
  });

  it("uses a custom label formatter", () => {
    render(
      <LoadingBar
        value={33.6}
        formatLabel={(next) => `${next.toFixed(1)} percent`}
      />,
    );

    expect(screen.getByText("33.6 percent")).toBeVisible();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuetext",
      "33.6 percent",
    );
  });
});
