import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { ShopTemplate } from "./shop-template";

const meta = {
  title: "Templates/Shop",
  component: ShopTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ShopTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    await expect(within(document.body).getByRole("heading", { name: "Shop" })).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
