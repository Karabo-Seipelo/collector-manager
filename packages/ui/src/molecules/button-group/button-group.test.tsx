import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ButtonGroup } from "./button-group";

function renderGroup(props?: {
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  return render(
    <ButtonGroup
      aria-label="View mode"
      defaultValue={props?.defaultValue ?? "grid"}
      onChange={props?.onChange}
    >
      <ButtonGroup.Item value="grid">Grid</ButtonGroup.Item>
      <ButtonGroup.Item value="list">List</ButtonGroup.Item>
      <ButtonGroup.Item value="table" disabled>
        Table
      </ButtonGroup.Item>
    </ButtonGroup>,
  );
}

describe("ButtonGroup", () => {
  it("selects an item on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderGroup({ onChange });

    await user.click(screen.getByRole("radio", { name: "List" }));

    expect(onChange).toHaveBeenCalledWith("list");
    expect(screen.getByRole("radio", { name: "List" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("radio", { name: "Grid" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("renders items with radio semantics", () => {
    renderGroup();

    expect(
      screen.getByRole("radiogroup", { name: "View mode" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.getByRole("radio", { name: "Grid" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("moves selection with arrow keys and skips disabled items", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderGroup({ onChange });

    const grid = screen.getByRole("radio", { name: "Grid" });
    grid.focus();

    await user.keyboard("{ArrowRight}");

    expect(onChange).toHaveBeenCalledWith("list");
    expect(screen.getByRole("radio", { name: "List" })).toHaveAttribute(
      "aria-checked",
      "true",
    );

    await user.keyboard("{ArrowRight}");

    expect(onChange).toHaveBeenLastCalledWith("grid");
    expect(screen.getByRole("radio", { name: "Grid" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("radio", { name: "Table" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });
});
