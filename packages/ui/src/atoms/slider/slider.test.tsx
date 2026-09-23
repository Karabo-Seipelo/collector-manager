import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Slider } from "./slider";

describe("Slider", () => {
  it("renders a labelled slider with the current value", () => {
    render(<Slider label="Volume" defaultValue={25} />);

    expect(screen.getByRole("slider", { name: "Volume" })).toHaveValue("25");
    expect(screen.getByText("25%")).toBeVisible();
    expect(screen.getByTestId("slider-track")).toHaveClass(
      "h-2",
      "rounded-full",
      "bg-fill-weak",
    );
  });

  it("updates the value and calls onValueChange", () => {
    const onValueChange = vi.fn();

    render(
      <Slider
        label="Volume"
        defaultValue={0}
        onValueChange={onValueChange}
      />,
    );

    const slider = screen.getByRole("slider", { name: "Volume" });
    fireEvent.change(slider, { target: { value: "25" } });

    expect(onValueChange).toHaveBeenCalledWith(25);
    expect(slider).toHaveValue("25");
  });

  it("renders the filled track when the value is above zero", () => {
    render(<Slider label="Volume" defaultValue={50} />);

    expect(screen.getByTestId("slider-fill")).toHaveStyle({ width: "50%" });
    expect(screen.getByTestId("slider-thumb")).toHaveStyle({ left: "50%" });
  });

  it("supports an unlabeled slider with aria-label", () => {
    render(
      <Slider
        aria-label="Volume"
        showValue={false}
        defaultValue={10}
      />,
    );

    expect(screen.getByRole("slider", { name: "Volume" })).toBeInTheDocument();
    expect(screen.queryByText("10%")).not.toBeInTheDocument();
  });

  it("applies disabled styling without a filled track", () => {
    render(<Slider label="Volume" defaultValue={50} disabled />);

    expect(screen.getByRole("slider", { name: "Volume" })).toBeDisabled();
    expect(screen.queryByTestId("slider-fill")).not.toBeInTheDocument();
    expect(screen.getByTestId("slider-thumb")).toHaveClass("shadow-overlay");
  });

  it("forwards its ref to the native range input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Slider ref={ref} label="Volume" />);

    expect(ref.current?.type).toBe("range");
  });
});
