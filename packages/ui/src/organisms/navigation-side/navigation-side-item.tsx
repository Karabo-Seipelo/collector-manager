"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import {
  getNavigationSideItemClassName,
  getNavigationSideItemIconClassName,
  getNavigationSideItemLabelClassName,
} from "./navigation-side-styles";
import { useNavigationSideContext } from "./navigation-side-context";

interface NavigationSideItemSharedProps {
  icon?: React.ReactNode;
  selected?: boolean;
  badge?: React.ReactNode;
  closeOnNavigate?: boolean;
  className?: string;
  children: React.ReactNode;
}

export type NavigationSideLinkProps = NavigationSideItemSharedProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export type NavigationSideButtonItemProps = NavigationSideItemSharedProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "type"> & {
    href?: undefined;
  };

export type NavigationSideItemProps =
  | NavigationSideLinkProps
  | NavigationSideButtonItemProps;

function NavigationSideItemContent({
  icon,
  children,
  badge,
}: Pick<NavigationSideItemSharedProps, "icon" | "children" | "badge">) {
  return (
    <>
      {icon ? (
        <span aria-hidden="true" className={getNavigationSideItemIconClassName()}>
          {icon}
        </span>
      ) : null}
      <span className={getNavigationSideItemLabelClassName()}>{children}</span>
      {badge ? (
        <span aria-hidden="true" className="shrink-0">
          {badge}
        </span>
      ) : null}
    </>
  );
}

function useNavigateSideEffect(closeOnNavigate: boolean) {
  const { setOpen, closeOnNavigate: menuCloseOnNavigate } =
    useNavigationSideContext();

  return () => {
    if (closeOnNavigate && menuCloseOnNavigate) {
      setOpen(false);
    }
  };
}

const NavigationSideLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationSideLinkProps
>(function NavigationSideLink(
  {
    icon,
    selected = false,
    badge,
    closeOnNavigate = true,
    className,
    children,
    href,
    onClick,
    ...rest
  },
  ref,
) {
  const handleNavigate = useNavigateSideEffect(closeOnNavigate);
  const itemClassName = getNavigationSideItemClassName({ selected, className });

  return (
    <a
      ref={ref}
      href={href}
      aria-current={selected ? "page" : undefined}
      className={itemClassName}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleNavigate();
      }}
      {...rest}
    >
      <NavigationSideItemContent icon={icon} badge={badge}>
        {children}
      </NavigationSideItemContent>
    </a>
  );
});

const NavigationSideButtonItem = React.forwardRef<
  HTMLButtonElement,
  NavigationSideButtonItemProps
>(function NavigationSideButtonItem(
  {
    icon,
    selected = false,
    badge,
    closeOnNavigate = true,
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  const handleNavigate = useNavigateSideEffect(closeOnNavigate);
  const itemClassName = getNavigationSideItemClassName({ selected, className });

  return (
    <button
      ref={ref}
      type="button"
      aria-current={selected ? "page" : undefined}
      className={cn(itemClassName, "cursor-pointer")}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleNavigate();
      }}
      {...rest}
    >
      <NavigationSideItemContent icon={icon} badge={badge}>
        {children}
      </NavigationSideItemContent>
    </button>
  );
});

export const NavigationSideItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  NavigationSideItemProps
>(function NavigationSideItem(props, ref) {
  if ("href" in props && props.href) {
    return (
      <NavigationSideLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...props}
      />
    );
  }

  return (
    <NavigationSideButtonItem
      ref={ref as React.Ref<HTMLButtonElement>}
      {...(props as NavigationSideButtonItemProps)}
    />
  );
});
