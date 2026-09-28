import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { CollectionItemDetailPage } from "./collection-item-detail-page";

const FIGMA_ITEM_DETAIL_URL =
  "https://www.figma.com/design/oTMqXOCl6Ah7HONbWWUyvZ/Practical-UI-design-system?node-id=9424-81";

const meta = {
  title: "Pages/CollectionItemDetail",
  component: CollectionItemDetailPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Collection item detail (Kind of Blue). [Figma](${FIGMA_ITEM_DETAIL_URL})`,
      },
    },
  },
  args: {
    onSidebarOpenChange: fn(),
    onEdit: fn(),
    onMove: fn(),
    onMoreActions: fn(),
  },
  argTypes: {
    sidebarOpen: { control: false },
    defaultSidebarOpen: { control: false },
  },
} satisfies Meta<typeof CollectionItemDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({
  defaultSidebarOpen = false,
}: {
  defaultSidebarOpen?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(defaultSidebarOpen);

  return (
    <CollectionItemDetailPage
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
    />
  );
}

export const Desktop: Story = {
  render: () => <Example />,
  play: async ({ args }) => {
    const body = within(document.body);
    await expect(
      body.getByRole("heading", { level: 1, name: "Kind of Blue" }),
    ).toBeVisible();
    await expect(
      body.getByText("Miles Davis · Columbia CL 1355 · six-eye pressing"),
    ).toBeVisible();
    await expect(body.getByText("R 3 400")).toBeVisible();
    await expect(body.getByText("+183%")).toBeVisible();
    await expect(
      body.getByRole("button", { name: "Edit item" }),
    ).toBeVisible();
    await expect(body.getByText("Near mint (NM)")).toBeVisible();
    await expect(body.getByRole("heading", { name: "Notes" })).toBeVisible();

    await body.getByRole("button", { name: "Edit item" }).click();
    await expect(args.onEdit).toHaveBeenCalled();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example />,
  play: async () => {
    await expect(
      within(document.body).getByRole("heading", { name: "Kind of Blue" }),
    ).toBeVisible();
    await expect(
      within(document.body).getByRole("link", { name: "Back to collection" }),
    ).toBeVisible();
  },
};
