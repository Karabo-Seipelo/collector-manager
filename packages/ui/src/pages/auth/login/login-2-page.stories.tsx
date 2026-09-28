import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Login2Page } from "./login-2-page";

const meta = {
  title: "Pages/Login2",
  component: Login2Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Login2Page>;

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
    await expect(canvas.getByRole("button", { name: "Log in" })).toBeVisible();
    await expect(canvas.getByText(/privacy policy/)).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
