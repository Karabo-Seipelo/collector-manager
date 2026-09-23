import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("associates the label with the checkbox", () => {
    render(<Checkbox label="Mint" id="condition-mint" />);

    const checkbox = screen.getByRole("checkbox", { name: "Mint" });
    expect(checkbox).toHaveAttribute("id", "condition-mint");
  });

  it("is unchecked by default", () => {
    render(<Checkbox label="Very good" />);
    expect(screen.getByRole("checkbox", { name: "Very good" })).not.toBeChecked();
  });

  it("can start checked", () => {
    render(<Checkbox label="Mint" defaultChecked />);
    expect(screen.getByRole("checkbox", { name: "Mint" })).toBeChecked();
  });

  it("matches the small and large Figma sizes", () => {
    const { rerender } = render(<Checkbox label="Mint" />);
    expect(screen.getByTestId("checkbox-box")).toHaveClass(
      "size-6",
      "rounded",
      "border-stroke-strong",
      "bg-fill-inverse",
    );
    expect(screen.getByText("Mint")).toHaveClass("text-tiny");

    rerender(<Checkbox label="Mint" size="large" />);
    expect(screen.getByTestId("checkbox-box")).toHaveClass("size-8");
    expect(screen.getByText("Mint")).toHaveClass("text-small");
  });

  it("sets the native mixed state and renders a minus when indeterminate", () => {
    render(<Checkbox label="Select all" indeterminate />);

    const checkbox = screen.getByRole("checkbox", { name: "Select all" });
    expect(checkbox).toBePartiallyChecked();
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    expect(screen.getByTestId("checkbox-indeterminate-icon")).toBeVisible();
  });

  it("uses error tokens and aria-invalid when invalid", () => {
    render(<Checkbox label="Mint" invalid />);

    expect(screen.getByRole("checkbox", { name: "Mint" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByTestId("checkbox-box")).toHaveClass(
      "border-2",
      "border-stroke-error-strong",
      "bg-fill-error-weak",
    );
  });

  it("toggles when the label is clicked", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Good" />);

    await user.click(screen.getByText("Good"));

    expect(screen.getByRole("checkbox", { name: "Good" })).toBeChecked();
  });

  it("calls onChange when toggled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox label="Fair" onChange={onChange} />);
    await user.click(screen.getByRole("checkbox", { name: "Fair" }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox label="Poor" disabled onChange={onChange} />);
    await user.click(screen.getByRole("checkbox", { name: "Poor" }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("checkbox", { name: "Poor" })).not.toBeChecked();
    expect(screen.getByText("Poor")).toHaveClass("text-text-disabled");
    expect(screen.getByTestId("checkbox-box")).toHaveClass(
      "border-stroke-disabled",
    );
  });

  it("forwards ref to the input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox label="Mint" ref={ref} />);
    expect(ref.current?.tagName).toBe("INPUT");
    expect(ref.current?.type).toBe("checkbox");
  });
});
