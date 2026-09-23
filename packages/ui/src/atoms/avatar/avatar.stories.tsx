import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Avatar } from "./avatar";

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
  title: "Atoms/Avatar",
  component: Avatar,
  args: {
    name: "Karabo Seipelo",
    size: "medium",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "initials",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("img", { name: "Karabo Seipelo" }),
    ).toHaveTextContent("KS");
  },
};

export const Photo: Story = {
  args: {
    src: photoSrc,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const photo = canvas.getByRole("img", { name: "Karabo Seipelo" });
    await expect(photo.tagName).toBe("IMG");
  },
};

export const Icon: Story = {
  args: {
    type: "icon",
  },
};

export const Initials: Story = {
  args: {
    type: "initials",
  },
};

export const Sizes: Story = {
  args: {
    src: photoSrc,
  },
  render: (args) => (
    <div className="flex items-end gap-4">
      <Avatar {...args} size="small" />
      <Avatar {...args} size="medium" />
      <Avatar {...args} size="large" />
    </div>
  ),
};
