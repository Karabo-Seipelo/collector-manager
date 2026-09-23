import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { Avatar } from "../../atoms/avatar/avatar";
import { BadgeCount } from "../../atoms/badge-count/badge-count";
import { Button } from "../../atoms/button/button";
import { Breadcrumbs } from "../../molecules/breadcrumbs/breadcrumbs";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import { SearchInput } from "../../molecules/search-input/search-input";
import { AvatarDropdown } from "../avatar-dropdown/avatar-dropdown";
import {
  NavigationHeader,
  NavigationHeaderBar,
  NavigationHeaderButtons,
  NavigationHeaderItem,
  NavigationHeaderLeft,
  NavigationHeaderLogo,
  NavigationHeaderMobileDrawer,
  NavigationHeaderMobileFooter,
  NavigationHeaderMobileHeader,
  NavigationHeaderMobileItem,
  NavigationHeaderMobileNav,
  NavigationHeaderNav,
  NavigationHeaderRight,
  NavigationHeaderSearch,
  NavigationHeaderUser,
} from "./navigation-header";

function renderNavigationHeader(
  props?: Partial<React.ComponentProps<typeof NavigationHeader>>,
) {
  const onOpenChange = vi.fn();
  render(
    <NavigationHeader open onOpenChange={onOpenChange} {...props}>
      <NavigationHeaderBar>
        <NavigationHeaderLeft>
          <NavigationHeaderLogo>
            <span>Practical UI</span>
          </NavigationHeaderLogo>
          <NavigationHeaderNav>
            <NavigationHeaderItem href="/home" selected>
              Home
            </NavigationHeaderItem>
            <NavigationHeaderItem
              href="/projects"
              badge={<BadgeCount emphasis="weak">8</BadgeCount>}
            >
              Projects
            </NavigationHeaderItem>
          </NavigationHeaderNav>
        </NavigationHeaderLeft>
        <NavigationHeaderRight>
          <NavigationHeaderSearch>
            <SearchInput size="small" aria-label="Search" />
          </NavigationHeaderSearch>
          <NavigationHeaderButtons>
            <ButtonGroup aria-label="Actions" size="small">
              <Button>Secondary</Button>
              <Button>Primary</Button>
            </ButtonGroup>
          </NavigationHeaderButtons>
          <NavigationHeaderUser
            desktop={
              <AvatarDropdown name="John Smith" src="/photo.jpg" size="small" />
            }
            mobile={
              <Avatar name="John Smith" src="/photo.jpg" alt="John Smith" size="small" />
            }
          />
        </NavigationHeaderRight>
      </NavigationHeaderBar>
      <NavigationHeaderMobileDrawer>
        <NavigationHeaderMobileHeader />
        <NavigationHeaderMobileNav>
          <NavigationHeaderMobileItem href="/home" selected>
            Home
          </NavigationHeaderMobileItem>
          <NavigationHeaderMobileItem href="/projects">
            Projects
          </NavigationHeaderMobileItem>
        </NavigationHeaderMobileNav>
        <NavigationHeaderMobileFooter>
          <ButtonGroup aria-label="Mobile actions" layout="vertical" size="large">
            <Button>Secondary</Button>
            <Button>Primary</Button>
          </ButtonGroup>
        </NavigationHeaderMobileFooter>
      </NavigationHeaderMobileDrawer>
    </NavigationHeader>,
  );
  return { onOpenChange };
}

describe("NavigationHeader", () => {
  it("renders the header bar with navigation and user menu", () => {
    renderNavigationHeader({ open: false });

    expect(screen.getByTestId("navigation-header-bar")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "John Smith" })).toBeInTheDocument();
  });

  it("applies selected item bottom border styles", () => {
    renderNavigationHeader({ open: false });

    expect(screen.getByRole("link", { name: "Home" })).toHaveClass(
      "border-primary",
      "-mb-px",
    );
  });

  it("shows the mobile drawer, overlay, and closes from overlay and Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    renderNavigationHeader({ onOpenChange });
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    expect(screen.getByTestId("navigation-header-mobile-drawer")).toHaveClass(
      "translate-x-0",
      "bg-fill-inverse",
    );
    expect(screen.getByTestId("navigation-header-overlay")).toHaveClass(
      "opacity-100",
    );

    await user.click(screen.getByTestId("navigation-header-overlay"));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("opens from the menu button and closes from the mobile close button", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <NavigationHeader onOpenChange={onOpenChange}>
        <NavigationHeaderBar>
          <NavigationHeaderLeft>
            <NavigationHeaderLogo>
              <span>Practical UI</span>
            </NavigationHeaderLogo>
          </NavigationHeaderLeft>
        </NavigationHeaderBar>
        <NavigationHeaderMobileDrawer>
          <NavigationHeaderMobileHeader />
        </NavigationHeaderMobileDrawer>
      </NavigationHeader>,
    );

    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("supports breadcrumbs in the left section", () => {
    render(
      <NavigationHeader>
        <NavigationHeaderBar>
          <NavigationHeaderLeft>
            <NavigationHeaderLogo>
              <span>Practical UI</span>
            </NavigationHeaderLogo>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
              ]}
            />
          </NavigationHeaderLeft>
        </NavigationHeaderBar>
      </NavigationHeader>,
    );

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("applies header bar surface styles", () => {
    renderNavigationHeader({ open: false });

    expect(screen.getByTestId("navigation-header-bar")).toHaveClass(
      "h-[72px]",
      "bg-fill-inverse",
      "border-b",
    );
  });
});
