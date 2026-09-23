import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ProgressIndicator } from "./progress-indicator";

describe("ProgressIndicator", () => {
  it("renders the step label and progress bar", () => {
    render(<ProgressIndicator currentStep={2} totalSteps={5} />);

    expect(screen.getByText("Step 2 of 5")).toBeVisible();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "2");
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "5");
  });

  it("styles completed and remaining steps", () => {
    render(<ProgressIndicator currentStep={2} totalSteps={5} />);

    const steps = screen.getByRole("progressbar").children;
    expect(steps[0]).toHaveClass("bg-primary");
    expect(steps[1]).toHaveClass("bg-primary");
    expect(steps[2]).toHaveClass("border-stroke-weak", "shadow-sunken");
  });

  it("calls onBack when the back link is clicked", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();

    render(
      <ProgressIndicator currentStep={3} totalSteps={5} onBack={onBack} />,
    );

    await user.click(screen.getByRole("link", { name: "Back" }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("disables back on the first step", () => {
    render(<ProgressIndicator currentStep={1} totalSteps={5} onBack={vi.fn()} />);

    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("supports a custom label and hides back when requested", () => {
    render(
      <ProgressIndicator
        currentStep={4}
        totalSteps={5}
        label="Uploading files"
        showBack={false}
      />,
    );

    expect(screen.getByText("Uploading files")).toBeVisible();
    expect(screen.queryByRole("link", { name: "Back" })).not.toBeInTheDocument();
  });

  it("clamps out-of-range steps", () => {
    render(<ProgressIndicator currentStep={8} totalSteps={5} />);

    expect(screen.getByText("Step 5 of 5")).toBeVisible();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "5");
  });
});
