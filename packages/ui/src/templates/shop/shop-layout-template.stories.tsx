import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { ShopLayoutTemplate } from "./shop-layout-template";

const meta = {
  title: "Templates/ShopLayout",
  component: ShopLayoutTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ShopLayoutTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navigation: (
      <header className="border-b border-stroke-weak px-4 py-3 text-small text-fg-weak">
        Navigation slot
      </header>
    ),
    footer: (
      <footer className="border-t border-stroke-weak px-4 py-3 text-small text-fg-weak">
        Footer slot
      </footer>
    ),
    children: (
      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-small text-fg-weak">Main content area</p>
      </main>
    ),
  },
  play: async () => {
    const body = within(document.body);
    await expect(body.getByText("Navigation slot")).toBeVisible();
    await expect(body.getByText("Main content area")).toBeVisible();
    await expect(body.getByText("Footer slot")).toBeVisible();
  },
};
