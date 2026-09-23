import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Autocomplete } from "./autocomplete";

const options = [
  { value: "vinyl", label: "Vinyl records" },
  { value: "cards", label: "Trading cards" },
  { value: "coins", label: "Coins" },
];

describe("Autocomplete", () => {
  it("filters options and selects one value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Autocomplete
        label="Category"
        options={options}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("combobox", { name: "Category" });
    await user.click(input);
    await user.type(input, "card");

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Trading cards" })).toBeVisible();
    expect(
      screen.queryByRole("option", { name: "Vinyl records" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "Trading cards" }));
    expect(input).toHaveValue("Trading cards");
    expect(onValueChange).toHaveBeenCalledWith("cards");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("supports keyboard navigation and selection", async () => {
    const user = userEvent.setup();
    render(<Autocomplete label="Category" options={options} />);

    const input = screen.getByRole("combobox", { name: "Category" });
    await user.click(input);
    await user.keyboard("{ArrowDown}{Enter}");

    expect(input).toHaveValue("Vinyl records");
  });

  it("supports multiple selection and removable tags", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Autocomplete
        label="Category"
        type="multiple"
        options={options}
        defaultValue={["vinyl"]}
        onValueChange={onValueChange}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Remove Vinyl records" }),
    ).toBeVisible();

    const input = screen.getByRole("combobox", { name: "Category" });
    await user.click(input);
    expect(screen.getByRole("option", { name: "Vinyl records" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.click(screen.getByRole("option", { name: "Trading cards" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["vinyl", "cards"]);

    await user.click(
      screen.getByRole("button", { name: "Remove Vinyl records" }),
    );
    expect(onValueChange).toHaveBeenLastCalledWith(["cards"]);
  });

  it("renders error and disabled states accessibly", () => {
    const { rerender } = render(
      <Autocomplete
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

    rerender(
      <Autocomplete label="Category" options={options} disabled />,
    );
    expect(screen.getByRole("combobox", { name: "Category" })).toBeDisabled();
  });
});
