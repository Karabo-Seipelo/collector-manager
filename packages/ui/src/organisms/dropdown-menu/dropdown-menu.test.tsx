import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import {
  DropdownMenu,
  DropdownMenuAvatarItem,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function Harness({
  align = "bottom-left" as const,
  onOpenChange,
}: {
  align?: React.ComponentProps<typeof DropdownMenu>["align"];
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <DropdownMenu
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          onOpenChange?.(next);
        }}
        align={align}
      >
        <DropdownMenuTrigger>
          <Button
            variant="secondary"
            iconRight={
              <FeatherIcon name={open ? "chevron-up" : "chevron-down"} />
            }
          >
            Label
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent aria-label="Account menu">
          <DropdownMenuAvatarItem
            name="John Smith"
            description="john@practical-ui.com"
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem
            icon={<FeatherIcon name="user" size={24} />}
            onSelect={vi.fn()}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem
            checked={checked}
            onCheckedChange={setChecked}
          >
            Notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            icon={<FeatherIcon name="log-out" size={24} />}
            onSelect={vi.fn()}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <button type="button">Outside</button>
    </>
  );
}

describe("DropdownMenu", () => {
  it("does not render the menu when closed", () => {
    render(<Harness />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens the menu from the trigger", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole("button", { name: "Label" }));
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    expect(screen.getByRole("menu", { name: "Account menu" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Label" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("closes on outside click and Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Harness onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole("button", { name: "Label" }));
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);

    await user.click(screen.getByRole("button", { name: "Label" }));
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("selects a menu item and closes the menu", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Harness onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole("button", { name: "Label" }));
    await user.click(screen.getByRole("menuitem", { name: "Profile" }));

    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("keeps the menu open when toggling a checkbox item", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole("button", { name: "Label" }));
    await user.click(
      screen.getByRole("menuitemcheckbox", { name: "Notifications" }),
    );

    expect(screen.getByRole("menu")).toBeVisible();
    expect(
      screen.getByRole("menuitemcheckbox", { name: "Notifications" }),
    ).toBeChecked();
  });

  it("applies alignment classes to the menu", async () => {
    const user = userEvent.setup();
    render(<Harness align="top-right" />);

    await user.click(screen.getByRole("button", { name: "Label" }));
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    expect(screen.getByRole("menu")).toHaveClass("bottom-[calc(100%+8px)]");
    expect(screen.getByRole("menu")).toHaveClass("right-0");
  });

  it("renders labels, avatar header, and separators", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>
          <Button>Label</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Section</DropdownMenuLabel>
          <DropdownMenuAvatarItem name="Jane Doe" />
          <DropdownMenuSeparator />
          <DropdownMenuItem>Action</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await waitFor(() => {
      expect(screen.getByText("Section")).toBeVisible();
    });
    expect(screen.getByText("Jane Doe")).toBeVisible();
    expect(screen.getByRole("menu").querySelector("hr")).toBeInTheDocument();
  });
});
