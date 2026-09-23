"use client";

import * as React from "react";

import { useDropdownMenuContext } from "./dropdown-menu-context";

function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref) (ref as React.MutableRefObject<T | null>).current = value;
    }
  };
}

export interface DropdownMenuTriggerProps {
  children: React.ReactElement;
}

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  const { open, setOpen, triggerRef, menuId } = useDropdownMenuContext();
  const child = React.Children.only(children);
  const childRef = (child as { ref?: React.Ref<HTMLElement> }).ref;
  const childProps = child.props as {
    onClick?: React.MouseEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  };

  return React.cloneElement(child, {
    ref: mergeRefs(triggerRef, childRef),
    "aria-expanded": open,
    "aria-haspopup": "menu",
    "aria-controls": open ? menuId : undefined,
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      childProps.onClick?.(event);
      if (event.defaultPrevented) return;
      setOpen(!open);
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      childProps.onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (
        event.key === "ArrowDown" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        setOpen(true);
      }
    },
  } as React.HTMLAttributes<HTMLElement>);
}
