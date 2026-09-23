import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Radio } from "../../atoms/radio/radio";
import { RadioGroup } from "./radio-group";

const options = [
  <Radio key="vinyl" label="Vinyl" value="vinyl" defaultChecked />,
  <Radio key="cd" label="CD" value="cd" />,
  <Radio key="cassette" label="Cassette" value="cassette" />,
  <Radio key="digital" label="Digital" value="digital" />,
  <Radio key="other" label="Other" value="other" />,
];

const meta = {
  title: "Molecules/RadioGroup",
  component: RadioGroup,
  args: {
    label: "Format",
    required: true,
    name: "format",
    size: "small",
    children: options,
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
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const vinyl = canvas.getByRole("radio", { name: "Vinyl" });
    const cd = canvas.getByRole("radio", { name: "CD" });

    await expect(vinyl).toBeChecked();
    await userEvent.click(cd);
    await expect(cd).toBeChecked();
    await expect(vinyl).not.toBeChecked();
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
    hint: "Choose one format",
  },
};

export const Invalid: Story = {
  args: {
    error: "Choose a format",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
