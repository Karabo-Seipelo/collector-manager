"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { FeatherIcon } from "../icon/icon";

export type CheckboxSize = "small" | "large";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: React.ReactNode;
  size?: CheckboxSize;
  indeterminate?: boolean;
  invalid?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      size = "small",
      indeterminate = false,
      invalid = false,
      className,
      id,
      disabled,
      ...rest
    },
    ref,
  ) {
    const autoId = React.useId();
    const fieldId = id ?? autoId;
    const inputRef = React.useRef<HTMLInputElement>(null);
    const small = size === "small";

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <label
        htmlFor={fieldId}
        className={cn(
          "group inline-flex w-fit items-center gap-3",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          className,
        )}
      >
        <input
          ref={inputRef}
          id={fieldId}
          type="checkbox"
          disabled={disabled}
          aria-checked={indeterminate ? "mixed" : undefined}
          aria-invalid={invalid || undefined}
          className="peer sr-only"
          {...rest}
        />
        <span
          data-testid="checkbox-box"
          aria-hidden="true"
          className={cn(
            "grid shrink-0 place-items-center rounded border text-primary-foreground",
            "transition-colors",
            small ? "size-6" : "size-8",
            disabled
              ? "border-stroke-disabled bg-transparent peer-checked:bg-fill-disabled"
              : invalid
              ? "border-2 border-stroke-error-strong bg-fill-error-weak peer-checked:bg-fill-error-strong"
              : "border-stroke-strong bg-fill-inverse peer-checked:border-primary peer-checked:bg-primary",
            !disabled &&
              !indeterminate &&
              "peer-hover:bg-fill-hover peer-active:bg-fill-press peer-checked:peer-hover:bg-primary-active peer-checked:peer-active:bg-primary-active",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
            !indeterminate && "peer-checked:[&_svg]:opacity-100",
            indeterminate &&
              !disabled &&
              (invalid
                ? "border-stroke-error-strong bg-fill-error-strong"
                : "border-primary bg-primary"),
          )}
        >
          {indeterminate ? (
            <span data-testid="checkbox-indeterminate-icon">
              <FeatherIcon name="minus" size={small ? 14 : 20} />
            </span>
          ) : (
            <FeatherIcon
              name="check"
              size={small ? 14 : 20}
              className="opacity-0"
            />
          )}
        </span>
        {label != null ? (
          <span
            className={`font-normal ${small ? "text-tiny" : "text-small"} ${
              disabled ? "text-text-disabled" : "text-fg-strong"
            }`}
          >
            {label}
          </span>
        ) : null}
      </label>
    );
  },
);
