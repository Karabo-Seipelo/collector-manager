import type { Meta, StoryObj } from "@storybook/react-vite";

import { AuthLayout } from "../shared/auth-layout";

const meta = {
  title: "Templates/SignUp2",
  component: AuthLayout,
  parameters: { layout: "fullscreen" },
  args: { mode: "signup" as const, variant: "centered" as const },
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
