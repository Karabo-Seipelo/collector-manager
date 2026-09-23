import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Slider } from "./slider";

const meta = {
  title: "Atoms/Slider",
  component: Slider,
  args: {
    label: "Label",
    defaultValue: 0,
  },
  decorators: [
    (Story) => (
      <div className="w-[364px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Range input for selecting a value along a track, with optional label and value readout.",
      },
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("slider", { name: "Label" })).toHaveValue("0");
    await expect(canvas.getByText("0%")).toBeVisible();
  },
};

export const Percent25: Story = {
  args: {
    defaultValue: 25,
  },
};

export const Percent50: Story = {
  args: {
    defaultValue: 50,
  },
};

export const Percent75: Story = {
  args: {
    defaultValue: 75,
  },
};

export const Percent100: Story = {
  args: {
    defaultValue: 100,
  },
};

export const NoLabel: Story = {
  args: {
    label: undefined,
    showValue: false,
    "aria-label": "Volume",
    defaultValue: 25,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 50,
    disabled: true,
  },
};

export const AllPercentages: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      {[0, 25, 50, 75, 100].map((defaultValue) => (
        <Slider key={defaultValue} {...args} defaultValue={defaultValue} />
      ))}
    </div>
  ),
};
