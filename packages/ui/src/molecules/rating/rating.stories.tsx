import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Rating } from "./rating";

const meta = {
  title: "Molecules/Rating",
  component: Rating,
  args: {
    value: 3.5,
    reviewCount: 23,
    reviewsHref: "#reviews",
  },
  argTypes: {
    icon: {
      control: "select",
      options: ["star", "heart"],
    },
    layout: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Read-only rating display with star or heart icons, optional numeric value, and review count link.",
      },
    },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StarHorizontal: Story = {
  args: {
    icon: "star",
    layout: "horizontal",
    showValue: true,
    showReviews: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("3.5")).toBeVisible();
    await expect(canvas.getByRole("link", { name: "(23 reviews)" })).toBeVisible();
  },
};

export const StarHorizontalNoReviews: Story = {
  args: {
    icon: "star",
    layout: "horizontal",
    showReviews: false,
  },
};

export const StarHorizontalNoValue: Story = {
  args: {
    icon: "star",
    layout: "horizontal",
    showValue: false,
  },
};

export const StarHorizontalIconsOnly: Story = {
  args: {
    icon: "star",
    layout: "horizontal",
    showValue: false,
    showReviews: false,
  },
};

export const StarVertical: Story = {
  args: {
    icon: "star",
    layout: "vertical",
    showValue: true,
    showReviews: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("From")).toBeVisible();
    await expect(canvas.getByRole("link", { name: "23 reviews" })).toBeVisible();
  },
};

export const StarVerticalNoReviews: Story = {
  args: {
    icon: "star",
    layout: "vertical",
    showReviews: false,
  },
};

export const HeartHorizontal: Story = {
  args: {
    icon: "heart",
    layout: "horizontal",
  },
};

export const HeartVertical: Story = {
  args: {
    icon: "heart",
    layout: "vertical",
  },
};
