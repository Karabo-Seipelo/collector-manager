import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { AvatarStack } from "./avatar-stack";

const photo = (fill: string) =>
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" fill="${fill}"/>
      <circle cx="48" cy="38" r="16" fill="#e8c4a0"/>
      <ellipse cx="48" cy="92" rx="28" ry="32" fill="#3f4a5c"/>
    </svg>`,
  );

const people = [
  { name: "Ada Lovelace", src: photo("#c9a07a") },
  { name: "Alan Turing", src: photo("#8d6e4c") },
  { name: "Grace Hopper", src: photo("#d4b896") },
  { name: "Katherine Johnson", src: photo("#a67c52") },
  { name: "Donald Knuth", src: photo("#b08968") },
  { name: "Barbara Liskov", src: photo("#c4a574") },
  { name: "Edsger Dijkstra", src: photo("#9c7a54") },
];

const meta = {
  title: "Molecules/AvatarStack",
  component: AvatarStack,
  args: {
    people,
    size: "medium",
    max: 5,
  },
} satisfies Meta<typeof AvatarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("group", { name: "Ada Lovelace and 6 others" }),
    ).toBeInTheDocument();
    await expect(canvas.getByText("2+")).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const FitsWithoutOverflow: Story = {
  args: {
    people: people.slice(0, 3),
  },
};
