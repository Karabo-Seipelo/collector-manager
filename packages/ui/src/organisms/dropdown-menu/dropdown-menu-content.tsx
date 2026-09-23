"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { useDropdownMenuContext } from "./dropdown-menu-context";

const alignClasses = {
  "bottom-left": "left-0 top-[calc(100%+8px)] origin-top-left",
  "bottom-right": "right-0 top-[calc(100%+8px)] origin-top-right",
  "top-left": "left-0 bottom-[calc(100%+8px)] origin-bottom-left",
  "top-right": "right-0 bottom-[calc(100%+8px)] origin-bottom-right",
} as const;

export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  "aria-label"?: string;
}

export function DropdownMenuContent({
  className,
  children,
  "aria-label": ariaLabel,
  ...rest
}: DropdownMenuContentProps) {
  const { open, setOpen, align, contentRef, menuId, triggerRef } =
    useDropdownMenuContext();
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
      if (!open) setVisible(false);
      return;
    }

    setVisible(false);
    let frame2 = 0;
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        setVisible(true);
        const firstItem = contentRef.current?.querySelector<HTMLElement>(
          '[role="menuitem"], [role="menuitemcheckbox"]',
        );
        firstItem?.focus();
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [contentRef, open, present]);

  React.useEffect(() => {
    if (open || !present) return;

    const timeout = window.setTimeout(() => setPresent(false), 200);
    return () => window.clearTimeout(timeout);
  }, [open, present]);

  React.useEffect(() => {
    if (!open) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        contentRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [contentRef, open, setOpen, triggerRef]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!contentRef.current) return;

    const items = Array.from(
      contentRef.current.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled])',
      ),
    );
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  if (!present) return null;

  return (
    <div
      ref={contentRef}
      id={menuId}
      role="menu"
      aria-label={ariaLabel}
      aria-orientation="vertical"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={cn(
        "absolute z-50 w-[280px] overflow-hidden rounded-lg border border-stroke-weak bg-fill-inverse py-2 shadow-overlay",
        "transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
        visible ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        alignClasses[align],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
