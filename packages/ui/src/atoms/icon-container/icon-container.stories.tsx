import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { FeatherIcon } from "../icon/icon";
import { IconContainer, type IconContainerTone } from "./icon-container";

const tones: IconContainerTone[] = [
  "neutral",
  "brand",
  "destructive",
  "warning",
  "success",
  "information",
];

const meta = {
  title: "Atoms/IconContainer",
  component: IconContainer,
  args: {
    icon: <FeatherIcon name="star" />,
    tone: "neutral",
    variant: "filled",
  },
  argTypes: {
    icon: { control: false },
    tone: {
      control: "select",
      options: [...tones, "inverse"],
    },
    variant: {
      control: "select",
      options: ["filled", "stroked"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A display-only 48px container that gives a 24px icon more prominence and a consistent circular shape.",
      },
    },
  },
} satisfies Meta<typeof IconContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTitle("Icon container example")).toBeVisible();
  },
  args: {
    title: "Icon container example",
  },
};

export const Stroked: Story = {
  args: {
    variant: "stroked",
  },
};

export const AllTones: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-6">
        {tones.map((tone) => (
          <IconContainer {...args} key={`${tone}-filled`} tone={tone} />
        ))}
      </div>
      <div className="flex flex-wrap gap-6">
        {tones.map((tone) => (
          <IconContainer
            {...args}
            key={`${tone}-stroked`}
            tone={tone}
            variant="stroked"
          />
        ))}
      </div>
      <div className="flex w-fit gap-6 rounded-xl bg-[#111119] p-6">
        <IconContainer {...args} tone="inverse" />
        <IconContainer {...args} tone="inverse" variant="stroked" />
      </div>
    </div>
  ),
};
