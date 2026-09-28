import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Signup4Template } from "./signup-4-template";

const meta = {
  title: "Templates/SignUp4",
  component: Signup4Template,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Signup4Template>;

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
