import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { LandingPagePage } from "./landing-page-page";

const meta = {
  title: "Pages/LandingPage",
  component: LandingPagePage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LandingPagePage>;

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
