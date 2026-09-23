import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { BadgeDot } from "./badge-dot";

const meta = {
  title: "Atoms/BadgeDot",
  component: BadgeDot,
  args: {
    type: "notification",
    size: "medium",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["online", "busy", "away", "offline", "notification"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Used to indicate notifications or online status. Overlay the notification type on ButtonIcon; use presence types on Avatar later.",
      },
    },
  },
} satisfies Meta<typeof BadgeDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("badge-dot")).toBeVisible();
  },
};

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        {(
          ["online", "busy", "away", "offline", "notification"] as const
        ).map((type) => (
          <BadgeDot {...args} key={type} type={type} />
        ))}
      </div>
      <div className="w-fit rounded-xl bg-[#111119] p-6">
        <div className="flex flex-wrap items-center gap-4">
          {(
            ["online", "busy", "away", "offline", "notification"] as const
          ).map((type) => (
            <BadgeDot {...args} key={type} type={type} />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {
    type: "online",
  },
  render: (args) => (
    <div className="flex flex-wrap items-end gap-4">
      <BadgeDot {...args} size="small" />
      <BadgeDot {...args} size="medium" />
      <BadgeDot {...args} size="large" />
    </div>
  ),
};
