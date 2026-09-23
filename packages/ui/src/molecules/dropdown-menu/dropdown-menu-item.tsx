"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { useDropdownMenuContext } from "./dropdown-menu-context";
import {
  dropdownMenuItemClassName,
  dropdownMenuItemSelectedClassName,
} from "./dropdown-menu-item-styles";

export interface DropdownMenuItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  icon?: React.ReactNode;
  description?: string;
  selected?: boolean;
  trailing?: React.ReactNode;
  closeOnSelect?: boolean;
  onSelect?: (event: Event) => void;
}

export const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(function DropdownMenuItem(
  {
    icon,
    description,
    selected = false,
    trailing,
    closeOnSelect = true,
    onSelect,
    className,
    children,
    disabled,
    onClick,
    ...rest
  },
  ref,
) {
  const { setOpen, closeOnSelect: menuCloseOnSelect } = useDropdownMenuContext();

  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      disabled={disabled}
      className={cn(
        dropdownMenuItemClassName,
        selected && dropdownMenuItemSelectedClassName,
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;
        onSelect?.(event.nativeEvent);
        if (closeOnSelect && menuCloseOnSelect) setOpen(false);
      }}
      {...rest}
    >
      {icon ? (
        <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center text-icon-neutral [&>svg]:size-full">
          {icon}
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col items-start">
        <span className="w-full">{children}</span>
        {description ? (
          <span className="w-full text-tiny leading-5 text-fg-weak">
            {description}
          </span>
        ) : null}
      </span>
      {trailing ? (
        <span
          className="shrink-0 pr-2"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {trailing}
        </span>
      ) : null}
    </button>
  );
});
