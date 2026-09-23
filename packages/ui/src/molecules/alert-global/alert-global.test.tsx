import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../atoms/button/button";
import { AlertGlobal } from "./alert-global";

describe("AlertGlobal", () => {
  it("renders a full-width error banner by default", () => {
    render(
      <AlertGlobal>System maintenance starts at 14:00.</AlertGlobal>,
    );

    const banner = screen.getByRole("alert");
    expect(banner).toHaveClass(
      "w-full",
      "bg-fill-error-weak",
      "border-stroke-error-weak",
      "min-h-14",
    );
    expect(screen.getByText("System maintenance starts at 14:00.")).toHaveClass(
      "text-tiny",
    );
    expect(screen.queryByTestId("alert-bar")).not.toBeInTheDocument();
  });

  it("stacks the action under the message on mobile", () => {
    render(
      <AlertGlobal
        device="mobile"
        action={<Button size="small">Label</Button>}
      >
        System maintenance starts at 14:00.
      </AlertGlobal>,
    );

    expect(screen.getByRole("alert")).toHaveClass("min-h-[100px]");
    expect(screen.getByTestId("alert-global-body")).toHaveClass("flex-col");
    expect(screen.getByRole("button", { name: "Label" })).toBeInTheDocument();
  });

  it("dismisses when the close button is activated", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <AlertGlobal onClose={onClose}>System maintenance starts at 14:00.</AlertGlobal>,
    );

    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("uses status role for non-urgent inverse tones", () => {
    render(
      <AlertGlobal tone="inverse-brand">Nightly sync complete.</AlertGlobal>,
    );

    expect(screen.getByRole("status")).toHaveClass("bg-primary");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
