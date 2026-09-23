import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { ImagePlaceholder } from "../../atoms/image-placeholder/image-placeholder";
import { Slot } from "../../atoms/slot/slot";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalMedia,
} from "./modal";

function renderModal(
  props?: Partial<React.ComponentProps<typeof Modal>>,
  headerProps?: Partial<React.ComponentProps<typeof ModalHeader>>,
) {
  const onOpenChange = vi.fn();
  render(
    <Modal open onOpenChange={onOpenChange} dismissible {...props}>
      <ModalHeader
        title="Heading"
        description="Description"
        icon={<FeatherIcon name="layers" size={24} />}
        {...headerProps}
      />
      <ModalMedia>
        <ImagePlaceholder />
      </ModalMedia>
      <ModalContent>
        <Slot />
      </ModalContent>
      <ModalFooter>
        <ButtonGroup aria-label="Actions" layout="responsive">
          <Button>Confirm</Button>
          <Button variant="secondary" tone="neutral">
            Cancel
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Modal>,
  );
  return { onOpenChange };
}

describe("Modal", () => {
  it("does not render when closed", () => {
    render(
      <Modal open={false}>
        <ModalHeader title="Heading" />
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders an open dialog with header, media, content, and footer", async () => {
    renderModal();
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    expect(
      screen.getByRole("dialog", { name: "Heading", description: "Description" }),
    ).toBeVisible();
    expect(screen.getByText("Description")).toBeVisible();
    expect(screen.getByRole("group", { name: "Actions" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
  });

  it("omits the close button when not dismissible", () => {
    renderModal({ dismissible: false });

    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("closes from the close button, overlay click, and Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Modal open dismissible onOpenChange={onOpenChange}>
        <ModalHeader title="Heading" />
        <ModalContent>Body</ModalContent>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();
    await user.click(screen.getByTestId("modal-overlay"));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("applies enter animation classes when open", async () => {
    renderModal();
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    expect(screen.getByTestId("modal-panel")).toHaveClass(
      "translate-y-0",
      "opacity-100",
      "md:scale-100",
    );
    expect(screen.getByTestId("modal-overlay")).toHaveClass("opacity-100");
  });

  it("applies small and large desktop panel widths", () => {
    const { rerender } = render(
      <Modal open size="small">
        <ModalHeader title="Heading" />
      </Modal>,
    );

    expect(screen.getByTestId("modal-panel")).toHaveClass("md:w-[500px]");

    rerender(
      <Modal open size="large">
        <ModalHeader title="Heading" />
      </Modal>,
    );

    expect(screen.getByTestId("modal-panel")).toHaveClass("md:w-[700px]");
  });

  it("applies mobile bottom-sheet overlay classes", () => {
    renderModal();

    expect(screen.getByTestId("modal-overlay")).toHaveClass(
      "items-end",
      "justify-center",
    );
    expect(screen.getByTestId("modal-panel")).toHaveClass("w-full");
  });

  it("uses destructive icon tone when tone is destructive", () => {
    renderModal({ tone: "destructive" });

    expect(
      screen.getByRole("dialog").querySelector(".bg-fill-error-weak"),
    ).toBeInTheDocument();
  });

  it("omits aria-describedby when no description is provided", () => {
    renderModal({}, { description: undefined });

    expect(screen.getByRole("dialog", { name: "Heading" })).not.toHaveAttribute(
      "aria-describedby",
    );
  });

  it("uses responsive footer button layout", () => {
    renderModal();

    expect(screen.getByRole("group", { name: "Actions" })).toHaveClass(
      "flex-col",
      "md:flex-row",
    );
  });

  it("keeps the modal mounted briefly while animating out", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [open, setOpen] = React.useState(true);
      return (
        <Modal open={open} onOpenChange={setOpen} dismissible>
          <ModalHeader title="Heading" />
        </Modal>
      );
    }

    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.getByRole("dialog", { name: "Heading" })).toBeInTheDocument();
    expect(screen.getByTestId("modal-panel")).toHaveClass("opacity-0");

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
          <Modal open={open} onOpenChange={setOpen} dismissible>
            <ModalHeader title="Heading" />
          </Modal>
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
