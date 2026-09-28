import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { BlogArticleTemplate } from "./blog-article-template";

const meta = {
  title: "Templates/BlogArticle",
  component: BlogArticleTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BlogArticleTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    await expect(
      within(document.body).getByRole("heading", {
        name: "Building accessible components at scale",
      }),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
