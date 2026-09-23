import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";

import { DatePicker } from "./date-picker";

const meta = {
  title: "Organisms/DatePicker",
  component: DatePicker,
  args: {
    label: "Date",
    required: true,
    initialMonth: new Date(2024, 4, 1, 12),
    onValueChange: fn(),
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="min-h-[520px] w-[364px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover", "press", "focus"],
    },
    value: { control: false },
    initialMonth: { control: false },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Date")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Choose date" }),
    ).toHaveAttribute("aria-expanded", "false");
  },
};

export const Open: Story = {
  args: {
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole("dialog")).toBeVisible();
    await expect(
      canvas.getByRole("grid", { name: "May 2024" }),
    ).toBeVisible();
  },
};

export const Filled: Story = {
  args: {
    defaultValue: "23/05/2024",
    defaultOpen: true,
  },
};

export const Error: Story = {
  args: {
    defaultValue: "31/02/2024",
    error: "Enter a valid date.",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "23/05/2024",
    disabled: true,
  },
};

export const Optional: Story = {
  args: {
    required: false,
    optional: true,
  },
};
