"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

export type RadioSize = "small" | "large";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: React.ReactNode;
  size?: RadioSize;
  invalid?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio(
    {
      label,
      size = "small",
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
    const small = size === "small";

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
          ref={ref}
          id={fieldId}
          type="radio"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className="peer sr-only"
          {...rest}
        />
        <span
          data-testid="radio-control"
          aria-hidden="true"
          className={cn(
            "grid shrink-0 place-items-center rounded-full border transition-colors",
            small ? "size-6" : "size-8",
            disabled
              ? "border-stroke-disabled bg-transparent peer-checked:bg-fill-disabled"
              : invalid
                ? "border-2 border-stroke-error-strong bg-fill-error-weak peer-checked:bg-fill-error-strong"
                : "border-stroke-strong bg-fill-inverse peer-checked:border-primary peer-checked:bg-primary",
            !disabled &&
              "peer-hover:bg-fill-hover peer-active:bg-fill-press peer-checked:peer-hover:bg-primary-active peer-checked:peer-active:bg-primary-active",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
            "peer-checked:[&>span]:opacity-100",
          )}
        >
          <span
            className={cn(
              "rounded-full bg-white opacity-0",
              small ? "size-2" : "size-3",
            )}
          />
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
