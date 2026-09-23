import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Checkbox } from "../../atoms/checkbox/checkbox";
import { CheckboxGroup } from "./checkbox-group";

const meta = {
  title: "Molecules/CheckboxGroup",
  component: CheckboxGroup,
  args: {
    label: "Condition",
    required: true,
    size: "small",
    children: [
      <Checkbox key="mint" label="Mint" defaultChecked />,
      <Checkbox key="near-mint" label="Near mint" />,
      <Checkbox key="very-good" label="Very good" />,
      <Checkbox key="good" label="Good" />,
      <Checkbox key="fair" label="Fair" />,
    ],
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "large"],
    },
    children: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="p-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("group", { name: /Condition/ }),
    ).toBeVisible();
    await expect(canvas.getAllByRole("checkbox")).toHaveLength(5);
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const WithHint: Story = {
  args: {
    required: false,
    optional: true,
    hint: "Choose all that apply",
  },
};

export const Invalid: Story = {
  args: {
    error: "Choose at least one condition",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
