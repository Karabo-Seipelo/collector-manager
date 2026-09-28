import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { WorkoutTemplate } from "./workout-template";

const meta = {
  title: "Templates/Workout",
  component: WorkoutTemplate,
  parameters: { layout: "fullscreen" },
  args: {
    onStartWorkout: fn(),
    onShare: fn(),
    onSave: fn(),
  },
} satisfies Meta<typeof WorkoutTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async ({ args }) => {
    const body = within(document.body);

    await expect(
      body.getByRole("link", { name: "Workouts", current: "page" }),
    ).toBeVisible();
    await expect(body.getByRole("link", { name: "Yoga" })).toBeVisible();
    await expect(
      body.getByRole("heading", { level: 1, name: "Morning energiser" }),
    ).toBeVisible();
    await expect(body.getByText("With Brooklyn Sims")).toBeVisible();
    await expect(body.getByRole("link", { name: "23 reviews" })).toBeVisible();
    await expect(body.getByText("20 mins", { exact: true })).toBeVisible();
    await expect(body.getByText("Beginner", { exact: true })).toBeVisible();
    await expect(body.getByText("Ambient")).toBeVisible();
    await expect(body.getByText("None")).toBeVisible();
    await expect(body.getByText(/mindful breathing techniques/)).toBeVisible();

    await userEvent.click(body.getByRole("link", { name: "Share" }));
    await expect(args.onShare).toHaveBeenCalled();
    await userEvent.click(body.getByRole("button", { name: "Start workout" }));
    await expect(args.onStartWorkout).toHaveBeenCalled();

    await expect(
      body.getByRole("heading", { level: 2, name: "Similar workouts" }),
    ).toBeVisible();
    await expect(
      body.getByRole("heading", { level: 3, name: "Flexibility booster" }),
    ).toBeVisible();
    await expect(
      body.getByRole("heading", { level: 3, name: "Core strength flow" }),
    ).toBeVisible();
    await expect(
      body.getByRole("heading", { level: 3, name: "Evening unwind" }),
    ).toBeVisible();
    await expect(body.getByText("40 mins | Advanced")).toBeVisible();
    await expect(
      body.getByRole("link", { name: "View all workouts" }),
    ).toBeVisible();
    await expect(body.getByText("© 2024 Practical Shop")).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
