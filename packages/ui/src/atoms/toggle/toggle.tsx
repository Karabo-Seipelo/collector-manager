"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

export type ToggleSize = "small" | "medium";

export interface ToggleProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  label?: React.ReactNode;
  size?: ToggleSize;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  function Toggle(
    { label, size = "small", className, id, disabled, ...rest },
    ref,
  ) {
    const autoId = React.useId();
    const fieldId = id ?? autoId;
    const small = size === "small";

    return (
      <label
        htmlFor={fieldId}
        className={cn(
          "inline-flex w-fit items-center",
          small ? "gap-2" : "gap-3",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          className,
        )}
      >
        <input
          ref={ref}
          id={fieldId}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className="peer sr-only"
          {...rest}
        />
        <span
          data-testid="toggle-track"
          aria-hidden="true"
          className={cn(
            "relative shrink-0 rounded-full border transition-colors",
            small ? "h-6 w-12" : "h-8 w-16",
            disabled
              ? cn(
                  "border-transparent bg-fill-weak shadow-sunken",
                  "[&>[data-testid=toggle-thumb]]:border-fill-disabled",
                  "peer-checked:bg-fill-disabled peer-checked:shadow-none",
                )
              : cn(
                  "border-stroke-strong bg-fill-weak shadow-sunken",
                  "[&>[data-testid=toggle-thumb]]:border-stroke-strong",
                  "peer-checked:border-transparent peer-checked:bg-primary peer-checked:shadow-none",
                  "peer-checked:[&>[data-testid=toggle-thumb]]:border-primary",
                  "peer-hover:bg-fill-hover peer-active:bg-fill-press",
                  "peer-checked:peer-hover:bg-primary-active peer-checked:peer-active:bg-primary-active",
                ),
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-stroke-focus",
            small
              ? "peer-checked:[&>[data-testid=toggle-thumb]]:translate-x-6"
              : "peer-checked:[&>[data-testid=toggle-thumb]]:translate-x-8",
          )}
        >
          <span
            data-testid="toggle-thumb"
            className={cn(
              // Offset by the track border so the knob aligns with its outer edge.
              "absolute -top-px -left-px rounded-full border-2 bg-fill-inverse shadow-raised transition-transform",
              small ? "size-6" : "size-8",
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
