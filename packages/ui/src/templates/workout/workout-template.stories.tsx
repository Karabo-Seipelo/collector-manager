import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { WorkoutTemplate } from "./workout-template";

const meta = {
  title: "Templates/Workout",
  component: WorkoutTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof WorkoutTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async () => {
    await expect(
      within(document.body).getByRole("heading", { name: "Full body workout" }),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
