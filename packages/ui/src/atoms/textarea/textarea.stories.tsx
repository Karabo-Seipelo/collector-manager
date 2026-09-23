import type { Meta, StoryObj } from "@storybook/react-vite";

import { withWidth } from "../../../.storybook/decorators";
import { Textarea } from "./textarea";

const meta = {
  title: "Atoms/Textarea",
  component: Textarea,
  args: {
    "aria-label": "Notes",
    placeholder: "Add notes about condition and storage…",
  },
  decorators: [withWidth("364px")],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    defaultValue:
      "Stored upright in a protective outer sleeve. The jacket has light shelf wear.",
  },
};
