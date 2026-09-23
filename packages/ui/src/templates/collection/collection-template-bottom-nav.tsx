"use client";

import { FeatherIcon, type FeatherIconName } from "../../atoms/icon/icon";
import { cn } from "../../lib/cn";

type BottomNavItem = {
  id: string;
  label: string;
  icon: FeatherIconName;
  href?: string;
  selected?: boolean;
  onClick?: () => void;
};

export interface CollectionTemplateBottomNavProps {
  onProfileClick?: () => void;
}

export function CollectionTemplateBottomNav({
  onProfileClick,
}: CollectionTemplateBottomNavProps) {
  const items: BottomNavItem[] = [
    { id: "collection", label: "Collection", icon: "grid", href: "#collection", selected: true },
    { id: "search", label: "Search", icon: "search", href: "#search" },
    { id: "add", label: "Add", icon: "plus", href: "#add" },
    { id: "stats", label: "Stats", icon: "pie-chart", href: "#insights" },
    {
      id: "profile",
      label: "Profile",
      icon: "user",
      onClick: onProfileClick,
    },
  ];

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 flex h-[72px] items-stretch border-t border-stroke-weak bg-fill-inverse pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {items.map((item) => {
        const className = cn(
          "flex flex-1 flex-col items-center justify-center gap-0.5 px-1 text-tiny leading-5 outline-none",
          "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stroke-focus",
          item.selected ? "text-primary" : "text-fg-weak",
        );

        const content = (
          <>
            <FeatherIcon name={item.icon} size={24} />
            <span>{item.label}</span>
          </>
        );

        if (item.onClick) {
          return (
            <button
              key={item.id}
              type="button"
              className={className}
              aria-current={item.selected ? "page" : undefined}
              onClick={item.onClick}
            >
              {content}
            </button>
          );
        }

        return (
          <a
            key={item.id}
            href={item.href}
            className={className}
            aria-current={item.selected ? "page" : undefined}
          >
            {content}
          </a>
        );
      })}
    </nav>
  );
}
