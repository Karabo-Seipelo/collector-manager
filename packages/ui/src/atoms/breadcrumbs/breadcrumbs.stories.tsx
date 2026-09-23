import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";

import { Breadcrumbs } from "./breadcrumbs";

const trail = [
  { label: "Home", href: "#home" },
  { label: "Library", href: "#library" },
  { label: "Vinyl" },
];

const meta = {
  title: "Atoms/Breadcrumbs",
  component: Breadcrumbs,
  args: {
    items: trail,
    collapsed: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          "A navigational trail of the user’s path. Collapsed type shows the first and last crumbs with an ellipsis in between.",
      },
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeVisible();
    await expect(canvas.getByText("Vinyl")).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Show more breadcrumbs" }),
    ).toBeVisible();
  },
};

export const InteractiveCollapse: Story = {
  render: function Interactive(args) {
    const [collapsed, setCollapsed] = useState(true);

    return (
      <Breadcrumbs
        {...args}
        collapsed={collapsed}
        onExpand={() => setCollapsed(false)}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Show more breadcrumbs" }),
    );
    await expect(canvas.getByRole("link", { name: "Library" })).toBeVisible();
  },
};

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Breadcrumbs {...args} collapsed={false} />
        <Breadcrumbs {...args} collapsed />
      </div>
      <div className="w-fit rounded-xl bg-[#111119] p-6">
        <div className="flex flex-col gap-4">
          <Breadcrumbs {...args} collapsed={false} />
          <Breadcrumbs {...args} collapsed />
        </div>
      </div>
    </div>
  ),
};
