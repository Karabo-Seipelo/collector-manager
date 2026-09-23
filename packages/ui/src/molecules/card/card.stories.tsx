import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { IconContainer } from "../../atoms/icon-container/icon-container";
import { FeatherIcon } from "../../atoms/icon/icon";
import { Tag } from "../../atoms/tag/tag";
import { AvatarLabelled } from "../avatar-labelled/avatar-labelled";
import { Card, CardContent, CardHeader, CardImage } from "./card";

const imageUrl =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop";

function TextLink() {
  return (
    <a
      href="#card-details"
      className="inline-flex items-center gap-2 text-small font-semibold text-fg-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus"
    >
      Label
      <FeatherIcon name="arrow-right" size={20} />
    </a>
  );
}

function Tags() {
  return (
    <div className="flex flex-wrap gap-1">
      <Tag size="small">Label</Tag>
      <Tag size="small">Label</Tag>
      <Tag size="small">Label</Tag>
    </div>
  );
}

function ExampleCard({
  orientation = "vertical",
  showImage = true,
  showIcon = false,
  showLink = false,
  showAvatar = false,
  showTags = false,
  showSlot = false,
}: {
  orientation?: "vertical" | "horizontal";
  showImage?: boolean;
  showIcon?: boolean;
  showLink?: boolean;
  showAvatar?: boolean;
  showTags?: boolean;
  showSlot?: boolean;
}) {
  return (
    <Card orientation={orientation}>
      {showImage ? (
        <CardImage>
          <img src={imageUrl} alt="Dunes beside a beach" />
        </CardImage>
      ) : null}
      <CardContent>
        <CardHeader
          icon={
            showIcon ? (
              <IconContainer
                tone="brand"
                icon={<FeatherIcon name="square" className="rotate-45" />}
              />
            ) : undefined
          }
          heading="Heading"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus blandit euismod."
        />
        {showLink ? <TextLink /> : null}
        {showAvatar ? (
          <AvatarLabelled
            name="John Smith"
            description="john@practical-ui.com"
          />
        ) : null}
        {showTags ? <Tags /> : null}
        {showSlot ? (
          <div className="w-full rounded-lg border border-dashed border-stroke-strong bg-fill-weaker px-8 py-6 text-center font-mono text-tiny text-fg-weak">
            Swap with another component
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

const meta = {
  title: "Molecules/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!test"],
  render: () => (
    <div className="w-[364px]">
      <ExampleCard
        showIcon
        showLink
        showAvatar
        showTags
        showSlot
      />
    </div>
  ),
};

export const TextOnly: Story = {
  render: () => (
    <div className="w-[364px]">
      <ExampleCard showImage={false} />
    </div>
  ),
};

export const Icon: Story = {
  render: () => (
    <div className="w-[364px]">
      <ExampleCard showImage={false} showIcon />
    </div>
  ),
};

export const IconWithTextLink: Story = {
  render: () => (
    <div className="w-[364px]">
      <ExampleCard showImage={false} showIcon showLink />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Label" });
    await userEvent.tab();
    await expect(link).toHaveFocus();
  },
};

export const ImageWithAvatar: Story = {
  tags: ["!test"],
  render: () => (
    <div className="w-[364px]">
      <ExampleCard showAvatar />
    </div>
  ),
};

export const ImageWithTags: Story = {
  tags: ["!test"],
  render: () => (
    <div className="w-[364px]">
      <ExampleCard showTags />
    </div>
  ),
};

export const ImageWithTextLink: Story = {
  tags: ["!test"],
  render: () => (
    <div className="w-[364px]">
      <ExampleCard showLink />
    </div>
  ),
};

export const Horizontal: Story = {
  tags: ["!test"],
  render: () => (
    <div className="w-[600px]">
      <ExampleCard
        orientation="horizontal"
        showIcon
        showLink
        showAvatar
        showTags
        showSlot
      />
    </div>
  ),
};
