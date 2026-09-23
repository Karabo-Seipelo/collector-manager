import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { ButtonGroup } from "./button-group";

const meta = {
  title: "Molecules/ButtonGroup",
  component: ButtonGroup,
  args: {
    layout: "horizontal",
    order: "default",
    size: "medium",
    tone: "brand",
    "aria-label": "Actions",
    children: null,
  },
  argTypes: {
    layout: { control: "select", options: ["horizontal", "vertical"] },
    order: { control: "select", options: ["default", "reverse"] },
    size: { control: "select", options: ["small", "medium", "large"] },
    tone: {
      control: "select",
      options: ["brand", "neutral", "destructive", "inverse"],
    },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A group of three Buttons — primary, secondary, tertiary — placed horizontally for large screens or stacked vertically for mobile.",
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function Actions(args: React.ComponentProps<typeof ButtonGroup>) {
  return (
    <ButtonGroup {...args}>
      <Button>Save</Button>
      <Button>Cancel</Button>
      <Button>Skip</Button>
    </ButtonGroup>
  );
}

export const Default: Story = {
  render: (args) => <Actions {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");
    await expect(buttons[0]).toHaveAccessibleName("Save");
    await userEvent.click(buttons[0]!);
  },
};

export const Vertical: Story = {
  args: {
    layout: "vertical",
  },
  render: (args) => <Actions {...args} />,
};

export const Reverse: Story = {
  args: {
    order: "reverse",
  },
  render: (args) => <Actions {...args} />,
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      <Actions {...args} size="small" />
      <Actions {...args} size="medium" />
      <Actions {...args} size="large" />
    </div>
  ),
};

export const Inverse: Story = {
  args: {
    tone: "inverse",
  },
  render: (args) => (
    <div className="w-fit rounded-xl bg-[#111119] p-6">
      <Actions {...args} />
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button iconLeft={<FeatherIcon name="check" />}>Save</Button>
      <Button>Cancel</Button>
      <Button iconRight={<FeatherIcon name="arrow-right" />}>Skip</Button>
    </ButtonGroup>
  ),
};
