"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { TooltipBubble } from "./tooltip-bubble";
import { useTooltipContext } from "./tooltip-context";
import { getTooltipContentClassName } from "./tooltip-styles";

export interface TooltipContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  heading?: React.ReactNode;
  children: React.ReactNode;
}

export function TooltipContent({
  heading,
  children,
  className,
  ...rest
}: TooltipContentProps) {
  const { open, setOpen, placement, size, contentRef, tooltipId, triggerRef } =
    useTooltipContext();
  const [present, setPresent] = React.useState(open);
  const [visible, setVisible] = React.useState(false);

  React.useLayoutEffect(() => {
    if (open) {
      setPresent(true);
      setVisible(false);
    }
  }, [open]);

  React.useEffect(() => {
    if (!present || !open) {
      if (!open) {
        setVisible(false);
      }
      return;
    }

    setVisible(false);
    const frame = requestAnimationFrame(() => {
      setVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [open, present]);

  React.useEffect(() => {
    if (open || !present) {
      return;
    }

    const timeout = window.setTimeout(() => setPresent(false), 150);
    return () => window.clearTimeout(timeout);
  }, [open, present]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, setOpen, triggerRef]);

  if (!present) {
    return null;
  }

  return (
    <div
      ref={contentRef}
      id={tooltipId}
      role="tooltip"
      className={cn(
        getTooltipContentClassName(placement, className),
        visible ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
      )}
      {...rest}
    >
      <TooltipBubble size={size} placement={placement} heading={heading}>
        {children}
      </TooltipBubble>
    </div>
  );
}
