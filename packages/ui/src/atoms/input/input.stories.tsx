import type { Meta, StoryObj } from "@storybook/react-vite";

import { withWidth } from "../../../.storybook/decorators";
import { FeatherIcon } from "../icon/icon";
import { Input } from "./input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  args: {
    placeholder: "Search your collection",
    "aria-label": "Search",
  },
  decorators: [withWidth("360px")],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <FeatherIcon name="search" size={20} />,
  },
};

export const Clearable: Story = {
  args: {
    clearable: true,
    defaultValue: "Kind of Blue",
  },
};
