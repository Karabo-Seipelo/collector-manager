import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { Avatar } from "../../atoms/avatar/avatar";
import { BadgeCount } from "../../atoms/badge-count/badge-count";
import { Button } from "../../atoms/button/button";
import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { BadgeDot } from "../../atoms/badge-dot/badge-dot";
import { FeatherIcon } from "../../atoms/icon/icon";
import { Breadcrumbs } from "../../molecules/breadcrumbs/breadcrumbs";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import { SearchInput } from "../../molecules/search-input/search-input";
import { AvatarLabelled } from "../../molecules/avatar-labelled/avatar-labelled";
import { AvatarDropdown } from "../avatar-dropdown/avatar-dropdown";
import {
  NavigationHeader,
  NavigationHeaderActions,
  NavigationHeaderBar,
  NavigationHeaderButtons,
  NavigationHeaderItem,
  NavigationHeaderLeft,
  NavigationHeaderLogo,
  NavigationHeaderMobileDivider,
  NavigationHeaderMobileDrawer,
  NavigationHeaderMobileFooter,
  NavigationHeaderMobileHeader,
  NavigationHeaderMobileItem,
  NavigationHeaderMobileNav,
  NavigationHeaderMobileProfile,
  NavigationHeaderMobileSearch,
  NavigationHeaderNav,
  NavigationHeaderRight,
  NavigationHeaderSearch,
  NavigationHeaderUser,
} from "./navigation-header";

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
  title: "Organisms/NavigationHeader",
  component: NavigationHeader,
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

const navItems = [
  { href: "/home", label: "Home" },
  { href: "/projects", label: "Projects", badge: <BadgeCount emphasis="weak">8</BadgeCount> },
  { href: "/reports", label: "Reports" },
  { href: "/team", label: "Team" },
  { href: "/calendar", label: "Calendar" },
];

