import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Select } from "./select";

const options = (
  <>
    <option value="">Select</option>
    <option value="vinyl">Vinyl records</option>
    <option value="books">Books</option>
  </>
);

describe("Select", () => {
  it("associates the label with the combobox", () => {
    render(
      <Select label="Category" id="item-category">
        {options}
      </Select>,
    );

    const combobox = screen.getByRole("combobox", { name: "Category" });
    expect(combobox).toHaveAttribute("id", "item-category");
  });

  it("renders the provided options", () => {
    render(<Select label="Category">{options}</Select>);

    expect(
      screen.getByRole("option", { name: "Vinyl records" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Books" })).toBeInTheDocument();
  });

  it("calls onChange when an option is chosen", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select label="Category" onChange={onChange}>
        {options}
      </Select>,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Category" }),
      "vinyl",
    );

    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole("combobox", { name: "Category" })).toHaveValue(
      "vinyl",
    );
  });

  it("sets aria-invalid and shows an error alert", () => {
    render(
      <Select label="Category" error="Choose a category.">
        {options}
      </Select>,
    );

    expect(screen.getByRole("combobox", { name: "Category" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Choose a category.");
  });

  it("does not change value when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select label="Category" disabled defaultValue="books" onChange={onChange}>
        {options}
      </Select>,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Category" }),
      "vinyl",
    );

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("combobox", { name: "Category" })).toHaveValue(
      "books",
    );
  });
});
