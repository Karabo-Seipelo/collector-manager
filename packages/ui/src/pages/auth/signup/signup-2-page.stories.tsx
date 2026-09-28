import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Signup2Page } from "./signup-2-page";

const meta = {
  title: "Pages/SignUp2",
  component: Signup2Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Signup2Page>;

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
    await expect(canvas.getByRole("link", { name: "terms of service" })).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
