import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Testimonial } from "./testimonial";

const quote =
  "Such a useful and practical book by one of the best in the game. Love this logic-driven approach to UI design. Surprisingly powerful.";

const author = {
  name: "John Smith",
  description: "john@practical-ui.com",
};

const meta = {
  title: "Organisms/Testimonial",
  component: Testimonial,
  args: {
    quote,
    author,
    rating: 3.5,
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Customer quote with optional author details and star rating.",
      },
    },
  },
} satisfies Meta<typeof Testimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
  args: {
    align: "left",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("John Smith")).toBeVisible();
    await expect(canvas.getByText(quote)).toBeVisible();
  },
};

export const Center: Story = {
  args: {
    align: "center",
  },
};

export const QuoteOnly: Story = {
  args: {
    author: undefined,
    rating: undefined,
  },
};

export const WithoutRating: Story = {
  args: {
    rating: undefined,
  },
};
