"use client";

import * as React from "react";

import { Button } from "../../atoms/button/button";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import { SearchInput } from "../../molecules/search-input/search-input";
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
  NavigationHeaderMobileSearch,
  NavigationHeaderNav,
  NavigationHeaderRight,
} from "../../organisms/navigation-header/navigation-header";
import { PracticalUiLogo } from "../shared/practical-ui-logo";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#blog", label: "Blog" },
];

export function LandingPageNavigation() {
  const [open, setOpen] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState("#features");

  return (
    <NavigationHeader open={open} onOpenChange={setOpen}>
      <NavigationHeaderBar>
        <NavigationHeaderLeft>
          <NavigationHeaderLogo>
            <PracticalUiLogo />
          </NavigationHeaderLogo>
          <NavigationHeaderNav>
            {navItems.map((item) => (
              <NavigationHeaderItem
                key={item.href}
                href={item.href}
                selected={activeHref === item.href}
                onClick={() => setActiveHref(item.href)}
              >
                {item.label}
              </NavigationHeaderItem>
            ))}
          </NavigationHeaderNav>
        </NavigationHeaderLeft>
        <NavigationHeaderRight>
          <NavigationHeaderButtons>
            <ButtonGroup aria-label="Header actions" size="small">
              <Button variant="secondary">Log in</Button>
              <Button>Sign up</Button>
            </ButtonGroup>
          </NavigationHeaderButtons>
        </NavigationHeaderRight>
      </NavigationHeaderBar>
      <NavigationHeaderMobileDrawer>
        <NavigationHeaderMobileHeader />
        <NavigationHeaderMobileSearch>
          <SearchInput aria-label="Search" />
        </NavigationHeaderMobileSearch>
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
          <ButtonGroup aria-label="Mobile header actions" layout="vertical" size="large">
            <Button variant="secondary">Log in</Button>
            <Button>Sign up</Button>
          </ButtonGroup>
        </NavigationHeaderMobileFooter>
      </NavigationHeaderMobileDrawer>
    </NavigationHeader>
  );
}
