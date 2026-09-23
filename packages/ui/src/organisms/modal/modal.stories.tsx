import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

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

const meta = {
  title: "Organisms/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onOpenChange: fn(),
  },
  argTypes: {
    open: { control: false },
    defaultOpen: { control: false },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function ModalExample({
  defaultOpen = false,
  size = "small",
  tone = "default",
  dismissible = true,
  withMedia = true,
  withFooter = true,
  destructiveActions = false,
}: {
  defaultOpen?: boolean;
  size?: "small" | "large";
  tone?: "default" | "destructive";
  dismissible?: boolean;
  withMedia?: boolean;
  withFooter?: boolean;
  destructiveActions?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        size={size}
        tone={tone}
        dismissible={dismissible}
      >
        <ModalHeader
          title="Heading"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          icon={
            <FeatherIcon
              name={tone === "destructive" ? "alert-triangle" : "layers"}
              size={24}
            />
          }
        />
        {withMedia ? (
          <ModalMedia>
            <ImagePlaceholder />
          </ModalMedia>
        ) : null}
        <ModalContent>
          <Slot />
          <Slot />
        </ModalContent>
        {withFooter ? (
          <ModalFooter>
            <ButtonGroup aria-label="Actions" layout="responsive">
              {destructiveActions ? (
                <>
                  <Button tone="destructive">Delete</Button>
                  <Button variant="secondary" tone="neutral">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button>Confirm</Button>
                  <Button variant="secondary" tone="neutral">
                    Cancel
                  </Button>
                </>
              )}
            </ButtonGroup>
          </ModalFooter>
        ) : null}
      </Modal>
    </div>
  );
}

export const Default: Story = {
  render: () => <ModalExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Open modal" })).toBeVisible();
  },
};

export const Open: Story = {
  render: () => <ModalExample defaultOpen />,
  play: async () => {
    const dialog = await within(document.body).findByRole("dialog", {
      name: "Heading",
    });
    await expect(dialog).toBeVisible();
  },
};

export const Large: Story = {
  render: () => <ModalExample defaultOpen size="large" />,
};

export const Destructive: Story = {
  render: () => (
    <ModalExample defaultOpen tone="destructive" destructiveActions />
  ),
};

export const NotDismissible: Story = {
  render: () => <ModalExample defaultOpen dismissible={false} />,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <ModalExample defaultOpen />,
};

export const ContentOnly: Story = {
  render: () => (
    <ModalExample defaultOpen withMedia={false} withFooter={false} />
  ),
};
