import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Toggle } from "./toggle";

describe("Toggle", () => {
  it("associates its label and renders unselected by default", () => {
    render(<Toggle label="Notifications" />);

    const toggle = screen.getByRole("switch", { name: "Notifications" });
    expect(toggle).not.toBeChecked();
    expect(toggle).toHaveAttribute("type", "checkbox");
  });

  it("defaults to the small Figma size and supports medium", () => {
    const { rerender } = render(<Toggle label="Notifications" />);

    expect(screen.getByTestId("toggle-track")).toHaveClass("h-6", "w-12");
    expect(screen.getByText("Notifications")).toHaveClass("text-tiny");

    rerender(<Toggle label="Notifications" size="medium" />);
    expect(screen.getByTestId("toggle-track")).toHaveClass("h-8", "w-16");
    expect(screen.getByText("Notifications")).toHaveClass("text-small");
  });

  it("toggles and emits change when activated", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle label="Notifications" onChange={onChange} />);

    await user.click(screen.getByText("Notifications"));

    expect(screen.getByRole("switch", { name: "Notifications" })).toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("uses selected, unlabeled, and disabled Figma tokens", () => {
    const { rerender } = render(
      <Toggle label="Notifications" defaultChecked />,
    );

    expect(screen.getByRole("switch", { name: "Notifications" })).toBeChecked();
    expect(screen.getByTestId("toggle-track")).toHaveClass(
      "peer-checked:bg-primary",
    );

    rerender(<Toggle aria-label="Notifications" />);
    expect(
      screen.getByRole("switch", { name: "Notifications" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Notifications")).not.toBeInTheDocument();

    rerender(<Toggle label="Notifications" disabled />);
    expect(screen.getByText("Notifications")).toHaveClass("text-text-disabled");
    expect(
      screen.getByRole("switch", { name: "Notifications" }),
    ).toBeDisabled();
  });

  it("outlines the knob with the track colour of each state", () => {
    const { rerender } = render(<Toggle label="Notifications" />);

    expect(screen.getByTestId("toggle-thumb")).toHaveClass("border-2");
    expect(screen.getByTestId("toggle-track")).toHaveClass(
      "[&>[data-testid=toggle-thumb]]:border-stroke-strong",
      "peer-checked:[&>[data-testid=toggle-thumb]]:border-primary",
    );

    rerender(<Toggle label="Notifications" disabled />);
    expect(screen.getByTestId("toggle-track")).toHaveClass(
      "[&>[data-testid=toggle-thumb]]:border-fill-disabled",
    );
  });

  it("forwards its ref to the native checkbox", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Toggle ref={ref} label="Notifications" />);

    expect(ref.current?.type).toBe("checkbox");
    expect(ref.current?.getAttribute("role")).toBe("switch");
  });
});
