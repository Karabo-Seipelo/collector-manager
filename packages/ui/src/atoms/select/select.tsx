"use client";

import * as React from "react";

import { FieldError } from "../field-error/field-error";
import { FieldHeader } from "../field-header/field-header";
import { cn } from "../../lib/cn";
import {
  getTextFieldBoxClassName,
  type TextFieldVisualState,
} from "../../lib/text-field-styles";
import { useFieldIds } from "../../lib/use-field-ids";
import { FeatherIcon } from "../icon/icon";

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "className"
> {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  state?: TextFieldVisualState;
  className?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      required = false,
      optional = false,
      hint,
      error,
      state = "default",
      className,
      id,
      disabled = false,
      children,
      ...rest
    },
    ref,
  ) {
    const invalid = Boolean(error) && !disabled;
    const { fieldId, hintId, errorId, describedBy } = useFieldIds(id, {
      hint,
      error: invalid ? error : undefined,
    });

    return (
      <div className={cn("flex w-full flex-col gap-1 font-body", className)}>
        <FieldHeader
          fieldId={fieldId}
          label={label}
          required={required}
          optional={optional}
          hint={hint}
          hintId={hintId}
          disabled={disabled}
        />

        {invalid && error ? <FieldError id={errorId} message={error} /> : null}

        <div
          className={getTextFieldBoxClassName({
            invalid,
            disabled,
            multiline: false,
            state,
          })}
        >
          <select
            ref={ref}
            id={fieldId}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={cn(
              "h-full w-full min-w-0 appearance-none bg-transparent px-4 pr-2 text-base leading-6 outline-none",
              "text-fg-strong",
              "disabled:cursor-not-allowed disabled:text-text-disabled",
            )}
            {...rest}
          >
            {children}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none pr-4 text-fg-weak"
          >
            <FeatherIcon name="chevron-down" size={24} />
          </span>
        </div>
      </div>
    );
  },
);
