import type { Meta, StoryObj } from "@storybook/react-vite";
import feather from "feather-icons";

import { FeatherIcon, type FeatherIconName } from "./icon";

const iconNames = Object.keys(feather.icons) as FeatherIconName[];

const meta = {
  title: "Atoms/Icon",
  component: FeatherIcon,
  args: {
    name: "star",
  },
  argTypes: {
    name: {
      control: "select",
      options: iconNames,
    },
  },
} satisfies Meta<typeof FeatherIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CommonIcons: Story = {
  render: () => {
    const names: FeatherIconName[] = [
      "home",
      "search",
      "settings",
      "user",
      "plus",
      "edit",
      "trash-2",
      "check",
      "x",
      "arrow-right",
    ];

    return (
      <div className="flex flex-wrap gap-4 text-neutral-900">
        {names.map((name) => (
          <div
            key={name}
            className="flex w-24 flex-col items-center gap-2 rounded-lg border border-neutral-200 p-3"
          >
            <FeatherIcon name={name} />
            <span className="text-xs text-neutral-600">{name}</span>
          </div>
        ))}
      </div>
    );
  },
};
