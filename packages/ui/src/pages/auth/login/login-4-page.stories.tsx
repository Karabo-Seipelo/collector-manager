import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Login4Page } from "./login-4-page";

const meta = {
  title: "Pages/Login4",
  component: Login4Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Login4Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    const canvas = within(document.body);
    await expect(
      canvas.getByRole("heading", { level: 1, name: "Welcome" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Log in with Google" }),
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
