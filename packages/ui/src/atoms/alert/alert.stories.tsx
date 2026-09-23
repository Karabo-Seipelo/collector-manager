import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Button } from "../button/button";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import { Alert } from "./alert";

const meta = {
  title: "Atoms/Alert",
  component: Alert,
  args: {
    heading: "Heading",
    children:
      "Lorem ipsum dolor sit amet, con sectetur adipiscing elit dolor sit. Lorem ipsum dolor sit amet elit.",
    tone: "error",
    size: "large",
    layout: "horizontal",
    onClose: fn(),
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
    size: {
      control: "select",
      options: ["large", "small"],
    },
    layout: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Alert>;

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

export const Small: Story = {
  args: {
    size: "small",
    children: "Lorem ipsum dolor sit amet, consec tetur adipiscing elit.",
  },
};

export const Vertical: Story = {
  args: {
    layout: "vertical",
  },
};

export const AllTones: Story = {
  render: (args) => (
    <div className="flex max-w-[600px] flex-col gap-4">
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
        <Alert {...args} key={tone} tone={tone} />
      ))}
    </div>
  ),
};

export const WithFooter: Story = {
  args: {
    tone: "neutral",
    footer: (
      <ButtonGroup size="small" tone="neutral">
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </ButtonGroup>
    ),
  },
};
