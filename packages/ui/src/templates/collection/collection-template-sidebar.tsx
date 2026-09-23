"use client";

import { BadgeCount } from "../../atoms/badge-count/badge-count";
import { FeatherIcon, type FeatherIconName } from "../../atoms/icon/icon";
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
  NavigationSideSection,
  NavigationSideTop,
} from "../../organisms/navigation-side/navigation-side";
import { avatarPhotoSrc } from "./mock-collection-data";
import { CollectionTemplateLogo } from "./collection-template-logo";

export interface CollectionTemplateSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function navIcon(name: FeatherIconName) {
  return <FeatherIcon name={name} size={24} />;
}

export function CollectionTemplateSidebar({
  open,
  onOpenChange,
}: CollectionTemplateSidebarProps) {
  return (
    <NavigationSide
      open={open}
      onOpenChange={onOpenChange}
      className="w-[260px]"
      aria-label="Main"
    >
      <NavigationSideTop>
        <NavigationSideClose />
        <NavigationSideLogo>
          <CollectionTemplateLogo />
        </NavigationSideLogo>
      </NavigationSideTop>

      <NavigationSideContent>
        <NavigationSideItem href="#collection" icon={navIcon("grid")} selected>
          Collection
        </NavigationSideItem>
        <NavigationSideItem href="#search" icon={navIcon("search")}>
          Search
        </NavigationSideItem>
        <NavigationSideItem
          href="#wishlist"
          icon={navIcon("heart")}
          badge={<BadgeCount emphasis="weak">12</BadgeCount>}
        >
          Wishlist
        </NavigationSideItem>
        <NavigationSideItem href="#insights" icon={navIcon("bar-chart-2")}>
          Insights
        </NavigationSideItem>
        <NavigationSideItem href="#archive" icon={navIcon("archive")}>
          Archive
        </NavigationSideItem>

        <NavigationSideDivider />
        <NavigationSideHeader>Collections</NavigationSideHeader>
        <NavigationSideItem
          href="#vinyl"
          icon={navIcon("disc")}
          badge={<BadgeCount emphasis="weak">112</BadgeCount>}
        >
          Vinyl records
        </NavigationSideItem>
        <NavigationSideItem
          href="#books"
          icon={navIcon("book")}
          badge={<BadgeCount emphasis="weak">64</BadgeCount>}
        >
          Books
        </NavigationSideItem>
        <NavigationSideItem
          href="#cards"
          icon={navIcon("layers")}
          badge={<BadgeCount emphasis="weak">48</BadgeCount>}
        >
          Trading cards
        </NavigationSideItem>
        <NavigationSideItem
          href="#other"
          icon={navIcon("box")}
          badge={<BadgeCount emphasis="weak">24</BadgeCount>}
        >
          Everything else
        </NavigationSideItem>
      </NavigationSideContent>

      <NavigationSideBottom>
        <NavigationSideSection>
          <AvatarDropdown
            variant="navigation"
            name="Karabo Seipelo"
            description="Free plan"
            src={avatarPhotoSrc}
            size="medium"
          />
        </NavigationSideSection>
      </NavigationSideBottom>
    </NavigationSide>
  );
}
