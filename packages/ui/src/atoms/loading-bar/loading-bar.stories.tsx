import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { LoadingBar } from "./loading-bar";

const meta = {
  title: "Atoms/LoadingBar",
  component: LoadingBar,
  args: {
    value: 0,
    showLabel: true,
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
          "Determinate progress indicator with optional percentage label, matching Practical UI Loading bar.",
      },
    },
  },
} satisfies Meta<typeof LoadingBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Percent0: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
    await expect(canvas.getByText("0%")).toBeVisible();
  },
};

export const Percent25: Story = {
  args: {
    value: 25,
  },
};

export const Percent50: Story = {
  args: {
    value: 50,
  },
};

export const Percent75: Story = {
  args: {
    value: 75,
  },
};

export const Percent100: Story = {
  args: {
    value: 100,
  },
};

export const WithoutLabel: Story = {
  args: {
    value: 25,
    showLabel: false,
  },
};

export const AllStates: Story = {
  render: (args) => (
    <div className="flex w-[364px] flex-col gap-12">
      {[0, 25, 50, 75, 100].map((value) => (
        <LoadingBar key={value} {...args} value={value} />
      ))}
      <LoadingBar {...args} value={25} showLabel={false} />
    </div>
  ),
};
