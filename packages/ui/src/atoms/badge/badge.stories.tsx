import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { FeatherIcon } from "../icon/icon";
import { Badge } from "./badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  args: {
    children: "Label",
    tone: "neutral",
    size: "medium",
    dot: false,
    icon: <FeatherIcon name="circle" />,
  },
  argTypes: {
    tone: {
      control: "select",
      options: [
        "error",
        "warning",
        "success",
        "information",
        "neutral",
        "brand",
      ],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    icon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A display-only element used to indicate status. Not interactive — use Tag for selectable filters.",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const toneIcons = {
  error: <FeatherIcon name="x-circle" />,
  warning: <FeatherIcon name="alert-triangle" />,
  success: <FeatherIcon name="check-circle" />,
  information: <FeatherIcon name="info" />,
  neutral: <FeatherIcon name="circle" />,
  brand: <FeatherIcon name="circle" />,
} as const;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Label")).toBeVisible();
  },
};

export const AllTones: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        {(
          [
            "error",
            "warning",
            "success",
            "information",
            "neutral",
            "brand",
          ] as const
        ).map((tone) => (
          <Badge {...args} key={tone} tone={tone} icon={toneIcons[tone]}>
            Label
          </Badge>
        ))}
      </div>
      <div className="w-fit rounded-xl bg-[#111119] p-6">
        <div className="flex flex-wrap items-center gap-3">
          {(
            [
              "error",
              "warning",
              "success",
              "information",
              "neutral",
              "brand",
            ] as const
          ).map((tone) => (
            <Badge {...args} key={tone} tone={tone} icon={toneIcons[tone]}>
              Label
            </Badge>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {
    tone: "success",
    icon: <FeatherIcon name="check-circle" />,
  },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge {...args} size="small">
        Label
      </Badge>
      <Badge {...args} size="medium">
        Label
      </Badge>
    </div>
  ),
};

export const Properties: Story = {
  args: {
    tone: "neutral",
  },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge {...args} icon={<FeatherIcon name="circle" />}>
        Label
      </Badge>
      <Badge {...args} icon={undefined}>
        Label
      </Badge>
      <Badge {...args} dot>
        Label
      </Badge>
    </div>
  ),
};
