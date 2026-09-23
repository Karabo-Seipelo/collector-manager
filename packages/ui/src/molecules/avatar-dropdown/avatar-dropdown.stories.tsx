import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { AvatarDropdown } from "./avatar-dropdown";

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
  title: "Molecules/AvatarDropdown",
  component: AvatarDropdown,
  args: {
    name: "John Smith",
    src: photoSrc,
    size: "small",
    variant: "button",
  },
} satisfies Meta<typeof AvatarDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "John Smith" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
  },
};

export const Open: Story = {
  args: {
    open: true,
  },
};

export const Navigation: Story = {
  args: {
    variant: "navigation",
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Sidebar: Story = {
  args: {
    name: "Karabo Seipelo",
    description: "Free plan",
    src: undefined,
  },
  decorators: [
    (Story) => (
      <div className="w-[228px]">
        <Story />
      </div>
    ),
  ],
};
