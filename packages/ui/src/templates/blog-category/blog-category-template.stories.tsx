import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { BlogCategoryTemplate } from "./blog-category-template";

const meta = {
  title: "Templates/BlogCategory",
  component: BlogCategoryTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BlogCategoryTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    await expect(
      within(document.body).getByRole("heading", { name: "Design systems" }),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
