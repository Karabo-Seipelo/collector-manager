"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { Divider } from "../../atoms/divider/divider";
import { FeatherIcon } from "../../atoms/icon/icon";
import { useControllableBoolean } from "../../lib/use-controllable-boolean";
import { useFocusTrap } from "../../lib/use-focus-trap";
import { useScrollLock } from "../../lib/use-scroll-lock";
import { cn } from "../../lib/cn";
import {
  NavigationHeaderContext,
  type NavigationHeaderContextValue,
  useNavigationHeaderContext,
} from "./navigation-header-context";
import {
  getNavigationHeaderClassName,
  getNavigationHeaderLeftClassName,
  getNavigationHeaderLogoClassName,
  getNavigationHeaderMobileContentClassName,
  getNavigationHeaderMobileDrawerClassName,
  getNavigationHeaderMobileDrawerContentClassName,
  getNavigationHeaderMobileFooterClassName,
  getNavigationHeaderMobileHeaderClassName,
  getNavigationHeaderMobileProfileClassName,
  getNavigationHeaderNavClassName,
  getNavigationHeaderOverlayClassName,
  getNavigationHeaderRightClassName,
} from "./navigation-header-styles";

export { NavigationHeaderItem } from "./navigation-header-item";
export { NavigationHeaderMobileItem } from "./navigation-header-mobile-item";

export interface NavigationHeaderProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  closeOnNavigate?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function NavigationHeader({
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  closeOnNavigate = true,
  className,
  children,
}: NavigationHeaderProps) {
  const { currentValue, setCurrentValue } = useControllableBoolean(
    open,
    defaultOpen,
  );
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const [mobileDrawerContent, setMobileDrawerContent] =
    React.useState<React.ReactNode>(null);

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
  useFocusTrap(drawerRef, currentValue);

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

  const contextValue = React.useMemo<NavigationHeaderContextValue>(
    () => ({
      open: currentValue,
      setOpen,
      closeOnNavigate,
      mobileDrawerContent,
      setMobileDrawerContent,
    }),
    [closeOnNavigate, currentValue, mobileDrawerContent, setOpen],
  );

  const handleOverlayMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      setOpen(false);
    }
  };

  return (
    <NavigationHeaderContext.Provider value={contextValue}>
      {children}
      {mounted && currentValue
        ? createPortal(
            <>
              <div
                data-testid="navigation-header-overlay"
                aria-hidden="true"
                className={getNavigationHeaderOverlayClassName(overlayVisible)}
                onMouseDown={handleOverlayMouseDown}
              />
              <div
                ref={drawerRef}
                data-testid="navigation-header-mobile-drawer"
                className={getNavigationHeaderMobileDrawerClassName({
                  open: currentValue,
                  className,
                })}
              >
                <div className={getNavigationHeaderMobileDrawerContentClassName()}>
                  {mobileDrawerContent}
                </div>
              </div>
            </>,
            document.body,
          )
        : null}
    </NavigationHeaderContext.Provider>
  );
}

export interface NavigationHeaderBarProps
  extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function NavigationHeaderBar({
  className,
  children,
  ...rest
}: NavigationHeaderBarProps) {
  return (
    <header
      data-testid="navigation-header-bar"
      className={getNavigationHeaderClassName(className)}
      {...rest}
    >
      {children}
    </header>
  );
}

export interface NavigationHeaderLeftProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationHeaderLeft({
  className,
  children,
  ...rest
}: NavigationHeaderLeftProps) {
  return (
    <div className={getNavigationHeaderLeftClassName(className)} {...rest}>
      <NavigationHeaderMenuButton />
      {children}
    </div>
  );
}

export interface NavigationHeaderMenuButtonProps {
  label?: string;
  className?: string;
}

export function NavigationHeaderMenuButton({
  label = "Open navigation menu",
  className,
}: NavigationHeaderMenuButtonProps) {
  const { setOpen } = useNavigationHeaderContext();

  return (
    <ButtonIcon
      aria-label={label}
      icon={<FeatherIcon name="menu" size={24} />}
      variant="tertiary"
      tone="neutral"
      className={cn("shrink-0 md:hidden", className)}
      onClick={() => setOpen(true)}
    />
  );
}

export interface NavigationHeaderLogoProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationHeaderLogo({
  className,
  children,
  ...rest
}: NavigationHeaderLogoProps) {
  return (
    <div className={getNavigationHeaderLogoClassName(className)} {...rest}>
      {children}
    </div>
  );
}

export interface NavigationHeaderNavProps
  extends React.HTMLAttributes<HTMLElement> {
  "aria-label"?: string;
  children: React.ReactNode;
}

