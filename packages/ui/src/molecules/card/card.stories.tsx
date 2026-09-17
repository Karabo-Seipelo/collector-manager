import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { withWidth } from "../../../.storybook/decorators";
import { ItemCard } from "./card";

const cardWidth = withWidth("220px");

const meta = {
  title: "Molecules/ItemCard",
  component: ItemCard,
  args: {
    title: "Kind of Blue",
    meta: ["Vinyl", "1959", "NM"],
    price: "$120.00",
  },
} satisfies Meta<typeof ItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [cardWidth],
};

export const TitleOnly: Story = {
  decorators: [cardWidth],
  args: {
    meta: undefined,
    price: undefined,
  },
};

export const WithImage: Story = {
  tags: ["!test"],
  decorators: [cardWidth],
  args: {
    title: "Leica M6",
    meta: "Mint condition, 1984, Excellent",
    price: "$2,400.00",
    imageSrc:
      "https://images.unsplash.com/photo-1526170375881-4d8ecf77b99f?w=400&h=300&fit=crop",
    imageAlt: "Leica M6 camera",
  },
};

export const Clickable: Story = {
  decorators: [cardWidth],
  args: {
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const WithOverlay: Story = {
  tags: ["!test"],
  decorators: [cardWidth],
  args: {
    imageSrc:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    imageAlt: "Polaroid camera",
    overlay: (
      <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-fg-strong shadow-sm">
        New
      </span>
    ),
  },
};

export const MetaAsArray: Story = {
  decorators: [cardWidth],
  args: {
    title: "Abbey Road",
    meta: ["Vinyl", "1969", "VG+"],
    price: "$85.00",
  },
};

export const MetaAsCommaSeparated: Story = {
  decorators: [cardWidth],
  args: {
    title: "Blue Train",
    meta: "Vinyl, 1959, NM",
    price: "$95.00",
  },
};

export const Grid: Story = {
  tags: ["!test"],
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="grid w-full max-w-[680px] grid-cols-3 gap-4">
      <ItemCard
        title="Film camera"
        meta={["Vinyl", "1972", "NM"]}
        price="$85.00"
      />
      <ItemCard
        title="Digital SLR"
        meta="Digital, 2018, Like new"
        price="$420.00"
        imageSrc="https://images.unsplash.com/photo-1510127034890-ba275a4ea9a4?w=400&h=300&fit=crop"
        imageAlt="Digital SLR"
      />
      <ItemCard
        title="Instant camera"
        meta={["Instant", "1990", "Good"]}
        price="$65.00"
        onClick={() => undefined}
      />
    </div>
  ),
};
