import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Stepper } from "./stepper";

describe("Stepper", () => {
  it("renders a labelled numeric field with stepper buttons", () => {
    render(<Stepper label="Quantity" defaultValue={1} required />);

    expect(screen.getByRole("spinbutton", { name: "Quantity" })).toHaveValue(1);
    expect(screen.getByRole("button", { name: "Decrease Quantity" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Increase Quantity" })).toBeVisible();
    expect(screen.getByTestId("stepper-field")).toHaveClass("shadow-raised");
  });

  it("increments and decrements the value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Stepper
        label="Quantity"
        defaultValue={1}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Increase Quantity" }));
    expect(onValueChange).toHaveBeenCalledWith(2);

    await user.click(screen.getByRole("button", { name: "Decrease Quantity" }));
    expect(onValueChange).toHaveBeenLastCalledWith(1);
  });

  it("respects min and max bounds", async () => {
    const user = userEvent.setup();

    render(
      <Stepper label="Quantity" defaultValue={0} min={0} max={2} />,
    );

    expect(screen.getByRole("button", { name: "Decrease Quantity" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Increase Quantity" }));
    await user.click(screen.getByRole("button", { name: "Increase Quantity" }));
    expect(screen.getByRole("spinbutton", { name: "Quantity" })).toHaveValue(2);
    expect(screen.getByRole("button", { name: "Increase Quantity" })).toBeDisabled();
  });

  it("shows an error state above the field", () => {
    render(
      <Stepper
        label="Quantity"
        defaultValue={1}
        error="Error message"
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Error message");
    expect(screen.getByRole("spinbutton", { name: "Quantity" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByTestId("stepper-field")).toHaveClass(
      "border-stroke-error-strong",
      "bg-fill-error-weak",
    );
  });

  it("applies disabled styling", () => {
    render(<Stepper label="Quantity" defaultValue={1} disabled />);

    expect(screen.getByRole("spinbutton", { name: "Quantity" })).toBeDisabled();
    expect(screen.getByTestId("stepper-field")).not.toHaveClass("shadow-raised");
    expect(screen.getByTestId("stepper-field")).toHaveClass("border-stroke-disabled");
    expect(screen.getByRole("button", { name: "Decrease Quantity" })).toHaveClass(
      "border-r",
      "border-stroke-disabled",
    );
  });

  it("uses divider borders on the step buttons instead of full outlines", () => {
    render(<Stepper label="Quantity" defaultValue={1} />);

    const decrease = screen.getByRole("button", { name: "Decrease Quantity" });
    const increase = screen.getByRole("button", { name: "Increase Quantity" });

    expect(decrease).toHaveClass("border-r", "border-stroke-strong");
    expect(decrease).not.toHaveClass("border-l", "rounded-l-lg");
    expect(increase).toHaveClass("border-l", "border-stroke-strong");
    expect(increase).not.toHaveClass("border-r", "rounded-r-lg");
  });

  it("forwards its ref to the numeric input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Stepper ref={ref} label="Quantity" />);

    expect(ref.current?.type).toBe("number");
  });
});
