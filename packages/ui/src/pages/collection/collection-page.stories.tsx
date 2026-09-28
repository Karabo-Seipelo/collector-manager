import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { CollectionPage } from "./collection-page";

const FIGMA_COLLECTION_HOME_URL =
  "https://www.figma.com/design/oTMqXOCl6Ah7HONbWWUyvZ/Practical-UI-design-system?node-id=9469-124236";

const meta = {
  title: "Pages/Collection",
  component: CollectionPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Collections home (desktop 1280). [Figma](${FIGMA_COLLECTION_HOME_URL})`,
      },
    },
  },
  args: {
    onSidebarOpenChange: fn(),
  },
  argTypes: {
    sidebarOpen: { control: false },
    defaultSidebarOpen: { control: false },
  },
} satisfies Meta<typeof CollectionPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function CollectionPageExample({
  defaultSidebarOpen = false,
}: {
  defaultSidebarOpen?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(defaultSidebarOpen);

  return (
    <CollectionPage
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
    />
  );
}

export const Desktop: Story = {
  render: () => <CollectionPageExample />,
  play: async () => {
    const nav = await within(document.body).findByRole("navigation", {
      name: "Main",
    });
    await expect(nav).toBeVisible();
    await expect(
      within(nav).getByRole("link", { name: "Collection" }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      within(document.body).findByRole("heading", { name: "My collection" }),
    ).resolves.toBeVisible();
    await expect(
      within(document.body).findByText(/248 items · R 41 200 estimated value/),
    ).resolves.toBeVisible();
    await expect(
      within(document.body).getByRole("button", { name: "Import" }),
    ).toBeVisible();
    await expect(
      within(document.body).findByRole("heading", { name: "Kind of Blue" }),
    ).resolves.toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <CollectionPageExample />,
  play: async () => {
    await expect(
      within(document.body).findByRole("heading", { name: "My collection" }),
    ).resolves.toBeVisible();
    await expect(
      within(document.body).getByRole("button", { name: "Add item" }),
    ).toBeVisible();
  },
};

export const MobileSidebarOpen: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <CollectionPageExample defaultSidebarOpen />,
  play: async () => {
    const nav = await within(document.body).findByRole("navigation", {
      name: "Main",
    });
    await expect(nav).toBeVisible();
    await expect(
      within(document.body).getByRole("button", { name: "Close navigation" }),
    ).toBeVisible();
  },
};
