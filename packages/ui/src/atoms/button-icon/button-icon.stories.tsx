import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { FeatherIcon } from "../icon/icon";
import { ButtonIcon } from "./button-icon";

const meta = {
  title: "Atoms/ButtonIcon",
  component: ButtonIcon,
  args: {
    icon: <FeatherIcon name="plus" />,
    "aria-label": "Add",
    variant: "primary",
    tone: "brand",
    size: "medium",
    shape: "square",
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
      options: ["small", "medium"],
    },
    shape: {
      control: "select",
      options: ["square", "circle"],
    },
    icon: { control: false },
    badge: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Used to trigger actions when space is limited. Same types and tones as Button, with square or circle shapes and optional notification badges.",
      },
    },
  },
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Add" });
    await expect(button).toBeEnabled();
    await userEvent.click(button);
  },
};

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonIcon {...args} variant="primary" aria-label="Primary" />
      <ButtonIcon {...args} variant="secondary" aria-label="Secondary" />
      <ButtonIcon {...args} variant="tertiary" aria-label="Tertiary" />
    </div>
  ),
};

export const AllTones: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <ButtonIcon {...args} tone="brand" aria-label="Brand" />
        <ButtonIcon {...args} tone="neutral" aria-label="Neutral" />
        <ButtonIcon {...args} tone="destructive" aria-label="Destructive" />
      </div>
      <div className="w-fit rounded-xl bg-[#111119] p-6">
        <ButtonIcon {...args} tone="inverse" aria-label="Inverse" />
      </div>
    </div>
  ),
};

export const AllShapes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonIcon {...args} shape="square" aria-label="Square" />
      <ButtonIcon {...args} shape="circle" aria-label="Circle" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonIcon {...args} size="small" aria-label="Small" />
      <ButtonIcon {...args} size="medium" aria-label="Medium" />
    </div>
  ),
};

export const WithBadges: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <ButtonIcon
        {...args}
        variant="tertiary"
        icon={<FeatherIcon name="bell" />}
        badge="dot"
        aria-label="Notifications"
      />
      <ButtonIcon
        {...args}
        variant="tertiary"
        icon={<FeatherIcon name="shopping-cart" />}
        badge={8}
        aria-label="Cart"
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
