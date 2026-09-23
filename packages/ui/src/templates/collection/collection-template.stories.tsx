import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { CollectionTemplate } from "./collection-template";

const meta = {
  title: "Templates/Collection",
  component: CollectionTemplate,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onSidebarOpenChange: fn(),
  },
  argTypes: {
    sidebarOpen: { control: false },
    defaultSidebarOpen: { control: false },
  },
} satisfies Meta<typeof CollectionTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

function CollectionTemplateExample({
  defaultSidebarOpen = false,
}: {
  defaultSidebarOpen?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(defaultSidebarOpen);

  return (
    <CollectionTemplate
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
    />
  );
}

export const Desktop: Story = {
  render: () => <CollectionTemplateExample />,
  play: async () => {
    const nav = await within(document.body).findByRole("navigation", {
      name: "Main",
    });
    await expect(nav).toBeVisible();
    await expect(
      within(nav).getByRole("link", { name: "Collection" }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      within(document.body).getByRole("heading", { name: "My collection" }),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <CollectionTemplateExample />,
  play: async () => {
    await expect(
      within(document.body).getByRole("heading", { name: "My collection" }),
    ).toBeVisible();
    await expect(
      within(document.body).getByRole("button", { name: "Add item" }),
    ).toBeVisible();
  },
};

export const MobileSidebarOpen: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <CollectionTemplateExample defaultSidebarOpen />,
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
