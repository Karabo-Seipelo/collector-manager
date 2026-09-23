import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { Button } from "../../atoms/button/button";
import { Slot } from "../../atoms/slot/slot";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "./drawer";

const meta = {
  title: "Organisms/Drawer",
  component: Drawer,
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

function DrawerExample({
  defaultOpen = false,
  side = "right",
  size = "small",
  withFooter = true,
}: {
  defaultOpen?: boolean;
  side?: "left" | "right";
  size?: "small" | "large";
  withFooter?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        side={side}
        size={size}
      >
        <DrawerHeader title="Heading" />
        <DrawerContent>
          <Slot />
          <Slot />
        </DrawerContent>
        {withFooter ? (
          <DrawerFooter>
            <ButtonGroup aria-label="Actions" layout="responsive">
              <Button>Save</Button>
              <Button>Cancel</Button>
              <Button>Skip</Button>
            </ButtonGroup>
          </DrawerFooter>
        ) : null}
      </Drawer>
    </div>
  );
}

export const Default: Story = {
  render: () => <DrawerExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Open drawer" })).toBeVisible();
  },
};

export const Open: Story = {
  render: () => <DrawerExample defaultOpen />,
  play: async () => {
    const dialog = await within(document.body).findByRole("dialog", {
      name: "Heading",
    });
    await expect(dialog).toBeVisible();
  },
};

export const Large: Story = {
  render: () => <DrawerExample defaultOpen size="large" />,
};

export const Left: Story = {
  render: () => <DrawerExample defaultOpen side="left" />,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <DrawerExample defaultOpen />,
};

export const ContentOnly: Story = {
  render: () => <DrawerExample defaultOpen withFooter={false} />,
};
