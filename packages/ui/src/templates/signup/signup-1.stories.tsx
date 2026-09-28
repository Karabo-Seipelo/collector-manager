import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { AuthLayout } from "../shared/auth-layout";

const meta = {
  title: "Templates/SignUp1",
  component: AuthLayout,
  parameters: { layout: "fullscreen" },
  args: { mode: "signup" as const, variant: "split" as const },
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    await expect(
      within(document.body).getByRole("heading", { name: "Create your account" }),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
