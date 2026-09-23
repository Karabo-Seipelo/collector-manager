"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { getNavigationHeaderMobileItemClassName } from "./navigation-header-styles";
import { useNavigationHeaderContext } from "./navigation-header-context";

interface NavigationHeaderMobileItemSharedProps {
  icon?: React.ReactNode;
  selected?: boolean;
  closeOnNavigate?: boolean;
  className?: string;
  children: React.ReactNode;
}

export type NavigationHeaderMobileLinkProps =
  NavigationHeaderMobileItemSharedProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
      href: string;
    };

export type NavigationHeaderMobileButtonItemProps =
  NavigationHeaderMobileItemSharedProps &
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "className" | "children" | "type"
    > & {
      href?: undefined;
    };

export type NavigationHeaderMobileItemProps =
  | NavigationHeaderMobileLinkProps
  | NavigationHeaderMobileButtonItemProps;

function useCloseOnNavigate(closeOnNavigate: boolean) {
  const { setOpen, closeOnNavigate: menuCloseOnNavigate } =
    useNavigationHeaderContext();

  return () => {
    if (closeOnNavigate && menuCloseOnNavigate) {
      setOpen(false);
    }
  };
}

function NavigationHeaderMobileItemContent({
  icon,
  children,
}: Pick<NavigationHeaderMobileItemSharedProps, "icon" | "children">) {
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
      <span className="min-w-0 flex-1">{children}</span>
    </>
  );
}

const NavigationHeaderMobileLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationHeaderMobileLinkProps
>(function NavigationHeaderMobileLink(
  {
    icon,
    selected = false,
    closeOnNavigate = true,
    className,
    children,
    href,
    onClick,
    ...rest
  },
  ref,
) {
  const handleNavigate = useCloseOnNavigate(closeOnNavigate);

  return (
    <a
      ref={ref}
      href={href}
      aria-current={selected ? "page" : undefined}
      className={getNavigationHeaderMobileItemClassName({ selected, className })}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleNavigate();
      }}
      {...rest}
    >
      <NavigationHeaderMobileItemContent icon={icon}>
        {children}
      </NavigationHeaderMobileItemContent>
    </a>
  );
});

const NavigationHeaderMobileButtonItem = React.forwardRef<
  HTMLButtonElement,
  NavigationHeaderMobileButtonItemProps
>(function NavigationHeaderMobileButtonItem(
  {
    icon,
    selected = false,
    closeOnNavigate = true,
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  const handleNavigate = useCloseOnNavigate(closeOnNavigate);

  return (
    <button
      ref={ref}
      type="button"
      aria-current={selected ? "page" : undefined}
      className={cn(
        getNavigationHeaderMobileItemClassName({ selected, className }),
        "cursor-pointer",
      )}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleNavigate();
      }}
      {...rest}
    >
      <NavigationHeaderMobileItemContent icon={icon}>
        {children}
      </NavigationHeaderMobileItemContent>
    </button>
  );
});

export const NavigationHeaderMobileItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  NavigationHeaderMobileItemProps
>(function NavigationHeaderMobileItem(props, ref) {
  if ("href" in props && props.href) {
    return (
      <NavigationHeaderMobileLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...props}
      />
    );
  }

  return (
    <NavigationHeaderMobileButtonItem
      ref={ref as React.Ref<HTMLButtonElement>}
      {...(props as NavigationHeaderMobileButtonItemProps)}
    />
  );
});
