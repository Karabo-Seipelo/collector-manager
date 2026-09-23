import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AvatarDropdown } from "./avatar-dropdown";

describe("AvatarDropdown", () => {
  it("renders a button named after the person", () => {
    render(<AvatarDropdown name="John Smith" />);

    expect(
      screen.getByRole("button", { name: "John Smith" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the trigger as expanded when open", () => {
    render(<AvatarDropdown name="John Smith" open />);

    expect(screen.getByRole("button", { name: "John Smith" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("calls onClick when activated", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<AvatarDropdown name="John Smith" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "John Smith" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<AvatarDropdown name="John Smith" disabled onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "John Smith" }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
