import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { FeatherIcon } from "../icon/icon";
import { Tag } from "./tag";

const meta = {
  title: "Atoms/Tag",
  component: Tag,
  args: {
    children: "Vinyl",
    selected: false,
    size: "medium",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByRole("button", { name: "Vinyl" });
    await expect(tag).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(tag);
  },
};

export const Selected: Story = {
  args: {
    children: "All",
    selected: true,
    icon: <FeatherIcon name="check" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  },
};

export const Small: Story = {
  args: {
    children: "Vinyl",
    size: "small",
  },
};

export const Disabled: Story = {
  args: {
    children: "Archive",
    disabled: true,
  },
};

export const FilterRow: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Tag selected icon={<FeatherIcon name="check" />}>
        All
      </Tag>
      <Tag>Vinyl</Tag>
      <Tag>Books</Tag>
      <Tag>Cards</Tag>
    </div>
  ),
};
