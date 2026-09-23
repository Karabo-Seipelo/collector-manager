import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Button } from "../button/button";
import { AlertGlobal } from "./alert-global";

const meta = {
  title: "Atoms/AlertGlobal",
  component: AlertGlobal,
  args: {
    children: "Lorem ipsum dolor sit amet consec tetur adipiscing elit",
    tone: "error",
    device: "desktop",
    onClose: fn(),
    action: (
      <Button variant="secondary" size="small" tone="neutral">
        Label
      </Button>
    ),
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
        "inverse-neutral",
        "inverse-brand",
      ],
    },
    device: {
      control: "select",
      options: ["desktop", "mobile"],
    },
  },
} satisfies Meta<typeof AlertGlobal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    await expect(args.onClose).toHaveBeenCalled();
  },
};

export const Mobile: Story = {
  args: {
    device: "mobile",
  },
};

export const AllTones: Story = {
  render: (args) => (
    <div className="flex flex-col">
      {(
        [
          "error",
          "warning",
          "success",
          "information",
          "neutral",
          "brand",
          "inverse-neutral",
          "inverse-brand",
        ] as const
      ).map((tone) => (
        <AlertGlobal {...args} key={tone} tone={tone} />
      ))}
    </div>
  ),
};

export const DismissOnly: Story = {
  args: {
    action: undefined,
  },
};
