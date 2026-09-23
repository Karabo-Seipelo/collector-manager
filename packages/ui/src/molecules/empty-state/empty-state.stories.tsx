import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { ButtonGroup } from "../button-group/button-group";
import { EmptyState } from "./empty-state";

const description =
  "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Lorem ipsum dolor sit amet, consec tetur adipiscing elit.";

const meta = {
  title: "Molecules/EmptyState",
  component: EmptyState,
  args: {
    title: "Heading",
    description,
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Placeholder for empty pages, lists, or search results. Compose with IconContainer and ButtonGroup to match the Practical UI spec.",
      },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <FeatherIcon name="inbox" size={24} />,
    actions: (
      <ButtonGroup aria-label="Empty state actions">
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </ButtonGroup>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Heading" }),
    ).toBeVisible();
    await expect(canvas.getByRole("group")).toBeVisible();
  },
};

export const Basic: Story = {
  args: {
    actions: (
      <ButtonGroup aria-label="Empty state actions">
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </ButtonGroup>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Text and actions only — no leading icon.",
      },
    },
  },
};

export const TextOnly: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Heading and description without actions.",
      },
    },
  },
};
