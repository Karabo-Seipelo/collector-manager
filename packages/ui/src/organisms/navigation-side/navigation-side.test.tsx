import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { BadgeCount } from "../../atoms/badge-count/badge-count";
import { FeatherIcon } from "../../atoms/icon/icon";
import { SearchInput } from "../../molecules/search-input/search-input";
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
} from "./navigation-side";

const navIcon = <FeatherIcon name="layers" size={24} />;

function renderNavigationSide(
  props?: Partial<React.ComponentProps<typeof NavigationSide>>,
) {
  const onOpenChange = vi.fn();
  render(
    <NavigationSide open onOpenChange={onOpenChange} {...props}>
      <NavigationSideTop>
        <NavigationSideClose />
        <NavigationSideLogo>
          <span>Practical UI</span>
        </NavigationSideLogo>
        <NavigationSideSection>
          <SearchInput aria-label="Search navigation" />
        </NavigationSideSection>
      </NavigationSideTop>
      <NavigationSideContent>
        <NavigationSideItem href="/home" icon={navIcon} selected>
          Home
        </NavigationSideItem>
        <NavigationSideItem
          href="/projects"
          icon={navIcon}
          badge={<BadgeCount emphasis="weak">8</BadgeCount>}
        >
          Projects
        </NavigationSideItem>
      </NavigationSideContent>
      <NavigationSideBottom>
        <NavigationSideItem href="/settings" icon={navIcon}>
          Settings
        </NavigationSideItem>
      </NavigationSideBottom>
    </NavigationSide>,
  );
  return { onOpenChange };
}

describe("NavigationSide", () => {
  it("renders the sidebar with navigation landmarks and items", () => {
    renderNavigationSide({ open: false });

    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: "Search navigation" })).toBeInTheDocument();
  });

  it("applies selected item styles", () => {
    renderNavigationSide({ open: false });

    expect(screen.getByRole("link", { name: "Home" })).toHaveClass(
      "border-primary",
      "bg-fill-hover",
    );
  });

  it("shows the mobile overlay and closes from overlay click and Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    renderNavigationSide({ onOpenChange });
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    expect(screen.getByTestId("navigation-side-overlay")).toHaveClass(
      "opacity-100",
    );

    await user.click(screen.getByTestId("navigation-side-overlay"));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes from the mobile close button and after navigating", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    renderNavigationSide({ onOpenChange });
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    await user.click(screen.getByRole("button", { name: "Close navigation" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();
    await user.click(screen.getByRole("link", { name: "Projects" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("applies desktop panel classes", () => {
    renderNavigationSide({ open: false });

    expect(screen.getByTestId("navigation-side-panel")).toHaveClass(
      "w-80",
      "bg-fill-inverse",
      "md:relative",
      "md:border-r",
    );
  });

  it("applies mobile drawer classes when open", () => {
    renderNavigationSide();

    expect(screen.getByTestId("navigation-side-panel")).toHaveClass(
      "max-md:fixed",
      "max-md:h-full",
      "max-md:translate-x-0",
      "bg-fill-inverse",
    );
  });

  it("renders the mobile header with menu, logo, and avatar slots", async () => {
    const user = userEvent.setup();
    const onMenuClick = vi.fn();

    render(
      <NavigationSideMobileHeader
        logo={<span>Practical UI</span>}
        avatar={<span data-testid="avatar-slot">Avatar</span>}
        onMenuClick={onMenuClick}
      />,
    );

    expect(screen.getByRole("button", { name: "Open navigation" })).toBeVisible();
    expect(screen.getByText("Practical UI")).toBeVisible();
    expect(screen.getByTestId("avatar-slot")).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(onMenuClick).toHaveBeenCalled();
  });
});
