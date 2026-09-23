import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Radio } from "./radio";

describe("Radio", () => {
  it("associates its label and renders unchecked by default", () => {
    render(<Radio label="Vinyl" name="format" value="vinyl" />);

    const radio = screen.getByRole("radio", { name: "Vinyl" });
    expect(radio).toHaveAttribute("name", "format");
    expect(radio).toHaveAttribute("value", "vinyl");
    expect(radio).not.toBeChecked();
  });

  it("defaults to the small Figma size and supports large", () => {
    const { rerender } = render(<Radio label="Vinyl" name="format" />);

    expect(screen.getByTestId("radio-control")).toHaveClass(
      "size-6",
      "border-stroke-strong",
      "bg-fill-inverse",
    );
    expect(screen.getByText("Vinyl")).toHaveClass("text-tiny");

    rerender(<Radio label="Vinyl" name="format" size="large" />);
    expect(screen.getByTestId("radio-control")).toHaveClass("size-8");
    expect(screen.getByText("Vinyl")).toHaveClass("text-small");
  });

  it("selects and emits change when activated", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Radio label="Vinyl" name="format" onChange={onChange} />);

    await user.click(screen.getByText("Vinyl"));

    expect(screen.getByRole("radio", { name: "Vinyl" })).toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("uses invalid and disabled Figma tokens", () => {
    const { rerender } = render(
      <Radio label="Vinyl" name="format" invalid />,
    );

    expect(screen.getByRole("radio", { name: "Vinyl" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByTestId("radio-control")).toHaveClass(
      "border-2",
      "border-stroke-error-strong",
      "bg-fill-error-weak",
    );

    rerender(<Radio label="Vinyl" name="format" disabled />);
    expect(screen.getByText("Vinyl")).toHaveClass("text-text-disabled");
    expect(screen.getByTestId("radio-control")).toHaveClass(
      "border-stroke-disabled",
    );
  });

  it("forwards its ref to the native radio input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Radio ref={ref} label="Vinyl" name="format" />);

    expect(ref.current?.type).toBe("radio");
  });
});
