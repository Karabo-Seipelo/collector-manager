import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { BlogTemplate } from "./blog-template";

const meta = {
  title: "Templates/Blog",
  component: BlogTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BlogTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    await expect(within(document.body).getByRole("heading", { name: "Blog" })).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
