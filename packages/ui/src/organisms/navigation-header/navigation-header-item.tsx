"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { getNavigationHeaderItemClassName } from "./navigation-header-styles";

interface NavigationHeaderItemSharedProps {
  icon?: React.ReactNode;
  selected?: boolean;
  badge?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export type NavigationHeaderLinkProps = NavigationHeaderItemSharedProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export type NavigationHeaderButtonItemProps = NavigationHeaderItemSharedProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "type"> & {
    href?: undefined;
  };

export type NavigationHeaderItemProps =
  | NavigationHeaderLinkProps
  | NavigationHeaderButtonItemProps;

function NavigationHeaderItemContent({
  icon,
  children,
  badge,
}: Pick<NavigationHeaderItemSharedProps, "icon" | "children" | "badge">) {
  return (
    <>
      {icon ? (
        <span
          aria-hidden="true"
          className="grid size-6 shrink-0 place-items-center text-icon-neutral [&>svg]:size-full"
        >
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {badge ? (
        <span aria-hidden="true" className="shrink-0">
          {badge}
        </span>
      ) : null}
    </>
  );
}

const NavigationHeaderLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationHeaderLinkProps
>(function NavigationHeaderLink(
  { icon, selected = false, badge, className, children, href, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      href={href}
      aria-current={selected ? "page" : undefined}
      className={getNavigationHeaderItemClassName({ selected, className })}
      {...rest}
    >
      <NavigationHeaderItemContent icon={icon} badge={badge}>
        {children}
      </NavigationHeaderItemContent>
    </a>
  );
});

const NavigationHeaderButtonItem = React.forwardRef<
  HTMLButtonElement,
  NavigationHeaderButtonItemProps
>(function NavigationHeaderButtonItem(
  { icon, selected = false, badge, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-current={selected ? "page" : undefined}
      className={cn(
        getNavigationHeaderItemClassName({ selected, className }),
        "cursor-pointer",
      )}
      {...rest}
    >
      <NavigationHeaderItemContent icon={icon} badge={badge}>
        {children}
      </NavigationHeaderItemContent>
    </button>
  );
});

export const NavigationHeaderItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  NavigationHeaderItemProps
>(function NavigationHeaderItem(props, ref) {
  if ("href" in props && props.href) {
    return (
      <NavigationHeaderLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...props}
      />
    );
  }

  return (
    <NavigationHeaderButtonItem
      ref={ref as React.Ref<HTMLButtonElement>}
      {...(props as NavigationHeaderButtonItemProps)}
    />
  );
});
