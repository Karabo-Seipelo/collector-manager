import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Calendar } from "./calendar";

describe("Calendar", () => {
  const baseProps = {
    id: "calendar-test",
    viewMonth: new Date(2024, 4, 1, 12),
    focusedDate: new Date(2024, 4, 15, 12),
    selectedDate: new Date(2024, 4, 15, 12),
    today: new Date(2024, 4, 10, 12),
    onSelectDate: vi.fn(),
    onFocusedDateChange: vi.fn(),
    onViewMonthChange: vi.fn(),
    onClose: vi.fn(),
  };

  it("renders the month grid with selected and today markers", () => {
    render(<Calendar {...baseProps} />);

    expect(screen.getByRole("dialog", { name: "Choose date" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "May 2024" })).toBeVisible();
    expect(screen.getByRole("button", { name: "15 May 2024" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "10 May 2024" })).toHaveAttribute(
      "aria-current",
      "date",
    );
  });

  it("navigates months and selects a date", async () => {
    const user = userEvent.setup();
    const onSelectDate = vi.fn();
    render(<Calendar {...baseProps} onSelectDate={onSelectDate} />);

    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(baseProps.onViewMonthChange).toHaveBeenCalled();
    expect(baseProps.onFocusedDateChange).toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "23 May 2024" }));
    expect(onSelectDate).toHaveBeenCalledWith(new Date(2024, 4, 23, 12));
  });

  it("moves focus with arrow keys and closes on Escape", async () => {
    const user = userEvent.setup();
    const onFocusedDateChange = vi.fn();
    const onClose = vi.fn();
    render(
      <Calendar
        {...baseProps}
        onFocusedDateChange={onFocusedDateChange}
        onClose={onClose}
      />,
    );

    const selected = screen.getByRole("button", { name: "15 May 2024" });
    selected.focus();
    await user.keyboard("{ArrowRight}");
    expect(onFocusedDateChange).toHaveBeenCalledWith(new Date(2024, 4, 16, 12));

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });
});