function NavigationHeaderShell({
  defaultOpen = false,
  bar,
  withSearch = false,
}: {
  defaultOpen?: boolean;
  bar: React.ReactNode;
  withSearch?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [activeHref, setActiveHref] = React.useState("/home");

  return (
    <div className="min-h-screen bg-fill-weaker">
      <NavigationHeader open={open} onOpenChange={setOpen}>
        {bar}
        <NavigationHeaderMobileDrawer>
          <NavigationHeaderMobileHeader />
          {withSearch ? (
            <NavigationHeaderMobileSearch>
              <SearchInput aria-label="Search navigation" />
            </NavigationHeaderMobileSearch>
          ) : null}
          <NavigationHeaderMobileNav>
            {navItems.map((item) => (
              <NavigationHeaderMobileItem
                key={item.href}
                href={item.href}
                selected={activeHref === item.href}
                onClick={() => setActiveHref(item.href)}
              >
                {item.label}
              </NavigationHeaderMobileItem>
            ))}
            <NavigationHeaderMobileDivider />
            <NavigationHeaderMobileItem href="/help" icon={navIcon}>
              Help
            </NavigationHeaderMobileItem>
            <NavigationHeaderMobileItem href="/settings" icon={navIcon}>
              Settings
            </NavigationHeaderMobileItem>
          </NavigationHeaderMobileNav>
          <NavigationHeaderMobileFooter>
            <ButtonGroup
              aria-label="Mobile actions"
              layout="vertical"
              size="large"
              className="w-full"
            >
              <Button variant="secondary">Secondary</Button>
              <Button>Primary</Button>
            </ButtonGroup>
            <NavigationHeaderMobileProfile>
              <AvatarLabelled
                name="John Smith"
                description="john@practical-ui.com"
                src={photoSrc}
                size="medium"
              />
            </NavigationHeaderMobileProfile>
          </NavigationHeaderMobileFooter>
        </NavigationHeaderMobileDrawer>
      </NavigationHeader>
      <main className="p-8">
        <p className="text-small text-fg-weak">Main content area</p>
      </main>
    </div>
  );
}

function NavLinks({
  activeHref,
  onNavigate,
}: {
  activeHref: string;
  onNavigate: (href: string) => void;
}) {
  return (
    <>
      {navItems.map((item) => (
        <NavigationHeaderItem
          key={item.href}
          href={item.href}
          selected={activeHref === item.href}
          badge={item.badge}
          onClick={() => onNavigate(item.href)}
        >
          {item.label}
        </NavigationHeaderItem>
      ))}
    </>
  );
}

function DesktopWithButtonsExample() {
  const [activeHref, setActiveHref] = React.useState("/home");

  return (
    <NavigationHeaderShell
      bar={
        <NavigationHeaderBar>
          <NavigationHeaderLeft>
            <NavigationHeaderLogo>
              <PracticalLogo />
            </NavigationHeaderLogo>
            <NavigationHeaderNav>
              <NavLinks activeHref={activeHref} onNavigate={setActiveHref} />
            </NavigationHeaderNav>
          </NavigationHeaderLeft>
          <NavigationHeaderRight>
            <NavigationHeaderButtons>
              <ButtonGroup aria-label="Header actions" size="small" className="gap-2">
                <Button variant="secondary">Secondary</Button>
                <Button>Primary</Button>
              </ButtonGroup>
            </NavigationHeaderButtons>
          </NavigationHeaderRight>
        </NavigationHeaderBar>
      }
    />
  );
}

function DesktopWithAvatarExample() {
  const [activeHref, setActiveHref] = React.useState("/home");

  return (
    <NavigationHeaderShell
      bar={
        <NavigationHeaderBar>
          <NavigationHeaderLeft>
            <NavigationHeaderLogo>
              <PracticalLogo />
            </NavigationHeaderLogo>
            <NavigationHeaderNav>
              <NavLinks activeHref={activeHref} onNavigate={setActiveHref} />
            </NavigationHeaderNav>
          </NavigationHeaderLeft>
          <NavigationHeaderRight>
            <NavigationHeaderUser
              desktop={
                <AvatarDropdown name="John Smith" src={photoSrc} size="small" />
              }
              mobile={
                <Avatar
                  name="John Smith"
                  src={photoSrc}
                  alt="John Smith"
                  size="small"
                />
              }
            />
          </NavigationHeaderRight>
        </NavigationHeaderBar>
      }
    />
  );
}

function BreadcrumbsWithIconsExample() {
  return (
    <NavigationHeaderShell
      bar={
        <NavigationHeaderBar>
          <NavigationHeaderLeft>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: "Settings", href: "/settings" },
              ]}
            />
          </NavigationHeaderLeft>
          <NavigationHeaderRight>
            <NavigationHeaderActions>
              <ButtonIcon
                aria-label="Help"
                icon={<FeatherIcon name="help-circle" size={24} />}
                variant="tertiary"
                tone="neutral"
              />
              <ButtonIcon
                aria-label="Settings"
                icon={<FeatherIcon name="settings" size={24} />}
                variant="tertiary"
                tone="neutral"
              />
              <span className="relative inline-flex">
                <ButtonIcon
                  aria-label="Notifications"
                  icon={<FeatherIcon name="bell" size={24} />}
                  variant="tertiary"
                  tone="neutral"
                />
                <BadgeDot
                  type="notification"
                  size="small"
                  className="absolute right-2 top-2"
                />
              </span>
            </NavigationHeaderActions>
            <NavigationHeaderUser
              desktop={
                <AvatarDropdown name="John Smith" src={photoSrc} size="small" />
              }
              mobile={
                <Avatar
                  name="John Smith"
                  src={photoSrc}
                  alt="John Smith"
                  size="small"
                />
              }
            />
          </NavigationHeaderRight>
        </NavigationHeaderBar>
      }
    />
  );
}

