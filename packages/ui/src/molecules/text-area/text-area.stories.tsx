import type { Meta, StoryObj } from "@storybook/react-vite";

import { withWidth } from "../../../.storybook/decorators";
import { TextArea } from "./text-area";

const meta = {
  title: "Molecules/TextArea",
  component: TextArea,
  args: {
    label: "Notes",
    required: true,
  },
  decorators: [withWidth("364px")],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Optional: Story = {
  args: {
    required: false,
    optional: true,
  },
};

export const WithHint: Story = {
  args: {
    hint: "Describe condition and storage history.",
  },
};

export const Filled: Story = {
  args: {
    defaultValue:
      "Stored upright in a protective outer sleeve. The jacket has light shelf wear and the record plays cleanly throughout.",
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: "Add notes about condition and storage…",
  },
};

export const Invalid: Story = {
  args: {
    error: "Notes are too long.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Stored upright in a protective outer sleeve.",
  },
};

export const VisualStates: Story = {
  tags: ["!test"],
  render: () => (
    <div className="flex flex-col gap-12">
      <TextArea label="Default" required />
      <TextArea label="Hover" required state="hover" />
      <TextArea label="Press" required state="press" />
      <TextArea label="Focus" required state="focus" />
    </div>
  ),
};

export const InvalidVisualStates: Story = {
  tags: ["!test"],
  render: () => (
    <div className="flex flex-col gap-12">
      <TextArea label="Default" required error="Error message" />
      <TextArea label="Hover" required error="Error message" state="hover" />
      <TextArea label="Press" required error="Error message" state="press" />
      <TextArea label="Focus" required error="Error message" state="focus" />
    </div>
  ),
};
