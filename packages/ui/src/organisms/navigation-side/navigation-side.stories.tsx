import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { Avatar } from "../../atoms/avatar/avatar";
import { Badge } from "../../atoms/badge/badge";
import { BadgeCount } from "../../atoms/badge-count/badge-count";
import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { Slot } from "../../atoms/slot/slot";
import { SearchInput } from "../../molecules/search-input/search-input";
import { AvatarDropdown } from "../avatar-dropdown/avatar-dropdown";
import {
  NavigationSide,
  NavigationSideBottom,
  NavigationSideClose,
  NavigationSideContent,
  NavigationSideDivider,
  NavigationSideHeader,
  NavigationSideItem,
  NavigationSideLogo,
  NavigationSideMobileHeader,
  NavigationSideSection,
  NavigationSideTop,
} from "./navigation-side";

const photoSrc =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" fill="#c9a07a"/>
      <circle cx="48" cy="38" r="16" fill="#e8c4a0"/>
      <ellipse cx="48" cy="92" rx="28" ry="32" fill="#3f4a5c"/>
    </svg>`,
  );

const navIcon = <FeatherIcon name="layers" size={24} />;

const meta = {
  title: "Organisms/NavigationSide",
  component: NavigationSide,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onOpenChange: fn(),
  },
  argTypes: {
    open: { control: false },
    defaultOpen: { control: false },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function PracticalLogo() {
  return (
    <span className="text-heading-4 font-semibold text-fg-strong">
      Practical<span className="text-primary">UI</span>
    </span>
  );
}

function NavigationSideExample({
  defaultOpen = false,
  showMobileHeader = false,
}: {
  defaultOpen?: boolean;
  showMobileHeader?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [activeHref, setActiveHref] = React.useState("/home");

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {showMobileHeader ? (
        <NavigationSideMobileHeader
          logo={<PracticalLogo />}
          avatar={
            <Avatar name="John Smith" src={photoSrc} alt="John Smith" size="small" />
          }
          onMenuClick={() => setOpen(true)}
        />
      ) : null}
      <NavigationSide open={open} onOpenChange={setOpen}>
        <NavigationSideTop>
          <NavigationSideClose />
          <NavigationSideLogo>
            <PracticalLogo />
          </NavigationSideLogo>
          <NavigationSideSection>
            <SearchInput aria-label="Search navigation" />
          </NavigationSideSection>
        </NavigationSideTop>
        <NavigationSideContent>
          <NavigationSideItem
            href="/home"
            icon={navIcon}
            selected={activeHref === "/home"}
            onClick={() => setActiveHref("/home")}
          >
            Home
          </NavigationSideItem>
          <NavigationSideItem
            href="/projects"
            icon={navIcon}
            selected={activeHref === "/projects"}
            badge={<BadgeCount emphasis="weak">8</BadgeCount>}
            onClick={() => setActiveHref("/projects")}
          >
            Projects
          </NavigationSideItem>
          <NavigationSideItem
            href="/reports"
            icon={navIcon}
            selected={activeHref === "/reports"}
            badge={
              <Badge tone="brand" size="small" icon={<FeatherIcon name="zap" size={16} />}>
                New
              </Badge>
            }
            onClick={() => setActiveHref("/reports")}
          >
            Reports
          </NavigationSideItem>
          <NavigationSideItem
            href="/team"
            icon={navIcon}
            selected={activeHref === "/team"}
            onClick={() => setActiveHref("/team")}
          >
            Team
          </NavigationSideItem>
          <NavigationSideItem
            href="/calendar"
            icon={navIcon}
            selected={activeHref === "/calendar"}
            onClick={() => setActiveHref("/calendar")}
          >
            Calendar
          </NavigationSideItem>
          <NavigationSideDivider />
          <NavigationSideHeader>Workspace</NavigationSideHeader>
          <NavigationSideItem
            href="/docs"
            icon={navIcon}
            selected={activeHref === "/docs"}
            onClick={() => setActiveHref("/docs")}
          >
            Docs
          </NavigationSideItem>
          <NavigationSideItem
            href="/support"
            icon={navIcon}
            selected={activeHref === "/support"}
            onClick={() => setActiveHref("/support")}
          >
            Support
          </NavigationSideItem>
        </NavigationSideContent>
        <NavigationSideBottom>
          <NavigationSideItem
            href="/settings"
            icon={navIcon}
            selected={activeHref === "/settings"}
            onClick={() => setActiveHref("/settings")}
          >
            Settings
          </NavigationSideItem>
          <NavigationSideItem
            href="/billing"
            icon={navIcon}
            selected={activeHref === "/billing"}
            onClick={() => setActiveHref("/billing")}
          >
            Billing
          </NavigationSideItem>
          <NavigationSideItem
            href="/help"
            icon={navIcon}
            selected={activeHref === "/help"}
            onClick={() => setActiveHref("/help")}
          >
            Help
          </NavigationSideItem>
          <NavigationSideSection>
            <div className="rounded-lg border border-stroke-weak bg-fill-weaker p-4">
              <p className="text-tiny font-semibold text-fg-strong">Heading</p>
              <p className="text-tiny text-fg-weak">
                Lorem ipsum dolor sit amet, consec tetur adipiscing elit.
              </p>
            </div>
          </NavigationSideSection>
          <NavigationSideSection>
            <Button className="w-full">Upgrade</Button>
          </NavigationSideSection>
          <NavigationSideSection>
            <Slot />
          </NavigationSideSection>
          <NavigationSideSection>
            <AvatarDropdown
              variant="navigation"
              name="John Smith"
              description="john@practical-ui.com"
              src={photoSrc}
              size="medium"
            />
          </NavigationSideSection>
        </NavigationSideBottom>
      </NavigationSide>
      <main className="flex flex-1 items-center justify-center bg-fill-weaker p-8">
        <p className="text-small text-fg-weak">Main content area</p>
      </main>
    </div>
  );
}

export const Desktop: Story = {
  render: () => <NavigationSideExample />,
  play: async () => {
    const nav = await within(document.body).findByRole("navigation", {
      name: "Main",
    });
    await expect(nav).toBeVisible();
    await expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};

export const MobileClosed: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <NavigationSideExample showMobileHeader />,
};

export const MobileOpen: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <NavigationSideExample defaultOpen showMobileHeader />,
  play: async () => {
    const nav = await within(document.body).findByRole("navigation", {
      name: "Main",
    });
    await expect(nav).toBeVisible();
    await expect(
      within(document.body).getByRole("button", { name: "Close navigation" }),
    ).toBeVisible();
  },
};
