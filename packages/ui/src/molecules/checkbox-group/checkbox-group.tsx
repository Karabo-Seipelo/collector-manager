"use client";

import * as React from "react";

import {
  type CheckboxProps,
  type CheckboxSize,
} from "../../atoms/checkbox/checkbox";
import { cn } from "../../lib/cn";
import { FieldError } from "../../lib/field-error";

export interface CheckboxGroupProps
  extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "children"> {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  size?: CheckboxSize;
  children: React.ReactNode;
}

export function CheckboxGroup({
  label,
  required = false,
  optional = false,
  hint,
  error,
  size = "small",
  disabled = false,
  className,
  children,
  ...rest
}: CheckboxGroupProps) {
  const autoId = React.useId();
  const hintId = hint ? `${autoId}-hint` : undefined;
  const errorId = error ? `${autoId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const checkboxes = React.Children.map(children, (child) => {
    if (!React.isValidElement<CheckboxProps>(child)) {
      return child;
    }

    const childDescribedBy = child.props["aria-describedby"];

    return React.cloneElement(child, {
      size,
      invalid: Boolean(error),
      disabled: disabled || child.props.disabled,
      "aria-describedby":
        [childDescribedBy, errorId].filter(Boolean).join(" ") || undefined,
    });
  });

  return (
    <fieldset
      disabled={disabled}
      aria-describedby={describedBy}
      className={cn(
        "flex w-[364px] flex-col items-start border-0 p-0",
        className,
      )}
      {...rest}
    >
      <legend className="p-0 text-small font-normal text-fg-strong">
        <span>{label}</span>
        {required ? (
          <span aria-hidden="true" className="ms-1 text-fg-weak">
            *
          </span>
        ) : null}
        {optional ? (
          <span className="ms-1 text-tiny text-fg-weak">(optional)</span>
        ) : null}
      </legend>
      {hint ? (
        <p id={hintId} className="text-tiny font-normal text-fg-weak">
          {hint}
        </p>
      ) : null}
      {error ? <FieldError id={errorId} message={error} /> : null}
      <div
        data-testid="checkbox-group-list"
        className="flex w-full flex-col items-start gap-4 pt-6"
      >
        {checkboxes}
      </div>
    </fieldset>
  );
}
