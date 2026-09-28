"use client";

import * as React from "react";

import { Avatar } from "../../atoms/avatar/avatar";
import { Badge } from "../../atoms/badge/badge";
import { BadgeCount } from "../../atoms/badge-count/badge-count";
import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { Slot } from "../../atoms/slot/slot";
import { SearchInput } from "../../molecules/search-input/search-input";
import { AvatarDropdown } from "../../organisms/avatar-dropdown/avatar-dropdown";
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
} from "../../organisms/navigation-side/navigation-side";
import { templatePhotoSrc } from "./mock-photo";
import { PracticalUiLogo } from "./practical-ui-logo";

const navIcon = <FeatherIcon name="layers" size={24} />;

export interface ApplicationShellProps {
  children: React.ReactNode;
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  showMobileHeader?: boolean;
  pageTitle?: string;
}

export function ApplicationShell({
  children,
  sidebarOpen,
  defaultSidebarOpen = false,
  onSidebarOpenChange,
  showMobileHeader = true,
  pageTitle,
}: ApplicationShellProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultSidebarOpen);
  const [activeHref, setActiveHref] = React.useState("/home");
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

  return (
    <div className="flex min-h-svh flex-col md:flex-row">
      {showMobileHeader ? (
        <NavigationSideMobileHeader
          logo={<PracticalUiLogo />}
          avatar={
            <Avatar name="John Smith" src={templatePhotoSrc} alt="John Smith" size="small" />
          }
          onMenuClick={() => setOpen(true)}
        />
      ) : null}
      <NavigationSide
        open={currentOpen}
        onOpenChange={(next) => {
          setOpen(next);
        }}
      >
        <NavigationSideTop>
          <NavigationSideClose />
          <NavigationSideLogo>
            <PracticalUiLogo />
          </NavigationSideLogo>
          <NavigationSideSection>
            <SearchInput aria-label="Search navigation" />
          </NavigationSideSection>
        </NavigationSideTop>
        <NavigationSideContent>
          <NavigationSideItem
            href="#home"
            icon={navIcon}
            selected={activeHref === "/home"}
            onClick={() => setActiveHref("/home")}
          >
            Home
          </NavigationSideItem>
          <NavigationSideItem
            href="#projects"
            icon={navIcon}
            selected={activeHref === "/projects"}
            badge={<BadgeCount emphasis="weak">8</BadgeCount>}
            onClick={() => setActiveHref("/projects")}
          >
            Projects
          </NavigationSideItem>
          <NavigationSideItem
            href="#reports"
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
            href="#team"
            icon={navIcon}
            selected={activeHref === "/team"}
            onClick={() => setActiveHref("/team")}
          >
            Team
          </NavigationSideItem>
          <NavigationSideItem
            href="#calendar"
            icon={navIcon}
            selected={activeHref === "/calendar"}
            onClick={() => setActiveHref("/calendar")}
          >
            Calendar
          </NavigationSideItem>
          <NavigationSideDivider />
          <NavigationSideHeader>Workspace</NavigationSideHeader>
          <NavigationSideItem
            href="#docs"
            icon={navIcon}
            selected={activeHref === "/docs"}
            onClick={() => setActiveHref("/docs")}
          >
            Docs
          </NavigationSideItem>
          <NavigationSideItem
            href="#support"
            icon={navIcon}
            selected={activeHref === "/support"}
            onClick={() => setActiveHref("/support")}
          >
            Support
          </NavigationSideItem>
        </NavigationSideContent>
        <NavigationSideBottom>
          <NavigationSideItem href="#settings" icon={navIcon}>
            Settings
          </NavigationSideItem>
          <NavigationSideItem href="#billing" icon={navIcon}>
            Billing
          </NavigationSideItem>
          <NavigationSideItem href="#help" icon={navIcon}>
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
              src={templatePhotoSrc}
              size="medium"
            />
          </NavigationSideSection>
        </NavigationSideBottom>
      </NavigationSide>
      <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-fill-weaker">
        {pageTitle ? (
          <header className="border-b border-stroke-weak bg-fill-inverse px-4 py-4 md:px-8 md:py-6">
            <h1 className="text-heading-2 font-semibold text-fg-strong">{pageTitle}</h1>
          </header>
        ) : null}
        {children}
      </main>
    </div>
  );
}
