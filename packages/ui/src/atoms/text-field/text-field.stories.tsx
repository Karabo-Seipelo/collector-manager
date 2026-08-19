import type { Meta, StoryObj } from "@storybook/react-vite";

import { withWidth } from "../../../.storybook/decorators";
import { FeatherIcon } from "../icon/icon";
import { TextField } from "./text-field";

const fieldWidth = withWidth("360px");

const meta = {
  title: "Atoms/TextField",
  component: TextField,
  args: {
    label: "Item name",
    placeholder: "Search your collection",
    hint: "Use the name shown on the sleeve or label.",
  },
  decorators: [fieldWidth],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: "Kind of Blue",
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Optional: Story = {
  args: {
    optional: true,
  },
};

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <FeatherIcon name="search" size={20} />,
    placeholder: "Search items",
  },
};

export const Clearable: Story = {
  args: {
    clearable: true,
    defaultValue: "Vinyl · 1959 · NM",
  },
};

export const WithError: Story = {
  args: {
    defaultValue: "Blue Train",
    error: "An item with this name already exists.",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "Abbey Road",
    disabled: true,
  },
};

export const Multiline: Story = {
  args: {
    label: "Notes",
    multiline: true,
    placeholder: "Condition, pressing, storage history…",
    rows: 4,
  },
};

export const VisualStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField label="Default" placeholder="Default state" />
      <TextField label="Hover" placeholder="Hover state" state="hover" />
      <TextField label="Press" placeholder="Press state" state="press" />
      <TextField label="Focus" placeholder="Focus state" state="focus" />
    </div>
  ),
};
