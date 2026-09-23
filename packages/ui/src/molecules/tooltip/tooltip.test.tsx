import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../atoms/button/button";
import {
  Tooltip,
  TooltipBubble,
  TooltipContent,
  TooltipTrigger,
} from "./tooltip";

describe("TooltipBubble", () => {
  it("renders small tooltip copy", () => {
    render(<TooltipBubble>Lorem ipsum dolor</TooltipBubble>);

    expect(screen.getByText("Lorem ipsum dolor")).toHaveClass(
      "text-text-inverse-strong",
      "whitespace-nowrap",
    );
  });

  it("renders large tooltip with heading and body", () => {
    render(
      <TooltipBubble
        size="large"
        heading="Lorem ipsum dolor"
        placement="bottom-left"
      >
        Supporting description text
      </TooltipBubble>,
    );

    expect(screen.getByText("Lorem ipsum dolor")).toHaveClass("font-semibold");
    expect(screen.getByText("Supporting description text")).toHaveClass(
      "text-text-inverse-weak",
    );
  });
});

describe("Tooltip", () => {
  it("shows content on hover and hides on mouse leave", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip>
        <TooltipTrigger>
          <Button type="button">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Lorem ipsum dolor</TooltipContent>
      </Tooltip>,
    );

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await user.hover(screen.getByRole("button", { name: "Hover me" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Lorem ipsum dolor");

    await user.unhover(screen.getByRole("button", { name: "Hover me" }));
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("supports controlled open state", () => {
    render(
      <Tooltip open>
        <TooltipTrigger>
          <button type="button">Trigger</button>
        </TooltipTrigger>
        <TooltipContent>Visible tooltip</TooltipContent>
      </Tooltip>,
    );

    expect(screen.getByRole("tooltip")).toBeVisible();
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-describedby",
      expect.stringMatching(/./),
    );
  });

  it("calls onOpenChange when visibility changes", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Tooltip onOpenChange={onOpenChange}>
        <TooltipTrigger>
          <button type="button">Trigger</button>
        </TooltipTrigger>
        <TooltipContent>Tooltip body</TooltipContent>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
