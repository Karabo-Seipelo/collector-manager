import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TextField } from "./text-field";

describe("TextField", () => {
  it("associates label with input via htmlFor", () => {
    render(<TextField label="Item name" id="item-name" />);

    const input = screen.getByLabelText("Item name");
    expect(input).toHaveAttribute("id", "item-name");
  });

  it("sets aria-invalid and shows error alert when error is provided", () => {
    render(
      <TextField
        label="Item name"
        defaultValue="Blue Train"
        error="An item with this name already exists."
      />,
    );

    const input = screen.getByLabelText("Item name");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "An item with this name already exists.",
    );
    expect(screen.getByRole("alert").querySelector("svg")).toHaveAttribute(
      "width",
      "24",
    );
  });

  it("uses disabled styling instead of error styling when disabled with an error", () => {
    render(
      <TextField
        label="Item name"
        disabled
        error="An item with this name already exists."
      />,
    );

    const input = screen.getByLabelText("Item name");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(input.parentElement).toHaveClass(
      "border-stroke-disabled",
      "bg-fill-inverse",
    );
    expect(input.parentElement).not.toHaveClass(
      "border-stroke-error-strong",
      "bg-fill-error-weak",
    );
  });

  it("updates value in uncontrolled mode", async () => {
    const user = userEvent.setup();
    render(<TextField label="Item name" defaultValue="" />);

    const input = screen.getByLabelText("Item name");
    await user.type(input, "Kind of Blue");

    expect(input).toHaveValue("Kind of Blue");
  });

  it("calls onChange in controlled mode without mutating value prop", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TextField label="Item name" value="Abbey Road" onChange={onChange} />,
    );

    const input = screen.getByLabelText("Item name");
    await user.type(input, "X");

    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue("Abbey Road");
  });

  it("clears value and fires onChange when clear button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TextField
        label="Search"
        defaultValue="Kind of Blue"
        clearable
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(screen.getByLabelText("Search")).toHaveValue("");
    expect(onChange).toHaveBeenCalled();
  });
});
