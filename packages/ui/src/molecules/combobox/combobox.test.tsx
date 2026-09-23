import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Combobox } from "./combobox";

const options = [
  { value: "vinyl", label: "Vinyl records" },
  { value: "cards", label: "Trading cards" },
  { value: "coins", label: "Coins" },
];

describe("Combobox", () => {
  it("filters a closed option list as the user types and selects one value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox
        label="Category"
        options={options}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("combobox", { name: "Category" });
    expect(screen.getByText("Start typing to filter results")).toBeVisible();
    expect(screen.queryByLabelText("Search")).not.toBeInTheDocument();

    await user.click(input);
    expect(screen.getByRole("listbox")).toBeVisible();
    expect(screen.getAllByRole("option")).toHaveLength(3);

    await user.type(input, "card");
    expect(screen.getByRole("option", { name: "Trading cards" })).toBeVisible();
    expect(
      screen.queryByRole("option", { name: "Vinyl records" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "Trading cards" }));
    expect(input).toHaveValue("Trading cards");
    expect(onValueChange).toHaveBeenCalledWith("cards");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear selection" })).toBeVisible();
  });

  it("toggles the option list from the chevron like a select", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Category" options={options} />);

    await user.click(screen.getByRole("button", { name: "Toggle options" }));
    expect(screen.getByRole("listbox")).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Toggle options" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("supports multiple selection with removable tags and checkbox options", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox
        label="Category"
        type="multiple"
        options={options}
        defaultValue={["vinyl"]}
        defaultOpen
        onValueChange={onValueChange}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Remove Vinyl records" }),
    ).toBeVisible();
    expect(screen.getByRole("option", { name: "Vinyl records" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByTestId("option-checkbox-vinyl")).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "Trading cards" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["vinyl", "cards"]);
  });

  it("renders error and disabled states accessibly", () => {
    const { rerender } = render(
      <Combobox
        label="Category"
        options={options}
        error="Choose a category."
      />,
    );

    expect(screen.getByRole("combobox", { name: "Category" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Choose a category.");

    rerender(<Combobox label="Category" options={options} disabled />);
    expect(screen.getByRole("combobox", { name: "Category" })).toBeDisabled();
  });
});
