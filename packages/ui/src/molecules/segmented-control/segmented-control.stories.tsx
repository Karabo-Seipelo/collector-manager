import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { FeatherIcon } from "../../atoms/icon/icon";
import { SegmentedControl } from "./segmented-control";

const textOptions = Array.from({ length: 5 }, (_, index) => ({
  value: `option-${index + 1}`,
  label: "Label",
}));

const iconOptions = Array.from({ length: 5 }, (_, index) => ({
  value: `option-${index + 1}`,
  label: "Label",
  icon: <FeatherIcon name="box" size={20} />,
}));

const meta = {
  title: "Molecules/SegmentedControl",
  component: SegmentedControl,
  args: {
    "aria-label": "View mode",
    options: textOptions,
    defaultValue: "option-1",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["medium", "small"],
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Single-select segmented control for switching between related views or modes.",
      },
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextMedium: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("radiogroup", { name: "View mode" })).toBeVisible();
  },
};

export const TextSmall: Story = {
  args: {
    size: "small",
    options: textOptions.slice(0, 4),
  },
};

export const IconsMedium: Story = {
  args: {
    options: iconOptions,
  },
};

export const IconsSmall: Story = {
  args: {
    size: "small",
    options: iconOptions.slice(0, 4).map((option) => ({
      ...option,
      icon: <FeatherIcon name="box" size={16} />,
    })),
  },
};

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByRole("radio", { name: "Label" })[1]!);
    await expect(canvas.getAllByRole("radio", { name: "Label" })[1]).toBeChecked();
  },
};
