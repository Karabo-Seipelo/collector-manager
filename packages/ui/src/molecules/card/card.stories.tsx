import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { IconContainer } from "../../atoms/icon-container/icon-container";
import { ImagePlaceholder } from "../../atoms/image-placeholder/image-placeholder";
import { FeatherIcon } from "../../atoms/icon/icon";
import { Slot } from "../../atoms/slot/slot";
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
        {showSlot ? <Slot /> : null}
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

export const CompactImage: Story = {
  render: () => (
    <div className="w-[204px]">
      <Card className="rounded-xl shadow-none hover:shadow-raised active:shadow-raised">
        <CardImage className="flex aspect-[204/190] h-auto items-center justify-center border-b-0">
          <ImagePlaceholder size={30} />
        </CardImage>
        <CardContent className="gap-1 p-0 pt-2.5">
          <h3 className="truncate text-small font-semibold leading-6 text-fg-strong">
            Kind of Blue
          </h3>
          <p className="truncate text-tiny leading-5 text-fg-weak">Vinyl · 1959 · NM</p>
          <p className="truncate text-tiny leading-5 text-fg-strong">R 3 400</p>
        </CardContent>
      </Card>
    </div>
  ),
};
