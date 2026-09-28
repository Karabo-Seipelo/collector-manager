import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Signup1Template } from "./signup-1-template";

const meta = {
  title: "Templates/SignUp1",
  component: Signup1Template,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Signup1Template>;

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
