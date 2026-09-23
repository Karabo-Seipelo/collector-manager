import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";

import { Autocomplete } from "./autocomplete";

const options = [
  { value: "vinyl", label: "Vinyl records" },
  { value: "cards", label: "Trading cards" },
  { value: "coins", label: "Coins" },
  { value: "stamps", label: "Stamps" },
  { value: "comics", label: "Comic books" },
];

const onValueChange = fn();

const meta = {
  title: "Molecules/Autocomplete",
  component: Autocomplete,
  args: {
    label: "Category",
    hint: "Start typing to search",
    options,
    required: true,
    onValueChange,
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
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Category" });
    await expect(input).toBeVisible();
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
    error: "Choose at least one category.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
