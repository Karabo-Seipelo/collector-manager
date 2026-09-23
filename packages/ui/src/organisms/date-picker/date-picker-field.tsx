"use client";

import * as React from "react";

import { FeatherIcon } from "../../atoms/icon/icon";
import { cn } from "../../lib/cn";
import { FieldError } from "../../atoms/field-error/field-error";
import { FieldHeader } from "../../atoms/field-header/field-header";
import {
  getTextFieldBoxClassName,
  type TextFieldVisualState,
} from "../../lib/text-field-styles";
import { useFieldIds } from "../../lib/use-field-ids";

export interface DatePickerFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "defaultValue" | "onChange"
  > {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  state?: TextFieldVisualState;
  open: boolean;
  calendarId: string;
  onToggleCalendar: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  className?: string;
}

export function DatePickerField({
  label,
  value,
  onValueChange,
  required = false,
  optional = false,
  hint = "(dd/mm/yyyy)",
  error,
  state = "default",
  open,
  calendarId,
  onToggleCalendar,
  triggerRef,
  className,
  disabled = false,
  id,
  ...inputProps
}: DatePickerFieldProps) {
  const invalid = Boolean(error) && !disabled;
  const { fieldId, hintId, errorId, describedBy } = useFieldIds(id, {
    hint,
    error: invalid ? error : undefined,
  });
  const boxClassName = getTextFieldBoxClassName({
    invalid,
    disabled,
    multiline: false,
    state,
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

      <div className={boxClassName}>
        <input
          {...inputProps}
          id={fieldId}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          required={required}
          value={value}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className="h-full min-w-0 flex-1 bg-transparent px-4 text-small text-fg-strong outline-none disabled:cursor-not-allowed disabled:text-text-disabled"
          onChange={(event) => onValueChange(event.target.value)}
        />
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          aria-label="Choose date"
          aria-expanded={open}
          aria-controls={open ? calendarId : undefined}
          className="mr-4 shrink-0 text-icon-neutral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus disabled:text-text-disabled"
          onClick={onToggleCalendar}
        >
          <FeatherIcon name="calendar" size={24} />
        </button>
      </div>
    </div>
  );
}
