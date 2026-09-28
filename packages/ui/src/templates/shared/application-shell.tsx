"use client";

import * as React from "react";

import { Badge } from "../../atoms/badge/badge";
import { BadgeCount } from "../../atoms/badge-count/badge-count";
import { BadgeDot } from "../../atoms/badge-dot/badge-dot";
import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon, type FeatherIconName } from "../../atoms/icon/icon";
import { TextLink } from "../../atoms/text-link/text-link";
import { Breadcrumbs, type BreadcrumbItem } from "../../molecules/breadcrumbs/breadcrumbs";
import { SearchInput } from "../../molecules/search-input/search-input";
import {
  NavigationHeaderBar,
  NavigationHeaderRight,
  NavigationHeaderUser,
} from "../../organisms/navigation-header/navigation-header";
import {
  NavigationSide,
  NavigationSideBottom,
  NavigationSideClose,
  NavigationSideContent,
  NavigationSideItem,
  NavigationSideLogo,
  NavigationSideMobileHeader,
  NavigationSideSection,
  NavigationSideTop,
} from "../../organisms/navigation-side/navigation-side";
import { PracticalUiLogo } from "./practical-ui-logo";
import { TemplateUserMenu } from "./template-user-menu";

export type ApplicationNavItem = "home" | "teams" | "reports" | "calendar" | "favourites";

const navItems: {
  value: ApplicationNavItem;
  label: string;
  icon: FeatherIconName;
  badge?: React.ReactNode;
}[] = [
  { value: "home", label: "Home", icon: "home" },
  { value: "teams", label: "Teams", icon: "users" },
  {
    value: "reports",
    label: "Reports",
    icon: "pie-chart",
    badge: <BadgeCount emphasis="weak">8</BadgeCount>,
  },
  {
    value: "calendar",
    label: "Calendar",
    icon: "calendar",
    badge: (
      <Badge tone="brand" size="small">
        New
      </Badge>
    ),
  },
  { value: "favourites", label: "Favourites", icon: "heart" },
];

export interface ApplicationShellProps {
  children: React.ReactNode;
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  showMobileHeader?: boolean;
  pageTitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  banner?: React.ReactNode;
  defaultActiveNav?: ApplicationNavItem;
  userMenuDefaultOpen?: boolean;
}

export function ApplicationShell({
  children,
  sidebarOpen,
  defaultSidebarOpen = false,
  onSidebarOpenChange,
  showMobileHeader = true,
  pageTitle,
  breadcrumbs,
  banner,
  defaultActiveNav = "home",
  userMenuDefaultOpen,
}: ApplicationShellProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultSidebarOpen);
  const [activeNav, setActiveNav] = React.useState(defaultActiveNav);
  const currentOpen = sidebarOpen ?? internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (sidebarOpen === undefined) {
        setInternalOpen(next);
      }
      onSidebarOpenChange?.(next);
    },
    [onSidebarOpenChange, sidebarOpen],
  );

  const userMenu = <TemplateUserMenu defaultOpen={userMenuDefaultOpen} />;

  return (
    <div className="flex min-h-svh flex-col">
      {banner}
      <div className="flex flex-1 flex-col md:flex-row">
        {showMobileHeader ? (
          <NavigationSideMobileHeader
            logo={<PracticalUiLogo />}
            avatar={<TemplateUserMenu compact />}
            onMenuClick={() => setOpen(true)}
          />
        ) : null}
        <NavigationSide open={currentOpen} onOpenChange={setOpen}>
          <NavigationSideTop>
            <NavigationSideClose />
            <NavigationSideLogo>
              <PracticalUiLogo />
            </NavigationSideLogo>
            <NavigationSideSection>
              <SearchInput aria-label="Search navigation" placeholder="Search" />
            </NavigationSideSection>
          </NavigationSideTop>
          <NavigationSideContent>
            {navItems.map((item) => (
              <NavigationSideItem
                key={item.value}
                href={`#${item.value}`}
                icon={<FeatherIcon name={item.icon} size={24} />}
                badge={item.badge}
                selected={activeNav === item.value}
                onClick={() => setActiveNav(item.value)}
              >
                {item.label}
              </NavigationSideItem>
            ))}
          </NavigationSideContent>
          <NavigationSideBottom>
            <NavigationSideSection className="w-full items-start">
              <div className="flex w-full flex-col items-start gap-2 rounded-lg border border-stroke-weak bg-fill-weaker p-4">
                <div className="flex w-full flex-col gap-1">
                  <p className="text-tiny font-semibold text-fg-strong">
                    Upgrade for more features
                  </p>
                  <p className="text-tiny text-fg-weak">
                    Access unlimited reports, team members, and scheduling.
                  </p>
                </div>
                <TextLink href="#learn-more" size="tiny" tone="neutral-strong">
                  Learn more
                </TextLink>
              </div>
            </NavigationSideSection>
          </NavigationSideBottom>
        </NavigationSide>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <NavigationHeaderBar
            className={breadcrumbs ? "justify-between px-4 md:px-8" : "justify-end px-4 md:px-8"}
          >
            {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="max-md:hidden" /> : null}
            <NavigationHeaderRight>
              <div className="flex shrink-0 items-center gap-0">
                <ButtonIcon
                  aria-label="Help"
                  icon={<FeatherIcon name="help-circle" size={24} />}
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
                  <BadgeDot type="notification" size="small" className="absolute right-2 top-2" />
                </span>
              </div>
              <NavigationHeaderUser className="max-md:hidden" desktop={userMenu} />
            </NavigationHeaderRight>
          </NavigationHeaderBar>
          <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-fill-weaker">
            {pageTitle ? (
              <header className="border-b border-stroke-weak bg-fill-inverse px-4 py-4 md:px-8 md:py-6">
                <h1 className="text-heading-2 font-semibold text-fg-strong">{pageTitle}</h1>
              </header>
            ) : null}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
