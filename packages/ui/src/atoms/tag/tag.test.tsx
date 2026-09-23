import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Tag } from "./tag";

describe("Tag", () => {
  it("renders the label", () => {
    render(<Tag>Vinyl</Tag>);
    expect(screen.getByRole("button", { name: "Vinyl" })).toBeInTheDocument();
  });

  it("marks the unselected tag as not pressed", () => {
    render(<Tag>Books</Tag>);
    expect(screen.getByRole("button", { name: "Books" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("marks the selected tag as pressed", () => {
    render(<Tag selected>All</Tag>);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("calls onClick when activated", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Tag onClick={onClick}>Cards</Tag>);
    await user.click(screen.getByRole("button", { name: "Cards" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Tag disabled onClick={onClick}>
        Watches
      </Tag>,
    );
    await user.click(screen.getByRole("button", { name: "Watches" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders a leading icon", () => {
    render(<Tag icon={<span data-testid="check" />}>All</Tag>);
    expect(screen.getByTestId("check")).toBeInTheDocument();
  });

  it("forwards ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Tag ref={ref}>Cameras</Tag>);
    expect(ref.current?.tagName).toBe("BUTTON");
  });
});
