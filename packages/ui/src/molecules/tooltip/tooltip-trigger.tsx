"use client";

import * as React from "react";

import { useTooltipContext } from "./tooltip-context";

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

export interface TooltipTriggerProps {
  children: React.ReactElement;
}

export function TooltipTrigger({ children }: TooltipTriggerProps) {
  const { open, setOpen, triggerRef, tooltipId } = useTooltipContext();
  const child = React.Children.only(children);
  const childRef = (child as { ref?: React.Ref<HTMLElement> }).ref;
  const childProps = child.props as {
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
  };

  return React.cloneElement(child, {
    ref: mergeRefs(triggerRef, childRef),
    "aria-describedby": open ? tooltipId : undefined,
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
      childProps.onMouseEnter?.(event);
      if (!event.defaultPrevented) {
        setOpen(true);
      }
    },
    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
      childProps.onMouseLeave?.(event);
      if (!event.defaultPrevented) {
        setOpen(false);
      }
    },
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      childProps.onFocus?.(event);
      if (!event.defaultPrevented) {
        setOpen(true);
      }
    },
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      childProps.onBlur?.(event);
      if (!event.defaultPrevented) {
        setOpen(false);
      }
    },
  } as React.HTMLAttributes<HTMLElement>);
}
