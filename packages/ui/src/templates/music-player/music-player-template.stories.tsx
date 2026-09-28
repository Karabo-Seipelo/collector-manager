import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { MusicPlayerTemplate } from "./music-player-template";

const meta = {
  title: "Templates/MusicPlayer",
  component: MusicPlayerTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MusicPlayerTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    await expect(
      within(document.body).getByRole("heading", { name: "Midnight City" }),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
