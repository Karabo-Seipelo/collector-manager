"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { useControllableBoolean } from "../../lib/use-controllable-boolean";
import { TooltipContent } from "./tooltip-content";
import { TooltipContext } from "./tooltip-context";
import { TooltipTrigger } from "./tooltip-trigger";
import {
  getTooltipRootClassName,
  type TooltipPlacement,
  type TooltipSize,
} from "./tooltip-styles";

export type { TooltipPlacement, TooltipSize };
export { TooltipBubble } from "./tooltip-bubble";
export type { TooltipBubbleProps } from "./tooltip-bubble";
export { TooltipContent, TooltipTrigger };

export interface TooltipProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: TooltipPlacement;
  size?: TooltipSize;
  className?: string;
  children: React.ReactNode;
}

export function Tooltip({
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-left",
  size = "small",
  className,
  children,
}: TooltipProps) {
  const { currentValue, setCurrentValue } = useControllableBoolean(
    open,
    defaultOpen,
  );
  const triggerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const tooltipId = React.useId();

  const setOpen = React.useCallback(
    (next: boolean) => {
      setCurrentValue(next);
      onOpenChange?.(next);
    },
    [onOpenChange, setCurrentValue],
  );

  return (
    <TooltipContext.Provider
      value={{
        open: currentValue,
        setOpen,
        placement,
        size,
        triggerRef,
        contentRef,
        tooltipId,
      }}
    >
      <div className={cn(getTooltipRootClassName(), className)}>{children}</div>
    </TooltipContext.Provider>
  );
}
