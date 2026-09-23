import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DatePicker } from "./date-picker";

describe("DatePicker", () => {
  it("renders a labelled date field with the Practical UI hint", () => {
    render(<DatePicker label="Date" required />);

    expect(screen.getByRole("textbox", { name: "Date" })).toHaveValue("");
    expect(screen.getByText("(dd/mm/yyyy)")).toBeVisible();
    expect(screen.getByRole("button", { name: "Choose date" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("opens at the selected month and selects a date", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        label="Date"
        defaultValue="15/05/2024"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Choose date" }));

    expect(screen.getByRole("dialog", { name: "Choose date" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "May 2024" })).toBeVisible();
    expect(screen.getByRole("button", { name: "15 May 2024" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByRole("button", { name: "23 May 2024" }));

    expect(screen.getByRole("textbox", { name: "Date" })).toHaveValue(
      "23/05/2024",
    );
    expect(onValueChange).toHaveBeenCalledWith("23/05/2024");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports manual entry and month navigation", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker
        label="Date"
        initialMonth={new Date(2024, 4, 1)}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Date" });
    await user.type(input, "08/09/2023");
    expect(onValueChange).toHaveBeenLastCalledWith("08/09/2023");

    await user.click(screen.getByRole("button", { name: "Choose date" }));
    expect(screen.getByRole("heading", { name: "September 2023" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByRole("heading", { name: "October 2023" })).toBeVisible();
  });

  it("moves day focus with arrow keys and selects with Enter", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        label="Date"
        defaultValue="15/05/2024"
        defaultOpen
      />,
    );

    const selected = screen.getByRole("button", { name: "15 May 2024" });
    selected.focus();
    await user.keyboard("{ArrowRight}{Enter}");

    expect(screen.getByRole("textbox", { name: "Date" })).toHaveValue(
      "16/05/2024",
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders error and disabled states accessibly", () => {
    const { rerender } = render(
      <DatePicker label="Date" error="Enter date" />,
    );

    expect(screen.getByRole("textbox", { name: "Date" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Enter date");

    rerender(<DatePicker label="Date" disabled />);
    expect(screen.getByRole("textbox", { name: "Date" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Choose date" })).toBeDisabled();
  });
});
