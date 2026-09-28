import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";

import { BlogPage } from "./blog-page";

const meta = {
  title: "Pages/Blog",
  component: BlogPage,
  parameters: { layout: "fullscreen" },
  args: { onSubscribe: fn() },
} satisfies Meta<typeof BlogPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    const body = within(document.body);

    await expect(
      body.getByRole("heading", { level: 1, name: "Never stop exploring" }),
    ).toBeVisible();
    await expect(
      body.getByRole("link", { name: "Home", current: "page" }),
    ).toBeVisible();
    await expect(
      body.getAllByRole("button", { name: "Subscribe" }),
    ).toHaveLength(2);
    await expect(
      body.getByRole("link", { name: "223 travellers" }),
    ).toBeVisible();
    await expect(
      body.getByRole("heading", { level: 2, name: "Top destinations" }),
    ).toBeVisible();
    await expect(
      body.getByRole("heading", { level: 3, name: "Sightseeing in San Fran" }),
    ).toBeVisible();
    await expect(body.getByText("Theresa Webb")).toBeVisible();
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
