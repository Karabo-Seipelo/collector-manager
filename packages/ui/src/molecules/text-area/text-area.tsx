"use client";

import * as React from "react";

import { FieldError } from "../../atoms/field-error/field-error";
import { FieldHeader } from "../../atoms/field-header/field-header";
import { Textarea } from "../../atoms/textarea/textarea";
import { cn } from "../../lib/cn";
import { type TextFieldVisualState } from "../../lib/text-field-styles";
import { useFieldIds } from "../../lib/use-field-ids";

export type { TextFieldVisualState };

export interface TextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "className" | "value" | "defaultValue" | "onChange"
  > {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  state?: TextFieldVisualState;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export function TextArea({
  label,
  required = false,
  optional = false,
  hint,
  error,
  state = "default",
  className,
  id,
  disabled = false,
  value,
  defaultValue,
  onChange,
  ...rest
}: TextAreaProps) {
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

      <Textarea
        id={fieldId}
        disabled={disabled}
        invalid={invalid}
        state={state}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        {...rest}
      />
    </div>
  );
}

export default TextArea;
