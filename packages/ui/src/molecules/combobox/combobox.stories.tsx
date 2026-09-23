import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";

import { Combobox } from "./combobox";

const options = [
  { value: "vinyl", label: "Vinyl records" },
  { value: "cards", label: "Trading cards" },
  { value: "coins", label: "Coins" },
  { value: "stamps", label: "Stamps" },
  { value: "comics", label: "Comic books" },
];

const meta = {
  title: "Molecules/Combobox",
  component: Combobox,
  args: {
    label: "Category",
    options,
    required: true,
    onValueChange: fn(),
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="min-h-[430px] w-[364px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
    state: {
      control: "select",
      options: ["default", "hover", "press", "focus"],
    },
    value: { control: false },
    defaultValue: { control: false },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Category" });
    await expect(input).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Toggle options" }),
    ).toBeVisible();
  },
};

export const Open: Story = {
  args: {
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole("listbox")).toBeVisible();
  },
};

export const Filled: Story = {
  args: {
    defaultValue: "vinyl",
  },
};

export const Multiple: Story = {
  args: {
    type: "multiple",
    defaultValue: ["cards", "coins"],
    defaultOpen: true,
    onValueChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByRole("option", { name: "Trading cards" }),
    ).toHaveAttribute("aria-selected", "true");
  },
};

export const Error: Story = {
  args: {
    error: "Choose a category.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Optional: Story = {
  args: {
    required: false,
    optional: true,
  },
};
