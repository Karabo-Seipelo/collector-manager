import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../atoms/button/button";
import { ButtonGroup } from "./button-group";

function renderGroup(
  props?: Partial<React.ComponentProps<typeof ButtonGroup>>,
) {
  return render(
    <ButtonGroup aria-label="Actions" {...props}>
      <Button>Save</Button>
      <Button>Cancel</Button>
      <Button>Skip</Button>
    </ButtonGroup>,
  );
}

describe("ButtonGroup", () => {
  it("renders three action buttons as primary, secondary, and tertiary", () => {
    renderGroup();

    const group = screen.getByRole("group", { name: "Actions" });
    const [save, cancel, skip] = screen.getAllByRole("button");

    expect(group).toHaveClass("gap-4");
    expect(save).toHaveAccessibleName("Save");
    expect(save).toHaveClass("bg-primary");
    expect(cancel).toHaveClass("border-primary/80");
    expect(skip!.querySelector("span")).toHaveClass("underline");
  });

  it("reverses visual and tab order without changing roles", () => {
    renderGroup({ order: "reverse" });

    const [skip, cancel, save] = screen.getAllByRole("button");

    expect(skip).toHaveAccessibleName("Skip");
    expect(skip!.querySelector("span")).toHaveClass("underline");
    expect(cancel).toHaveAccessibleName("Cancel");
    expect(save).toHaveAccessibleName("Save");
    expect(save).toHaveClass("bg-primary");
  });

  it("stacks full-width buttons when vertical", () => {
    renderGroup({ layout: "vertical" });

    expect(screen.getByRole("group", { name: "Actions" })).toHaveClass(
      "flex-col",
      "w-[364px]",
    );
    for (const button of screen.getAllByRole("button")) {
      expect(button).toHaveClass("w-full");
    }
  });

  it("supports responsive layout classes for drawer footers", () => {
    renderGroup({ layout: "responsive" });

    expect(screen.getByRole("group", { name: "Actions" })).toHaveClass(
      "flex-col",
      "md:flex-row",
      "w-full",
      "md:w-auto",
    );
  });

  it("passes size through to each button", () => {
    renderGroup({ size: "small" });

    expect(screen.getByRole("button", { name: "Save" })).toHaveClass("h-8");
  });

  it("lets each button keep its own click handler", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    render(
      <ButtonGroup>
        <Button onClick={onSave}>Save</Button>
        <Button>Cancel</Button>
        <Button>Skip</Button>
      </ButtonGroup>,
    );

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onSave).toHaveBeenCalledTimes(1);
  });
});
