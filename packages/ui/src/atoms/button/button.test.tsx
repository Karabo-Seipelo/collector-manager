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
});
