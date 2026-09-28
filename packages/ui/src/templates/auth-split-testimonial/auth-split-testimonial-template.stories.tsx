import type { Meta, StoryObj } from "@storybook/react-vite";

import { AuthSplitTestimonialTemplate } from "./auth-split-testimonial-template";

const meta = {
  title: "Templates/AuthSplitTestimonial",
  component: AuthSplitTestimonialTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthSplitTestimonialTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="mx-auto w-full max-w-md rounded-lg border border-dashed border-stroke-weak p-8 text-center text-small text-fg-weak">
        Form slot
      </div>
    ),
  },
};
