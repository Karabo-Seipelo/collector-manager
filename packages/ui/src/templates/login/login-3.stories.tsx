import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Login3Template } from "./login-3-template";

const meta = {
  title: "Templates/Login3",
  component: Login3Template,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Login3Template>;

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
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
