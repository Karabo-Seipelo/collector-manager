import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Divider } from "./divider";

const meta = {
  title: "Atoms/Divider",
  component: Divider,
  args: {
    type: "weak",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["weak", "strong"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A thin line used to separate or group related content, matching Practical UI Divider.",
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("separator")).toBeVisible();
  },
};

export const Strong: Story = {
  args: {
    type: "strong",
  },
};

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex w-full max-w-[600px] flex-col gap-12 rounded-xl bg-white p-6">
      <Divider {...args} type="weak" />
      <Divider {...args} type="strong" />
    </div>
  ),
};
