import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { FeatherIcon } from "../../atoms/icon/icon";
import { withWidth } from "../../../.storybook/decorators";
import { Footer } from "./footer";

function PracticalUILogo() {
  return (
    <span className="inline-flex items-baseline gap-1 font-semibold">
      <span className="text-heading-4 text-fg-strong">Practical</span>
      <span className="rounded border border-stroke-brand-strong bg-fill-brand-weak px-1.5 py-0.5 text-small text-primary">
        UI
      </span>
    </span>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    href: "#instagram",
    icon: <FeatherIcon name="instagram" size={24} />,
  },
  {
    label: "Facebook",
    href: "#facebook",
    icon: <FeatherIcon name="facebook" size={24} />,
  },
  {
    label: "LinkedIn",
    href: "#linkedin",
    icon: <FeatherIcon name="linkedin" size={24} />,
  },
  {
    label: "X",
    href: "#x",
    icon: <FeatherIcon name="twitter" size={24} />,
  },
  {
    label: "YouTube",
    href: "#youtube",
    icon: <FeatherIcon name="youtube" size={24} />,
  },
];

const navLinks = Array.from({ length: 5 }, (_, index) => ({
  label: "Label",
  href: `#link-${index + 1}`,
}));

const columns = Array.from({ length: 5 }, (_, index) => ({
  title: "Topic",
  links: Array.from({ length: 5 }, (_, linkIndex) => ({
    label: "Label",
    href: `#topic-${index + 1}-${linkIndex + 1}`,
  })),
}));

const meta = {
  title: "Organisms/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Site footer with small and large layouts. Responsive padding and column stacking follow the Practical UI spec across desktop, tablet, and mobile.",
      },
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "small",
    logo: <PracticalUILogo />,
    copyright: "© 2024 Practical UI",
    navLinks,
    socialLinks,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("contentinfo")).toBeVisible();
    await expect(canvas.getAllByRole("link", { name: "Label" })).toHaveLength(5);
  },
};

export const SmallMobile: Story = {
  ...Small,
  decorators: [withWidth("375px")],
};

export const SmallTablet: Story = {
  ...Small,
  decorators: [withWidth("768px")],
};

export const Large: Story = {
  args: {
    size: "large",
    logo: <PracticalUILogo />,
    description:
      "Lorem ipsum dolor sit amet, consec tetur adipiscing elit etiam finibus blan dit.",
    copyright: "© 2024 Practical UI",
    columns,
    socialLinks,
  },
};

export const LargeMobile: Story = {
  ...Large,
  decorators: [withWidth("375px")],
};

export const LargeTablet: Story = {
  ...Large,
  decorators: [withWidth("768px")],
};
