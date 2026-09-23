"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon } from "../../atoms/icon/icon";
import { useControllableBoolean } from "../../lib/use-controllable-boolean";
import { useFocusTrap } from "../../lib/use-focus-trap";
import { useScrollLock } from "../../lib/use-scroll-lock";
import { cn } from "../../lib/cn";
import {
  NavigationSideContext,
  type NavigationSideContextValue,
  useNavigationSideContext,
} from "./navigation-side-context";
import {
  getNavigationSideBottomClassName,
  getNavigationSideClassName,
  getNavigationSideContentClassName,
  getNavigationSideLogoClassName,
  getNavigationSideMobileHeaderClassName,
  getNavigationSideOpenClassName,
  getNavigationSideOverlayClassName,
  getNavigationSideSectionClassName,
  getNavigationSideTopClassName,
} from "./navigation-side-styles";

export { NavigationSideDivider } from "./navigation-side-divider";
export { NavigationSideHeader } from "./navigation-side-header";
export { NavigationSideItem } from "./navigation-side-item";

export interface NavigationSideProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  closeOnNavigate?: boolean;
  "aria-label"?: string;
  className?: string;
  children: React.ReactNode;
}

export function NavigationSide({
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  closeOnNavigate = true,
  "aria-label": ariaLabel = "Main",
  className,
  children,
}: NavigationSideProps) {
  const { currentValue, setCurrentValue } = useControllableBoolean(
    open,
    defaultOpen,
  );
  const panelRef = React.useRef<HTMLElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [overlayVisible, setOverlayVisible] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!currentValue) {
      setOverlayVisible(false);
      return;
    }

    setOverlayVisible(false);
    let frame2 = 0;
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => setOverlayVisible(true));
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [currentValue]);

  const setOpen = React.useCallback(
    (next: boolean) => {
      setCurrentValue(next);
      onOpenChange?.(next);
    },
    [onOpenChange, setCurrentValue],
  );

  useScrollLock(currentValue);
  useFocusTrap(panelRef, currentValue);

  React.useEffect(() => {
    if (!currentValue || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEscape, currentValue, setOpen]);

  const contextValue = React.useMemo<NavigationSideContextValue>(
    () => ({
      open: currentValue,
      setOpen,
      closeOnNavigate,
    }),
    [closeOnNavigate, currentValue, setOpen],
  );

  const handleOverlayMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      setOpen(false);
    }
  };

  return (
    <NavigationSideContext.Provider value={contextValue}>
      {mounted && currentValue
        ? createPortal(
            <div
              data-testid="navigation-side-overlay"
              aria-hidden="true"
              className={getNavigationSideOverlayClassName(overlayVisible)}
              onMouseDown={handleOverlayMouseDown}
            />,
            document.body,
          )
        : null}
      <aside
        ref={panelRef}
        role="navigation"
        data-testid="navigation-side-panel"
        aria-label={ariaLabel}
        className={cn(
          getNavigationSideClassName(className),
          getNavigationSideOpenClassName(currentValue),
        )}
      >
        {children}
      </aside>
    </NavigationSideContext.Provider>
  );
}

export interface NavigationSideTopProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationSideTop({
  className,
  children,
  ...rest
}: NavigationSideTopProps) {
  return (
    <div className={getNavigationSideTopClassName(className)} {...rest}>
      {children}
    </div>
  );
}

export interface NavigationSideCloseProps {
  className?: string;
  label?: string;
}

export function NavigationSideClose({
  className,
  label = "Close navigation",
}: NavigationSideCloseProps) {
  const { setOpen } = useNavigationSideContext();

  return (
    <div className={cn("flex p-3 md:hidden", className)}>
      <ButtonIcon
        aria-label={label}
        icon={<FeatherIcon name="x" size={24} />}
        variant="tertiary"
        tone="neutral"
        onClick={() => setOpen(false)}
      />
    </div>
  );
}

export interface NavigationSideLogoProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationSideLogo({
  className,
  children,
  ...rest
}: NavigationSideLogoProps) {
  return (
    <div
      className={cn(getNavigationSideLogoClassName(className), "max-md:hidden")}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface NavigationSideSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationSideSection({
  className,
  children,
  ...rest
}: NavigationSideSectionProps) {
  return (
    <div className={getNavigationSideSectionClassName(className)} {...rest}>
      {children}
    </div>
  );
}

export interface NavigationSideContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationSideContent({
  className,
  children,
  ...rest
}: NavigationSideContentProps) {
  return (
    <div className={getNavigationSideContentClassName(className)} {...rest}>
      {children}
    </div>
  );
}

export interface NavigationSideBottomProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationSideBottom({
  className,
  children,
  ...rest
}: NavigationSideBottomProps) {
  return (
    <div className={getNavigationSideBottomClassName(className)} {...rest}>
      {children}
    </div>
  );
}

export interface NavigationSideMobileHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo: React.ReactNode;
  avatar?: React.ReactNode;
  menuLabel?: string;
  onMenuClick?: () => void;
}

export function NavigationSideMobileHeader({
  logo,
  avatar,
  menuLabel = "Open navigation",
  onMenuClick,
  className,
  ...rest
}: NavigationSideMobileHeaderProps) {
  return (
    <div
      data-testid="navigation-side-mobile-header"
      className={getNavigationSideMobileHeaderClassName(className)}
      {...rest}
    >
      <ButtonIcon
        aria-label={menuLabel}
        icon={<FeatherIcon name="menu" size={24} />}
        variant="tertiary"
        tone="neutral"
        onClick={onMenuClick}
      />
      <div className="flex h-12 shrink-0 items-center">{logo}</div>
      {avatar ? <div className="ml-auto shrink-0">{avatar}</div> : null}
    </div>
  );
}
