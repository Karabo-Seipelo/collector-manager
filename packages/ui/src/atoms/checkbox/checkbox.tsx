"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { FeatherIcon } from "../icon/icon";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, className, id, disabled, ...rest }, ref) {
    const autoId = React.useId();
    const fieldId = id ?? autoId;

    return (
      <label
        htmlFor={fieldId}
        className={cn(
          "inline-flex w-fit items-center gap-3",
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
          className,
        )}
      >
        <input
          ref={ref}
          id={fieldId}
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...rest}
        />
        <span
          aria-hidden="true"
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-lg border",
            "border-stroke-weak bg-fill-weak text-primary-foreground",
            "transition-colors",
            "peer-checked:border-primary peer-checked:bg-primary",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
            "peer-checked:[&_svg]:opacity-100",
          )}
        >
          <FeatherIcon name="check" size={16} className="opacity-0" />
        </span>
        <span className="text-small font-normal text-fg-strong">{label}</span>
      </label>
    );
  },
);