export function NavigationHeaderNav({
  className,
  children,
  "aria-label": ariaLabel = "Primary",
  ...rest
}: NavigationHeaderNavProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={getNavigationHeaderNavClassName(className)}
      {...rest}
    >
      {children}
    </nav>
  );
}

export interface NavigationHeaderRightProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationHeaderRight({
  className,
  children,
  ...rest
}: NavigationHeaderRightProps) {
  return (
    <div className={getNavigationHeaderRightClassName(className)} {...rest}>
      {children}
    </div>
  );
}

export interface NavigationHeaderActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationHeaderActions({
  className,
  children,
  ...rest
}: NavigationHeaderActionsProps) {
  return (
    <div
      className={cn("hidden shrink-0 items-center gap-0 md:flex", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface NavigationHeaderSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationHeaderSearch({
  className,
  children,
  ...rest
}: NavigationHeaderSearchProps) {
  return (
    <div className={cn("hidden w-[200px] shrink-0 md:block", className)} {...rest}>
      {children}
    </div>
  );
}

export interface NavigationHeaderButtonsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationHeaderButtons({
  className,
  children,
  ...rest
}: NavigationHeaderButtonsProps) {
  return (
    <div className={cn("hidden shrink-0 md:flex", className)} {...rest}>
      {children}
    </div>
  );
}

export interface NavigationHeaderUserProps
  extends React.HTMLAttributes<HTMLDivElement> {
  desktop: React.ReactNode;
  mobile?: React.ReactNode;
}

export function NavigationHeaderUser({
  desktop,
  mobile,
  className,
  ...rest
}: NavigationHeaderUserProps) {
  return (
    <div className={cn("shrink-0", className)} {...rest}>
      <div className="md:hidden">{mobile ?? desktop}</div>
      <div className="hidden md:block">{desktop}</div>
    </div>
  );
}

export interface NavigationHeaderMobileDrawerProps {
  children: React.ReactNode;
}

export function NavigationHeaderMobileDrawer({
  children,
}: NavigationHeaderMobileDrawerProps) {
  const { setMobileDrawerContent } = useNavigationHeaderContext();

  React.useEffect(() => {
    setMobileDrawerContent(children);
    return () => setMobileDrawerContent(null);
  }, [children, setMobileDrawerContent]);

  return null;
}

export interface NavigationHeaderMobileHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  closeLabel?: string;
}

export function NavigationHeaderMobileHeader({
  className,
  children,
  closeLabel = "Close navigation menu",
}: NavigationHeaderMobileHeaderProps) {
  const { setOpen } = useNavigationHeaderContext();

  return (
    <div className={getNavigationHeaderMobileHeaderClassName(className)}>
      <ButtonIcon
        aria-label={closeLabel}
        icon={<FeatherIcon name="x" size={24} />}
        variant="tertiary"
        tone="neutral"
        onClick={() => setOpen(false)}
      />
      {children}
    </div>
  );
}

export interface NavigationHeaderMobileSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationHeaderMobileSearch({
  className,
  children,
  ...rest
}: NavigationHeaderMobileSearchProps) {
  return (
    <div className={cn("px-6", className)} {...rest}>
      {children}
    </div>
  );
}

export interface NavigationHeaderMobileNavProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationHeaderMobileNav({
  className,
  children,
  ...rest
}: NavigationHeaderMobileNavProps) {
  return (
    <div className={getNavigationHeaderMobileContentClassName(className)} {...rest}>
      {children}
    </div>
  );
}

export type NavigationHeaderMobileDividerProps =
  React.HTMLAttributes<HTMLDivElement>;

export function NavigationHeaderMobileDivider({
  className,
  ...rest
}: NavigationHeaderMobileDividerProps) {
  return (
    <div
      role="separator"
      className={cn("px-6 py-6", className)}
      {...rest}
    >
      <Divider />
    </div>
  );
}

export interface NavigationHeaderMobileFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationHeaderMobileFooter({
  className,
  children,
  ...rest
}: NavigationHeaderMobileFooterProps) {
  return (
    <div className={getNavigationHeaderMobileFooterClassName(className)} {...rest}>
      {children}
    </div>
  );
}

export interface NavigationHeaderMobileProfileProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationHeaderMobileProfile({
  className,
  children,
  ...rest
}: NavigationHeaderMobileProfileProps) {
  return (
    <div className={getNavigationHeaderMobileProfileClassName(className)} {...rest}>
      <div className="py-6">
        <Divider />
      </div>
      {children}
    </div>
  );
}
