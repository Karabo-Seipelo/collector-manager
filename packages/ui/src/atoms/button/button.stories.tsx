import type { Meta, StoryObj } from "@storybook/react-vite";

import { FeatherIcon } from "../icon/icon";
import { Button } from "./button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  args: {
    children: "Button label",
    variant: "primary",
    tone: "brand",
    size: "medium",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ExtraSmall: Story = {
  args: {
    size: "xsmall",
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="xsmall">
        Extra small
      </Button>
      <Button {...args} size="small">
        Small
      </Button>
      <Button {...args} size="medium">
        Medium
      </Button>
      <Button {...args} size="large">
        Large
      </Button>
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const WithIconLeft: Story = {
  args: {
    iconLeft: <FeatherIcon name="plus" />,
    children: "Add item",
  },
};

export const WithIconRight: Story = {
  args: {
    iconRight: <FeatherIcon name="arrow-right" />,
    children: "Continue",
  },
};

export const IconOnly: Story = {
  args: {
    iconOnly: <FeatherIcon name="settings" />,
    children: undefined,
  },
};

export const Destructive: Story = {
  args: {
    tone: "destructive",
    iconLeft: <FeatherIcon name="trash-2" />,
    children: "Delete",
  },
};
