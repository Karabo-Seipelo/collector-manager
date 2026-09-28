import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";

import { BlogCategoryPage } from "./blog-category-page";

const meta = {
  title: "Pages/BlogCategory",
  component: BlogCategoryPage,
  parameters: { layout: "fullscreen" },
  args: { onSubscribe: fn() },
} satisfies Meta<typeof BlogCategoryPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    const body = within(document.body);

    await expect(
      body.getByRole("heading", { level: 1, name: "Destinations" }),
    ).toBeVisible();
    await expect(
      body.getByRole("link", { name: "Destinations", current: "page" }),
    ).toBeVisible();
    await expect(
      body.getByRole("tab", { name: "Top rated", selected: true }),
    ).toBeVisible();
    await expect(body.getAllByRole("tab")).toHaveLength(5);
    await expect(
      body.getByRole("heading", { level: 3, name: "Adventure Awaits in Utah" }),
    ).toBeVisible();
    await expect(body.getByText("Jane Smith")).toBeVisible();
    await expect(
      body.getByRole("heading", { level: 2, name: "Subscribe today" }),
    ).toBeVisible();
    await expect(body.getByRole("button", { name: "Subscribe" })).toBeVisible();
    await expect(body.getByText("© 2024 Practical Travel")).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
