import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { BadgeCount } from "./badge-count";

const meta = {
  title: "Atoms/BadgeCount",
  component: BadgeCount,
  args: {
    children: 8,
    emphasis: "strong",
  },
  argTypes: {
    emphasis: {
      control: "select",
      options: ["strong", "moderate", "weak"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Used to show the number of notifications. Overlay it on ButtonIcon; it is not the status Badge pill.",
      },
    },
  },
} satisfies Meta<typeof BadgeCount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("8")).toBeVisible();
  },
};

export const AllEmphasis: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <BadgeCount {...args} emphasis="strong" />
        <BadgeCount {...args} emphasis="moderate" />
        <BadgeCount {...args} emphasis="weak" />
      </div>
      <div className="w-fit rounded-xl bg-[#111119] p-6">
        <div className="flex flex-wrap items-center gap-4">
          <BadgeCount {...args} emphasis="strong" />
          <BadgeCount {...args} emphasis="moderate" />
          <BadgeCount {...args} emphasis="weak" />
        </div>
      </div>
    </div>
  ),
};
