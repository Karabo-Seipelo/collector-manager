import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Signup4Page } from "./signup-4-page";

const meta = {
  title: "Pages/SignUp4",
  component: Signup4Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Signup4Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    const canvas = within(document.body);
    await expect(
      canvas.getByRole("heading", { level: 1, name: "Sign up free" }),
    ).toBeVisible();
    await expect(canvas.getByText(/John Smith/)).toBeVisible();
    await expect(
      canvas.getByText(/help them improve their design skills/),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
