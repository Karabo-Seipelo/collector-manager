import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Button } from "../../atoms/button/button";
import { Tag } from "../../atoms/tag/tag";
import { AvatarStack } from "../../molecules/avatar-stack/avatar-stack";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import { Rating } from "../../molecules/rating/rating";
import { withWidth } from "../../../.storybook/decorators";
import { Hero, HeroEmailSignup } from "./hero";

const title = "Lorem ipsum dolor sit amet tetur elit";
const description =
  "Lorem ipsum dolor sit amet, con sec tetur adipiscing elit dolor sit. Donec rutrum, tellus sed fringilla rhoncus.";

const photo = (fill: string) =>
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" fill="${fill}"/>
      <circle cx="48" cy="38" r="16" fill="#e8c4a0"/>
      <ellipse cx="48" cy="92" rx="28" ry="32" fill="#3f4a5c"/>
    </svg>`,
  );

const people = [
  { name: "Ada Lovelace", src: photo("#c9a07a") },
  { name: "Alan Turing", src: photo("#8d6e4c") },
  { name: "Grace Hopper", src: photo("#d4b896") },
  { name: "Katherine Johnson", src: photo("#a67c52") },
  { name: "Donald Knuth", src: photo("#b08968") },
];

const heroMediaGradient =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5c99a"/>
          <stop offset="100%" stop-color="#8b5e83"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)"/>
    </svg>`,
  );

function HeroMedia({ alt = "Hero illustration" }: { alt?: string }) {
  return (
    <img
      src={heroMediaGradient}
      alt={alt}
      className="block h-full w-full object-cover"
    />
  );
}

function HeroActions() {
  return (
    <ButtonGroup size="large">
      <Button>Buy now</Button>
      <Button>Free preview</Button>
    </ButtonGroup>
  );
}

function HeroSocialProof() {
  return (
    <div className="flex items-center gap-4">
      <AvatarStack people={people} max={5} />
      <Rating value={3.5} layout="vertical" />
    </div>
  );
}

const sharedArgs = {
  title,
  description,
  media: <HeroMedia />,
  actions: <HeroActions />,
  socialProof: <HeroSocialProof />,
};

const meta = {
  title: "Organisms/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Marketing hero section with five layout variants. Compose optional email signup, CTAs, and social proof via slots.",
      },
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    ...sharedArgs,
    layout: "horizontal",
    emailSignup: <HeroEmailSignup />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { level: 1, name: title }),
    ).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Buy now" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Subscribe" })).toBeVisible();
  },
};

export const HorizontalMobile: Story = {
  ...Horizontal,
  decorators: [withWidth("375px")],
};

export const HorizontalPadded: Story = {
  args: {
    ...sharedArgs,
    layout: "horizontal-padded",
    emailSignup: <HeroEmailSignup />,
  },
};

export const Vertical: Story = {
  args: {
    ...sharedArgs,
    layout: "vertical",
    emailSignup: <HeroEmailSignup />,
  },
};

export const VerticalLarge: Story = {
  args: {
    ...sharedArgs,
    layout: "vertical-large",
    emailSignup: <HeroEmailSignup />,
  },
};

export const VerticalSmall: Story = {
  args: {
    ...sharedArgs,
    layout: "vertical-small",
    emailSignup: <HeroEmailSignup />,
  },
};

export const WithEyebrowAndTag: Story = {
  args: {
    ...sharedArgs,
    layout: "horizontal-padded",
    eyebrow: "Label",
    tag: <Tag>Label</Tag>,
    emailSignup: undefined,
  },
};

export const Minimal: Story = {
  args: {
    layout: "horizontal",
    title,
    description,
    media: <HeroMedia />,
  },
};
