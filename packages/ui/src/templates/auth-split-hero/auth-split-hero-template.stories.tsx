import type { Meta, StoryObj } from "@storybook/react-vite";

import templateLogin3HeroSrc from "../shared/assets/login-3-hero.png";
import { AuthSplitHeroTemplate } from "./auth-split-hero-template";

const meta = {
  title: "Templates/AuthSplitHero",
  component: AuthSplitHeroTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthSplitHeroTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heroSrc: templateLogin3HeroSrc,
    children: (
      <div className="mx-auto w-full max-w-md rounded-lg border border-dashed border-stroke-weak p-8 text-center text-small text-fg-weak">
        Form slot
      </div>
    ),
  },
};
