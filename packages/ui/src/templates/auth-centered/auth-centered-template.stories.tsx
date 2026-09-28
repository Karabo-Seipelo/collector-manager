import type { Meta, StoryObj } from "@storybook/react-vite";

import { AuthCenteredTemplate } from "./auth-centered-template";

const meta = {
  title: "Templates/AuthCentered",
  component: AuthCenteredTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthCenteredTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="w-full max-w-md rounded-lg border border-dashed border-stroke-weak p-8 text-center text-small text-fg-weak">
        Form slot
      </div>
    ),
  },
};
