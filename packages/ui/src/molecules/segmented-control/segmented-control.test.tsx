import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FeatherIcon } from "../../atoms/icon/icon";
import { SegmentedControl } from "./segmented-control";

const textOptions = Array.from({ length: 5 }, (_, index) => ({
  value: `option-${index + 1}`,
  label: "Label",
}));

describe("SegmentedControl", () => {
  it("renders options and marks the selected value", () => {
    render(
      <SegmentedControl
        aria-label="View mode"
        options={textOptions}
        defaultValue="option-1"
      />,
    );

    expect(screen.getByRole("radiogroup", { name: "View mode" })).toBeVisible();
    expect(screen.getAllByRole("radio")).toHaveLength(5);
    const selected = screen.getByRole("radio", { name: "Label", checked: true });
    expect(selected).toBeVisible();
    expect(selected).toHaveClass("rounded-lg");
  });

  it("changes selection and calls onValueChange when clicked", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <SegmentedControl
        aria-label="View mode"
        options={textOptions}
        defaultValue="option-1"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getAllByRole("radio", { name: "Label" })[2]!);
    expect(onValueChange).toHaveBeenCalledWith("option-3");
  });

  it("supports icon and label options", () => {
    render(
      <SegmentedControl
        aria-label="View mode"
        options={[
          {
            value: "grid",
            label: "Label",
            icon: <FeatherIcon name="grid" size={20} />,
          },
          {
            value: "list",
            label: "Label",
            icon: <FeatherIcon name="list" size={20} />,
          },
        ]}
        defaultValue="grid"
      />,
    );

    expect(screen.getAllByRole("radio", { name: "Label" })).toHaveLength(2);
  });

  it("moves selection with arrow keys", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <SegmentedControl
        aria-label="View mode"
        options={textOptions}
        defaultValue="option-1"
        onValueChange={onValueChange}
      />,
    );

    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith("option-2");
  });

  it("applies small sizing classes", () => {
    render(
      <SegmentedControl
        aria-label="View mode"
        size="small"
        options={textOptions.slice(0, 3)}
        defaultValue="option-1"
      />,
    );

    expect(screen.getAllByRole("radio")[0]).toHaveClass("h-8");
  });
});
