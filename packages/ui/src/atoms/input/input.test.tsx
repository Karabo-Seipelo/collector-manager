import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./input";

describe("Input", () => {
  it("renders a native text input without field chrome", () => {
    render(<Input aria-label="Search" placeholder="Search items" />);

    expect(screen.getByRole("textbox", { name: "Search" })).toHaveAttribute(
      "placeholder",
      "Search items",
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("clears value and fires onChange when clear button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Input
        aria-label="Search"
        defaultValue="Kind of Blue"
        clearable
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(screen.getByRole("textbox", { name: "Search" })).toHaveValue("");
    expect(onChange).toHaveBeenCalled();
  });
});
