"use client";

import * as React from "react";

import { BadgeCount } from "../../atoms/badge-count/badge-count";
import { useControllableString } from "../../lib/use-controllable-string";
import { cn } from "../../lib/cn";
import {
  getTabsClassName,
  getTabsListClassName,
  getTabsPanelClassName,
  getTabsTriggerClassName,
  getTabsTriggerIconClassName,
  getTabsTriggerLabelClassName,
} from "./tabs-styles";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
  disabled: boolean;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within Tabs");
  }
  return context;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export function Tabs({
  value,
  defaultValue = "",
  onValueChange,
  disabled = false,
  className,
  children,
  ...rest
}: TabsProps) {
  const baseId = React.useId();
  const { currentValue, setCurrentValue } = useControllableString(
    value,
    defaultValue,
  );

  const setValue = React.useCallback(
    (nextValue: string) => {
      setCurrentValue(nextValue);
      onValueChange?.(nextValue);
    },
    [onValueChange, setCurrentValue],
  );

  return (
    <TabsContext.Provider
      value={{ value: currentValue, setValue, baseId, disabled }}
    >
      <div className={getTabsClassName(className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  wrap?: boolean;
  "aria-label"?: string;
}

export function TabsList({
  wrap = false,
  className,
  children,
  "aria-label": ariaLabel,
  ...rest
}: TabsListProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={getTabsListClassName(wrap, className)}
      {...rest}
    >
      {children}
    </div>
  );
}

function getNextIndex(
  currentIndex: number,
  direction: "next" | "prev" | "first" | "last",
  length: number,
) {
  if (length === 0) {
    return -1;
  }

  switch (direction) {
    case "first":
      return 0;
    case "last":
      return length - 1;
    case "next":
      return (currentIndex + 1) % length;
    case "prev":
      return (currentIndex - 1 + length) % length;
  }
}

export interface TabsTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export function TabsTrigger({
  value,
  icon,
  badge,
  disabled,
  className,
  children,
  onKeyDown,
  ...rest
}: TabsTriggerProps) {
  const { value: selectedValue, setValue, baseId, disabled: groupDisabled } =
    useTabsContext();
  const selected = value === selectedValue;
  const itemDisabled = groupDisabled || disabled;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || itemDisabled) {
      return;
    }

    const tablist = triggerRef.current?.closest('[role="tablist"]');
    if (!tablist) {
      return;
    }

    const tabs = Array.from(
      tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    const currentIndex = tabs.indexOf(triggerRef.current!);
    if (currentIndex < 0) {
      return;
    }

    let nextIndex = -1;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = getNextIndex(currentIndex, "next", tabs.length);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = getNextIndex(currentIndex, "prev", tabs.length);
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    if (!nextTab) {
      return;
    }

    nextTab.focus();
    nextTab.click();
  };

  return (
    <button
      ref={triggerRef}
      type="button"
      role="tab"
      id={tabId}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      disabled={itemDisabled}
      onClick={() => {
        if (!itemDisabled) {
          setValue(value);
        }
      }}
      onKeyDown={handleKeyDown}
      className={cn(
        getTabsTriggerClassName({
          selected,
          disabled: Boolean(itemDisabled),
        }),
        className,
      )}
      {...rest}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className={getTabsTriggerIconClassName(selected && !itemDisabled)}
        >
          {icon}
        </span>
      ) : null}
      {children ? (
        <span className={getTabsTriggerLabelClassName()}>{children}</span>
      ) : null}
      {badge !== undefined ? (
        <BadgeCount emphasis="weak">{badge}</BadgeCount>
      ) : null}
    </button>
  );
}

export interface TabsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsPanel({
  value,
  className,
  children,
  ...rest
}: TabsPanelProps) {
  const { value: selectedValue, baseId } = useTabsContext();
  const selected = value === selectedValue;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!selected) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      className={getTabsPanelClassName(className)}
      {...rest}
    >
      {children}
    </div>
  );
}
