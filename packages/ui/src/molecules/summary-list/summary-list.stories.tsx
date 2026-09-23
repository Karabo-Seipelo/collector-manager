import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { SummaryList } from "./summary-list";

const baseItems = Array.from({ length: 5 }, (_, index) => ({
  id: `item-${index + 1}`,
  term: "Term",
  description: "Description",
}));

const meta = {
  title: "Molecules/SummaryList",
  component: SummaryList,
  args: {
    "aria-label": "Summary",
    items: baseItems.map((item) => ({
      ...item,
      action: { type: "link" as const, label: "Change", href: "#change" },
    })),
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Review list of term/description pairs with optional row actions.",
      },
    },
  },
} satisfies Meta<typeof SummaryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithChangeLink: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("link", { name: "Change" })).toHaveLength(5);
  },
};

export const WithActionLinks: Story = {
  args: {
    items: baseItems.map((item) => ({
      ...item,
      action: {
        type: "links" as const,
        links: [
          { type: "link" as const, label: "Copy", href: "#copy" },
          { type: "link" as const, label: "Download", href: "#download" },
          { type: "link" as const, label: "Delete", href: "#delete" },
        ],
      },
    })),
  },
};

export const WithActionIcons: Story = {
  args: {
    items: baseItems.map((item) => ({
      ...item,
      action: {
        type: "icons" as const,
        icons: [
          { label: "Copy", icon: "copy" as const },
          { label: "Download", icon: "download" as const },
          { label: "Delete", icon: "trash-2" as const },
          { label: "More options", icon: "more-horizontal" as const },
        ],
      },
    })),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("button", { name: "Copy" })).toHaveLength(5);
  },
};

export const WithoutActions: Story = {
  args: {
    items: baseItems,
  },
};

export const Interactive: Story = {
  args: {
    items: [
      {
        term: "Email",
        description: "john@example.com",
        action: { type: "link", label: "Change", href: "#change-email" },
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("link", { name: "Change" }));
  },
};
