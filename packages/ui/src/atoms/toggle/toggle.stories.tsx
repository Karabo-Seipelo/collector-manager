import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Toggle } from "./toggle";

const meta = {
  title: "Atoms/Toggle",
  component: Toggle,
  args: {
    label: "Notifications",
    size: "small",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium"],
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name: "Notifications" });
    await expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
  },
};

export const Selected: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const NoLabel: Story = {
  args: {
    label: undefined,
    "aria-label": "Notifications",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Toggle {...args} label="Unselected" />
      <Toggle {...args} label="Selected" defaultChecked />
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Toggle {...args} label="Small" size="small" defaultChecked />
      <Toggle {...args} label="Medium" size="medium" defaultChecked />
    </div>
  ),
};
