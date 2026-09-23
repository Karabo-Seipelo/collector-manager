import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon } from "../../atoms/icon/icon";
import {
  Tooltip,
  TooltipBubble,
  TooltipContent,
  TooltipTrigger,
  type TooltipPlacement,
} from "./tooltip";

const smallPlacements: TooltipPlacement[] = [
  "bottom-left",
  "bottom-right",
  "bottom-center",
  "left",
  "right",
];

const largeBody =
  "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Lorem ipsum dolor sit amet, consec tetur adipiscing elit.";

const meta = {
  title: "Molecules/Tooltip",
  component: TooltipBubble,
  args: {
    children: "Lorem ipsum dolor",
    placement: "bottom-left" as TooltipPlacement,
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dark inverse tooltip bubble with directional arrow, available in small and large sizes.",
      },
    },
  },
} satisfies Meta<typeof TooltipBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallBottomLeft: Story = {
  args: {
    placement: "bottom-left",
    children: "Lorem ipsum dolor",
  },
};

export const SmallVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      {smallPlacements.map((placement) => (
        <TooltipBubble key={placement} placement={placement}>
          Lorem ipsum dolor
        </TooltipBubble>
      ))}
    </div>
  ),
};

export const LargeBottomLeft: Story = {
  args: {
    size: "large",
    placement: "bottom-left",
    heading: "Lorem ipsum dolor",
    children: largeBody,
  },
};

export const LargeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      {(
        [
          "bottom-left",
          "bottom-right",
          "bottom-center",
          "left",
          "right",
        ] as TooltipPlacement[]
      ).map((placement) => (
        <TooltipBubble
          key={placement}
          size="large"
          placement={placement}
          heading="Lorem ipsum dolor"
        >
          {largeBody}
        </TooltipBubble>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Tooltip placement="bottom-center">
      <TooltipTrigger>
        <ButtonIcon
          type="button"
          aria-label="More information"
          variant="tertiary"
          tone="neutral"
          size="medium"
          icon={<FeatherIcon name="info" size={24} />}
        />
      </TooltipTrigger>
      <TooltipContent>Lorem ipsum dolor</TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole("button", { name: "More information" }));
    await expect(canvas.getByRole("tooltip")).toHaveTextContent("Lorem ipsum dolor");
  },
};

export const InteractiveLarge: Story = {
  render: () => (
    <Tooltip placement="top-center" size="large">
      <TooltipTrigger>
        <button
          type="button"
          className="rounded-lg border border-stroke-weak px-4 py-2 text-small text-fg-strong"
        >
          Hover for details
        </button>
      </TooltipTrigger>
      <TooltipContent heading="Lorem ipsum dolor">{largeBody}</TooltipContent>
    </Tooltip>
  ),
};
