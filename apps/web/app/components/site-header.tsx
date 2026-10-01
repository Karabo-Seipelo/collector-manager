"use client";

import {
  NavigationHeader,
  NavigationHeaderBar,
  NavigationHeaderButtons,
  NavigationHeaderItem,
  NavigationHeaderLeft,
  NavigationHeaderLogo,
  NavigationHeaderNav,
  NavigationHeaderRight,
} from "@repo/ui/organisms/navigation-header";
import { Button } from "@repo/ui/atoms/button";
import { FeatherIcon } from "@repo/ui/atoms/icon";

export function SiteHeader() {
  return (
    <NavigationHeader>
      <NavigationHeaderBar>
        <NavigationHeaderLeft>
          <NavigationHeaderLogo>
            <span className="text-heading-4 font-semibold text-fg-strong">
              Template
            </span>
          </NavigationHeaderLogo>
        </NavigationHeaderLeft>

        <NavigationHeaderNav aria-label="Main">
          <NavigationHeaderItem href="/" selected>
            Home
          </NavigationHeaderItem>
          <NavigationHeaderItem href="/#design-system">
            Design system
          </NavigationHeaderItem>
        </NavigationHeaderNav>

        <NavigationHeaderRight>
          <NavigationHeaderButtons>
            <Button
              variant="secondary"
              tone="neutral"
              iconLeft={<FeatherIcon name="book-open" size={20} />}
              type="button"
            >
              Docs
            </Button>
          </NavigationHeaderButtons>
        </NavigationHeaderRight>
      </NavigationHeaderBar>
    </NavigationHeader>
  );
}
