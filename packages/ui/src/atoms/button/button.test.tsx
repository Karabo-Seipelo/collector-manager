import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Save item</Button>);
    expect(
      screen.getByRole("button", { name: "Save item" }),
    ).toBeInTheDocument();
  });

  it("disables interaction when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Save item
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Save item" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders iconOnly without label text", () => {
    render(
      <Button iconOnly={<span data-testid="icon" />} aria-label="Settings" />,
    );
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("forwards ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Save</Button>);
    expect(ref.current?.tagName).toBe("BUTTON");
  });

  it("applies fullWidth class", () => {
    render(<Button fullWidth>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toHaveClass("w-full");
  });

  it.each([
    ["small", "h-8", "px-3", "text-tiny", "rounded-lg"],
    ["medium", "h-12", "px-4", "text-small", "rounded-lg"],
    ["large", "h-14", "px-6", "text-heading-4", "rounded-xl"],
  ] as const)(
    "matches the Figma %s size",
    (size, height, padding, text, radius) => {
      render(<Button size={size}>Save</Button>);

      expect(screen.getByRole("button", { name: "Save" })).toHaveClass(
        height,
        padding,
        radius,
      );
      expect(screen.getByText("Save")).toHaveClass(text);
    },
  );

  it("keeps the tone foreground when label typography is applied", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toHaveClass(
      "text-white",
    );
  });

  it("renders tertiary buttons as underlined text actions", () => {
    render(<Button variant="tertiary">Learn more</Button>);

    const button = screen.getByRole("button", { name: "Learn more" });
    expect(button).toHaveClass("shadow-none");
    expect(button.querySelector("span")).toHaveClass("underline");
  });

  it("uses the disabled fill token instead of fading the live colour", () => {
    render(<Button disabled>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toHaveClass(
      "disabled:bg-fill-disabled",
    );
    expect(screen.getByRole("button", { name: "Save" })).not.toHaveClass(
      "disabled:opacity-40",
    );
  });
});