function FullDesktopExample() {
  const [activeHref, setActiveHref] = React.useState("/home");

  return (
    <NavigationHeaderShell
      withSearch
      bar={
        <NavigationHeaderBar>
          <NavigationHeaderLeft>
            <NavigationHeaderLogo>
              <PracticalLogo />
            </NavigationHeaderLogo>
            <NavigationHeaderNav>
              <NavLinks activeHref={activeHref} onNavigate={setActiveHref} />
            </NavigationHeaderNav>
          </NavigationHeaderLeft>
          <NavigationHeaderRight>
            <NavigationHeaderSearch>
              <SearchInput size="small" aria-label="Search" />
            </NavigationHeaderSearch>
            <NavigationHeaderActions>
              <ButtonIcon
                aria-label="Help"
                icon={<FeatherIcon name="help-circle" size={24} />}
                variant="tertiary"
                tone="neutral"
              />
              <ButtonIcon
                aria-label="Settings"
                icon={<FeatherIcon name="settings" size={24} />}
                variant="tertiary"
                tone="neutral"
              />
              <span className="relative inline-flex">
                <ButtonIcon
                  aria-label="Notifications"
                  icon={<FeatherIcon name="bell" size={24} />}
                  variant="tertiary"
                  tone="neutral"
                />
                <BadgeDot
                  type="notification"
                  size="small"
                  className="absolute right-2 top-2"
                />
              </span>
            </NavigationHeaderActions>
            <NavigationHeaderButtons>
              <ButtonGroup aria-label="Header actions" size="small" className="gap-2">
                <Button variant="secondary">Secondary</Button>
                <Button>Primary</Button>
              </ButtonGroup>
            </NavigationHeaderButtons>
            <NavigationHeaderUser
              desktop={
                <AvatarDropdown name="John Smith" src={photoSrc} size="small" />
              }
              mobile={
                <Avatar
                  name="John Smith"
                  src={photoSrc}
                  alt="John Smith"
                  size="small"
                />
              }
            />
          </NavigationHeaderRight>
        </NavigationHeaderBar>
      }
    />
  );
}

export const DesktopWithButtons: Story = {
  render: () => <DesktopWithButtonsExample />,
  play: async () => {
    const header = await within(document.body).findByTestId(
      "navigation-header-bar",
    );
    await expect(header).toBeVisible();
    await expect(
      within(header).getByRole("link", { name: "Home" }),
    ).toHaveAttribute("aria-current", "page");
  },
};

export const DesktopWithAvatar: Story = {
  render: () => <DesktopWithAvatarExample />,
};

export const BreadcrumbsWithIcons: Story = {
  render: () => <BreadcrumbsWithIconsExample />,
};

export const FullDesktop: Story = {
  render: () => <FullDesktopExample />,
};

export const MobileClosed: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <DesktopWithAvatarExample />,
};

export const MobileOpen: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => {
    const [activeHref, setActiveHref] = React.useState("/home");
    const [open, setOpen] = React.useState(true);

    return (
      <div className="min-h-screen bg-fill-weaker">
        <NavigationHeader open={open} onOpenChange={setOpen}>
          <NavigationHeaderBar>
            <NavigationHeaderLeft>
              <NavigationHeaderLogo>
                <PracticalLogo />
              </NavigationHeaderLogo>
              <NavigationHeaderNav>
                <NavLinks activeHref={activeHref} onNavigate={setActiveHref} />
              </NavigationHeaderNav>
            </NavigationHeaderLeft>
            <NavigationHeaderRight>
              <NavigationHeaderUser
                mobile={
                  <Avatar
                    name="John Smith"
                    src={photoSrc}
                    alt="John Smith"
                    size="small"
                  />
                }
                desktop={
                  <AvatarDropdown name="John Smith" src={photoSrc} size="small" />
                }
              />
            </NavigationHeaderRight>
          </NavigationHeaderBar>
          <NavigationHeaderMobileDrawer>
            <NavigationHeaderMobileHeader />
            <NavigationHeaderMobileNav>
              {navItems.map((item) => (
                <NavigationHeaderMobileItem
                  key={item.href}
                  href={item.href}
                  selected={activeHref === item.href}
                  onClick={() => setActiveHref(item.href)}
                >
                  {item.label}
                </NavigationHeaderMobileItem>
              ))}
            </NavigationHeaderMobileNav>
            <NavigationHeaderMobileFooter>
              <ButtonGroup
                aria-label="Mobile actions"
                layout="vertical"
                size="large"
                className="w-full"
              >
                <Button variant="secondary">Secondary</Button>
                <Button>Primary</Button>
              </ButtonGroup>
              <NavigationHeaderMobileProfile>
                <AvatarLabelled
                  name="John Smith"
                  description="john@practical-ui.com"
                  src={photoSrc}
                  size="medium"
                />
              </NavigationHeaderMobileProfile>
            </NavigationHeaderMobileFooter>
          </NavigationHeaderMobileDrawer>
        </NavigationHeader>
      </div>
    );
  },
  play: async () => {
    const drawer = await within(document.body).findByTestId(
      "navigation-header-mobile-drawer",
    );
    await expect(drawer).toBeVisible();
    await expect(
      within(document.body).getByRole("button", {
        name: "Close navigation menu",
      }),
    ).toBeVisible();
  },
};
