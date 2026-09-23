"use client";

import * as React from "react";

import { FeatherIcon } from "../../atoms/icon/icon";
import { cn } from "../../lib/cn";
import {
  dropdownMenuItemClassName,
  dropdownMenuItemSelectedClassName,
} from "./dropdown-menu-item-styles";

export interface DropdownMenuCheckboxItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  selected?: boolean;
}

export const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuCheckboxItemProps
>(function DropdownMenuCheckboxItem(
  {
    checked,
    defaultChecked,
    onCheckedChange,
    selected = false,
    className,
    children,
    disabled,
    ...rest
  },
  ref,
) {
  const controlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked ?? false,
  );
  const currentChecked = controlled ? checked : internalChecked;

  const updateChecked = (next: boolean) => {
    if (!controlled) setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      ref={ref}
      type="button"
      role="menuitemcheckbox"
      aria-checked={currentChecked}
      disabled={disabled}
      className={cn(
        dropdownMenuItemClassName,
        selected && dropdownMenuItemSelectedClassName,
        className,
      )}
      onClick={(event) => {
        event.preventDefault();
        if (disabled) return;
        updateChecked(!currentChecked);
      }}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded border border-stroke-strong bg-fill-inverse text-primary-foreground",
          currentChecked && "border-primary bg-primary",
        )}
      >
        <FeatherIcon
          name="check"
          size={14}
          className={currentChecked ? "opacity-100" : "opacity-0"}
        />
      </span>
      <span className="min-w-0 flex-1 text-left text-tiny font-normal text-fg-strong">
        {children}
      </span>
    </button>
  );
});
