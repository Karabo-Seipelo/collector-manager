import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";

import { BlogArticleTemplate } from "./blog-article-template";

const meta = {
  title: "Templates/BlogArticle",
  component: BlogArticleTemplate,
  parameters: { layout: "fullscreen" },
  args: { onSubscribe: fn() },
} satisfies Meta<typeof BlogArticleTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    const body = within(document.body);

    await expect(body.getByText("8 July 2025")).toBeVisible();
    await expect(
      body.getByRole("heading", { level: 1, name: "Marvels of China" }),
    ).toBeVisible();
    await expect(body.getByText("Tony Jones")).toBeVisible();
    await expect(body.getByText("6 min read")).toBeVisible();
    await expect(
      body.getByRole("heading", { level: 2, name: "Overview" }),
    ).toBeVisible();
    await expect(
      body.getByRole("heading", { level: 2, name: "Cruise the Yangtze River" }),
    ).toBeVisible();
    await expect(body.getByRole("button", { name: "Foodie" })).toBeVisible();
    await expect(body.getAllByRole("link", { name: "Facebook" })).toHaveLength(
      2,
    );
    await expect(
      body.getByRole("heading", { level: 2, name: "You might also like" }),
    ).toBeVisible();
    await expect(
      body.getByRole("heading", { level: 3, name: "Wonders of Greece" }),
    ).toBeVisible();
    await expect(
      body.getByRole("link", { name: "View all destinations" }),
    ).toBeVisible();
    await expect(
      body.getByRole("heading", { level: 2, name: "Subscribe today" }),
    ).toBeVisible();
    await expect(body.getByText("© 2024 Practical Travel")).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
