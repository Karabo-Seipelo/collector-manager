import type { Meta, StoryObj } from "@storybook/react-vite";

import { AuthCardTemplate } from "./auth-card-template";

const meta = {
  title: "Templates/AuthCard",
  component: AuthCardTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthCardTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="rounded-lg border border-dashed border-stroke-weak p-8 text-center text-small text-fg-weak">
        Form slot
      </div>
    ),
    footer: (
      <p className="text-center text-tiny text-fg-weak">Footer slot</p>
    ),
  },
};
