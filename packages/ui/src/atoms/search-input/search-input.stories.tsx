import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { withWidth } from "../../../.storybook/decorators";
import { SearchInput } from "./search-input";

const fieldWidth = withWidth("364px");

const meta = {
  title: "Atoms/SearchInput",
  component: SearchInput,
  decorators: [fieldWidth],
  args: {
    placeholder: "Search",
    "aria-label": "Search",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "button"],
    },
    size: {
      control: "select",
      options: ["medium", "small"],
    },
    state: {
      control: "select",
      options: ["default", "hover", "press", "focus"],
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Search field with leading icon, optional clear control, and an optional submit button variant.",
      },
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("searchbox", { name: "Search" })).toBeVisible();
  },
};

export const Filled: Story = {
  args: {
    defaultValue: "Filled",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Clear search" })).toBeVisible();
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Button: Story = {
  args: {
    variant: "button",
    defaultValue: "Filled",
  },
};

export const ButtonSmall: Story = {
  args: {
    variant: "button",
    size: "small",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Filled",
  },
};

export const Focus: Story = {
  args: {
    state: "focus",
  },
};

export const ButtonFocus: Story = {
  args: {
    variant: "button",
    state: "focus",
    defaultValue: "Filled",
  },
};

export const InteractiveClear: Story = {
  args: {
    defaultValue: "Kind of Blue",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Clear search" }));
    await expect(canvas.getByRole("searchbox", { name: "Search" })).toHaveValue("");
  },
};
