import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Radio } from "./radio";

const meta = {
  title: "Atoms/Radio",
  component: Radio,
  args: {
    label: "Vinyl",
    name: "format",
    value: "vinyl",
    size: "small",
    invalid: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "large"],
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name: "Vinyl" });
    await expect(radio).not.toBeChecked();
    await userEvent.click(radio);
    await expect(radio).toBeChecked();
  },
};

export const Selected: Story = {
  args: {
    defaultChecked: true,
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

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Radio {...args} label="Unselected" value="unselected" />
      <Radio {...args} label="Selected" value="selected" defaultChecked />
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Radio
        {...args}
        label="Small"
        name="small-size"
        size="small"
        defaultChecked
      />
      <Radio
        {...args}
        label="Large"
        name="large-size"
        size="large"
        defaultChecked
      />
    </div>
  ),
};

export const InvalidTypes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Radio {...args} label="Unselected" invalid />
      <Radio
        {...args}
        label="Selected"
        name="invalid-selected"
        invalid
        defaultChecked
      />
    </div>
  ),
};
