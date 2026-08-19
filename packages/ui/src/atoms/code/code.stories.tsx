import type { Meta, StoryObj } from "@storybook/react-vite";

import { Code } from "./code";

const meta = {
  title: "Atoms/Code",
  component: Code,
  args: {
    children: "npm run dev",
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
