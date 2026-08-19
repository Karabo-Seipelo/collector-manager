import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./card";

const meta = {
  title: "Molecules/Card",
  component: Card,
  args: {
    title: "Card title",
    href: "https://example.com",
    children: "Card description goes here.",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
