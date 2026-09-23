import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { AvatarLabelled } from "./avatar-labelled";

const photoSrc =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" fill="#c9a07a"/>
      <circle cx="48" cy="38" r="16" fill="#e8c4a0"/>
      <ellipse cx="48" cy="92" rx="28" ry="32" fill="#3f4a5c"/>
    </svg>`,
  );

const meta = {
  title: "Molecules/AvatarLabelled",
  component: AvatarLabelled,
  args: {
    name: "John Smith",
    description: "john@practical-ui.com",
    src: photoSrc,
    size: "medium",
  },
} satisfies Meta<typeof AvatarLabelled>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("John Smith")).toBeInTheDocument();
    await expect(canvas.getByText("john@practical-ui.com")).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    size: "small",
    description: undefined,
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Initials: Story = {
  args: {
    src: undefined,
    description: "Collecting since 2021",
  },
};
