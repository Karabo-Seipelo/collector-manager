import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Signup2Template } from "./signup-2-template";

const meta = {
  title: "Templates/SignUp2",
  component: Signup2Template,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Signup2Template>;

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
