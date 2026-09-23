import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Button } from "../button/button";
import { Slot } from "./slot";

const meta = {
  title: "Atoms/Slot",
  component: Slot,
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
          "Placeholder for swappable content areas in layouts such as Card and Drawer.",
      },
    },
  },
} satisfies Meta<typeof Slot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Swap with another component"),
    ).toBeVisible();
  },
};

export const CustomLabel: Story = {
  args: {
    label: "Footer actions",
  },
};

export const WithChildren: Story = {
  render: (args) => (
    <Slot {...args}>
      <Button>Save changes</Button>
    </Slot>
  ),
};
