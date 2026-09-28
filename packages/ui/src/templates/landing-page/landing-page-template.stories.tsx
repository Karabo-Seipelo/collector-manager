import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { LandingPageTemplate } from "./landing-page-template";

const meta = {
  title: "Templates/LandingPage",
  component: LandingPageTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LandingPageTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    await expect(
      within(document.body).getByRole("heading", {
        name: /Lorem ipsum dolor sit amet tetur elit/i,
      }),
    ).toBeVisible();
    await expect(
      within(document.body).getByRole("heading", {
        name: "Frequently asked questions",
      }),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
