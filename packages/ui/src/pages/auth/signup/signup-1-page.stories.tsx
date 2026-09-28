import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Signup1Page } from "./signup-1-page";

const meta = {
  title: "Pages/SignUp1",
  component: Signup1Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Signup1Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    const canvas = within(document.body);
    await expect(
      canvas.getByRole("heading", { level: 1, name: "Sign up free" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Sign up with Google" }),
    ).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Sign up" })).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
