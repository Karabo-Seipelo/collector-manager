import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { FeatherIcon } from "../icon/icon";
import { TextLink } from "./text-link";

const meta = {
  title: "Atoms/TextLink",
  component: TextLink,
  args: {
    href: "#label",
    children: "Label",
    size: "tiny",
    tone: "brand",
    weight: "regular",
    underline: true,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["tiny", "small"],
    },
    tone: {
      control: "select",
      options: [
        "brand",
        "neutral-strong",
        "neutral-weak",
        "destructive",
        "inverse-strong",
        "inverse-weak",
      ],
    },
    weight: {
      control: "select",
      options: ["regular", "bold"],
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Inline text link with tone, size, weight, underline, and optional icon slots from the Practical UI spec.",
      },
    },
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("link", { name: "Label" })).toBeVisible();
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Bold: Story = {
  args: {
    weight: "bold",
  },
};

export const NoUnderline: Story = {
  args: {
    underline: false,
  },
};

export const NeutralStrong: Story = {
  args: {
    tone: "neutral-strong",
  },
};

export const NeutralWeak: Story = {
  args: {
    tone: "neutral-weak",
  },
};

export const Destructive: Story = {
  args: {
    tone: "destructive",
  },
};

export const InverseStrong: Story = {
  args: {
    tone: "inverse-strong",
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-fill-inverse-strong p-6">
        <Story />
      </div>
    ),
  ],
};

export const InverseWeak: Story = {
  args: {
    tone: "inverse-weak",
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-fill-inverse-strong p-6">
        <Story />
      </div>
    ),
  ],
};

export const WithIconRight: Story = {
  args: {
    weight: "bold",
    iconRight: <FeatherIcon name="arrow-right" size={20} />,
  },
};

export const WithIconLeft: Story = {
  args: {
    iconLeft: <FeatherIcon name="external-link" size={20} />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
