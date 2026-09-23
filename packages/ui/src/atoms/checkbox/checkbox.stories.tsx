import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Checkbox } from "./checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  args: {
    label: "Mint",
    size: "small",
    indeterminate: false,
    invalid: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "large"],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name: "Mint" });
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const ConditionList: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox label="Mint" defaultChecked />
      <Checkbox label="Near mint" defaultChecked />
      <Checkbox label="Very good" />
      <Checkbox label="Good" />
    </div>
  ),
};

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Checkbox {...args} label="Unselected" />
      <Checkbox {...args} label="Selected" defaultChecked />
      <Checkbox {...args} label="Indeterminate" indeterminate />
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Checkbox {...args} label="Small" size="small" defaultChecked />
      <Checkbox {...args} label="Large" size="large" defaultChecked />
    </div>
  ),
};

export const InvalidTypes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Checkbox {...args} label="Unselected" invalid />
      <Checkbox {...args} label="Selected" invalid defaultChecked />
      <Checkbox {...args} label="Indeterminate" invalid indeterminate />
    </div>
  ),
};
