import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { withWidth } from "../../../.storybook/decorators";
import { AvatarDropdown } from "./avatar-dropdown";

const photoSrc =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" fill="#c9a07a"/>
      <circle cx="48" cy="38" r="16" fill="#e8c4a0"/>
      <ellipse cx="48" cy="92" rx="28" ry="32" fill="#3f4a5c"/>
    </svg>`,
  );

const meta = {
  title: "Organisms/AvatarDropdown",
  component: AvatarDropdown,
  args: {
    name: "John Smith",
    src: photoSrc,
    size: "small",
    variant: "button",
    open: false,
    disabled: false,
  },
  argTypes: {
    name: { description: "Visible name and accessible name of the trigger." },
    description: { description: "Optional second line under the name." },
    src: { control: "text", description: "Photo URL." },
    alt: { control: "text" },
    avatarType: {
      control: "select",
      options: ["photo", "icon", "initials"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    variant: {
      control: "select",
      options: ["button", "navigation"],
      description:
        "`button` hugs content with a chevron. `navigation` is full-width with a more icon.",
    },
    open: {
      control: "boolean",
      description:
        "Sets aria-expanded. Button variant uses chevron-up when true.",
    },
    disabled: { control: "boolean" },
    className: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "User-menu **trigger**: AvatarLabelled plus a trailing icon. Does not render a menu — pass `open` and `onClick`; the parent owns the panel. `button` uses 16×8 padding and a chevron; `navigation` uses 24×12 padding, stretches to the parent, and shows more-horizontal.",
      },
    },
  },
} satisfies Meta<typeof AvatarDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Closed button trigger. Clicking does not open a menu; the parent should toggle `open`.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "John Smith" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
  },
};

export const Open: Story = {
  args: {
    open: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Expanded button trigger with chevron-up and `aria-expanded`.",
      },
    },
  },
};

export const Navigation: Story = {
  args: {
    variant: "navigation",
  },
  decorators: [withWidth("320px")],
  parameters: {
    docs: {
      description: {
        story:
          "Full-width navigation row (320px in the spec) with a more-horizontal icon instead of a chevron.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "30% opacity; native disabled prevents activation.",
      },
    },
  },
};

export const Sidebar: Story = {
  args: {
    name: "Karabo Seipelo",
    description: "Free plan",
    src: undefined,
  },
  decorators: [withWidth("228px")],
  parameters: {
    docs: {
      description: {
        story:
          "Collection sidebar shape: 32px initials, name, plan line, and chevron in a ~228px rail.",
      },
    },
  },
};
