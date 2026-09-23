import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

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
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    tone: {
      control: "select",
      options: ["brand", "neutral", "destructive", "inverse"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    iconLeft: { control: false },
    iconRight: { control: false },
    iconOnly: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Used to trigger actions. The button type indicates the importance of the action. Practical UI provides three types, four tones, and three sizes.",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Button label" });
    await expect(button).toBeEnabled();
    await userEvent.click(button);
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
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

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="tertiary">
        Tertiary
      </Button>
    </div>
  ),
};

export const AllTones: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-6">
        <Button {...args} tone="brand">
          Brand
        </Button>
        <Button {...args} tone="neutral">
          Neutral
        </Button>
        <Button {...args} tone="destructive">
          Destructive
        </Button>
      </div>
      <div className="dark w-fit rounded-xl bg-[#111119] p-6">
        <Button {...args} tone="inverse">
          Inverse
        </Button>
      </div>
    </div>
  ),
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button")).toBeEnabled();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
