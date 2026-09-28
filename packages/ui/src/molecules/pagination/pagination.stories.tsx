import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { Pagination } from "./pagination";

const meta = {
  title: "Molecules/Pagination",
  component: Pagination,
  parameters: {
    layout: "padded",
  },
  args: {
    currentPage: 2,
    totalPages: 10,
    totalItems: 128,
    pageSize: 10,
    onPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Responsive: Story = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Resize the viewport or container to switch between the compact mobile layout and the full desktop layout.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-[928px] px-8 py-8">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("navigation", { name: "Pagination" })).toBeVisible();
  },
};

export const Desktop: Story = {
  decorators: [
    (Story) => (
      <div className="w-[928px] max-w-full">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Showing 11 - 20 of 128")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[364px]">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("2 of 10")).toBeVisible();
    await expect(canvas.queryByText("Showing 11 - 20 of 128")).not.toBeVisible();
    await expect(canvas.getByRole("button", { name: "Previous page" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Next page" })).toBeVisible();
  },
};

export const MobileFirstPage: Story = {
  args: {
    currentPage: 1,
  },
  parameters: Mobile.parameters,
  decorators: Mobile.decorators,
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
  },
  decorators: Desktop.decorators,
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
  },
  decorators: Desktop.decorators,
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 4,
    totalItems: 40,
    pageSize: 10,
  },
  decorators: Desktop.decorators,
};

export const NarrowContainer: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    docs: {
      description: {
        story:
          "Desktop viewport with a narrow container — pagination uses the mobile layout based on available width.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[364px] max-w-full">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("2 of 10")).toBeVisible();
  },
};

function PaginationInteractionExample(
  args: React.ComponentProps<typeof Pagination> & { onPageChange?: (page: number) => void },
) {
  const [page, setPage] = React.useState(args.currentPage);

  return (
    <Pagination
      {...args}
      currentPage={page}
      onPageChange={(nextPage) => {
        setPage(nextPage);
        args.onPageChange?.(nextPage);
      }}
    />
  );
}

export const Interaction: Story = {
  decorators: Desktop.decorators,
  render: (args) => <PaginationInteractionExample {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("link", { name: /Next/i }));
    await expect(args.onPageChange).toHaveBeenCalledWith(3);
  },
};
