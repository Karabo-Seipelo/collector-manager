import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../atoms/button/button";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "./drawer";

function renderDrawer(
  props?: Partial<React.ComponentProps<typeof Drawer>>,
) {
  const onOpenChange = vi.fn();
  render(
    <Drawer open onOpenChange={onOpenChange} {...props}>
      <DrawerHeader title="Heading" />
      <DrawerContent>
        <p>Drawer body</p>
      </DrawerContent>
      <DrawerFooter>
        <ButtonGroup aria-label="Actions" layout="responsive">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Skip</Button>
        </ButtonGroup>
      </DrawerFooter>
    </Drawer>,
  );
  return { onOpenChange };
}

describe("Drawer", () => {
  it("does not render when closed", () => {
    render(
      <Drawer open={false}>
        <DrawerHeader title="Heading" />
      </Drawer>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders an open dialog with title, content, and close control", async () => {
    renderDrawer();
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    expect(screen.getByRole("dialog", { name: "Heading" })).toBeVisible();
    expect(screen.getByText("Drawer body")).toBeVisible();
    expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
    expect(screen.getByRole("group", { name: "Actions" })).toBeVisible();
  });

  it("closes from the close button, overlay click, and Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Drawer open onOpenChange={onOpenChange}>
        <DrawerHeader title="Heading" />
        <DrawerContent>Body</DrawerContent>
      </Drawer>,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();
    await user.click(screen.getByTestId("drawer-overlay"));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("applies slide-in classes when open", async () => {
    renderDrawer();
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    expect(screen.getByTestId("drawer-panel")).toHaveClass(
      "transition-transform",
      "md:translate-x-0",
      "max-md:translate-y-0",
    );
    expect(screen.getByTestId("drawer-overlay")).toHaveClass("opacity-100");
  });

  it("applies right-side desktop panel classes by default", () => {
    renderDrawer();

    expect(screen.getByTestId("drawer-panel")).toHaveClass(
      "md:right-0",
      "md:w-[400px]",
    );
  });

  it("applies left-side and large desktop panel classes", () => {
    renderDrawer({ side: "left", size: "large" });

    expect(screen.getByTestId("drawer-panel")).toHaveClass(
      "md:left-0",
      "md:w-[600px]",
    );
  });

  it("applies mobile bottom-sheet overlay and panel classes", () => {
    renderDrawer();

    expect(screen.getByTestId("drawer-overlay")).toHaveClass(
      "pl-16",
      "justify-end",
    );
    expect(screen.getByTestId("drawer-panel")).toHaveClass(
      "w-full",
      "max-md:max-h-[90vh]",
    );
  });

  it("uses responsive footer button layout", () => {
    renderDrawer();

    expect(screen.getByRole("group", { name: "Actions" })).toHaveClass(
      "flex-col",
      "md:flex-row",
    );
  });

  it("keeps the drawer mounted briefly while sliding out", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [open, setOpen] = React.useState(true);
      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerHeader title="Heading" />
        </Drawer>
      );
    }

    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.getByRole("dialog", { name: "Heading" })).toBeInTheDocument();
    expect(screen.getByTestId("drawer-panel")).toHaveClass("md:translate-x-full");

    await waitFor(
      () => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      },
      { timeout: 500 },
    );
  });

  it("restores focus after closing", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerHeader title="Heading" />
          </Drawer>
        </>
      );
    }

    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.getByRole("button", { name: "Open" })).toHaveFocus();
  });
});
