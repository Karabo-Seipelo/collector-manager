"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { useControllableBoolean } from "../../lib/use-controllable-boolean";
import {
  DropdownMenuContext,
  type DropdownMenuAlign,
} from "./dropdown-menu-context";
import { DropdownMenuAvatarItem } from "./dropdown-menu-avatar-item";
import { DropdownMenuCheckboxItem } from "./dropdown-menu-checkbox-item";
import { DropdownMenuContent } from "./dropdown-menu-content";
import { DropdownMenuItem } from "./dropdown-menu-item";
import { DropdownMenuLabel } from "./dropdown-menu-label";
import { DropdownMenuSeparator } from "./dropdown-menu-separator";
import { DropdownMenuTrigger } from "./dropdown-menu-trigger";

export type { DropdownMenuAlign } from "./dropdown-menu-context";
export {
  DropdownMenuAvatarItem,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: DropdownMenuAlign;
  closeOnSelect?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function DropdownMenu({
  open,
  defaultOpen = false,
  onOpenChange,
  align = "bottom-left",
  closeOnSelect = true,
  className,
  children,
}: DropdownMenuProps) {
  const { currentValue, setCurrentValue } = useControllableBoolean(
    open,
    defaultOpen,
  );
  const triggerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const menuId = React.useId();

  const setOpen = React.useCallback(
    (next: boolean) => {
      setCurrentValue(next);
      onOpenChange?.(next);
    },
    [onOpenChange, setCurrentValue],
  );

  return (
    <DropdownMenuContext.Provider
      value={{
        open: currentValue,
        setOpen,
        align,
        triggerRef,
        contentRef,
        menuId,
        closeOnSelect,
      }}
    >
      <div className={cn("relative inline-flex w-fit", className)}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}
