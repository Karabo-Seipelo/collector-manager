import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Stepper } from "./stepper";

const meta = {
  title: "Molecules/Stepper",
  component: Stepper,
  args: {
    label: "Label",
    required: true,
    defaultValue: 1,
  },
  decorators: [
    (Story) => (
      <div className="w-[162px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Numeric field with increment and decrement controls for adjusting a value.",
      },
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("spinbutton", { name: "Label" })).toHaveValue(1);
  },
};

export const WithHint: Story = {
  args: {
    hint: "Hint text",
  },
};

export const Optional: Story = {
  args: {
    required: false,
    optional: true,
  },
};

export const Error: Story = {
  args: {
    error: "Error message",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Increase Label" }));
    await expect(canvas.getByRole("spinbutton", { name: "Label" })).toHaveValue(2);
  },
};

export const AllStates: Story = {
  render: (args) => (
    <div className="flex w-[220px] flex-col gap-8">
      <Stepper {...args} />
      <Stepper {...args} hint="Hint text" />
      <Stepper {...args} error="Error message" />
      <Stepper {...args} disabled />
    </div>
  ),
};
