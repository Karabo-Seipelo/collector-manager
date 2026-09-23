"use client";

import * as React from "react";

import { FieldError } from "../../atoms/field-error/field-error";
import { FieldHeader } from "../../atoms/field-header/field-header";
import { Input } from "../../atoms/input/input";
import { Textarea } from "../../atoms/textarea/textarea";
import { cn } from "../../lib/cn";
import { type TextFieldVisualState } from "../../lib/text-field-styles";
import { useFieldIds } from "../../lib/use-field-ids";

export type { TextFieldVisualState };

type TextFieldBaseProps = {
  label?: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  clearable?: boolean;
  state?: TextFieldVisualState;
  className?: string;
};

type InputTextFieldProps = TextFieldBaseProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className" | "value" | "defaultValue" | "onChange"
  > & {
    multiline?: false;
    value?: string;
    defaultValue?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  };

type TextareaTextFieldProps = TextFieldBaseProps &
  Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "className" | "value" | "defaultValue" | "onChange"
  > & {
    multiline: true;
    value?: string;
    defaultValue?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  };

export type TextFieldProps = InputTextFieldProps | TextareaTextFieldProps;

export function TextField(props: TextFieldProps) {
  const {
    label,
    required = false,
    optional = false,
    hint,
    error,
    leadingIcon,
    clearable = false,
    state = "default",
    className,
    multiline = false,
    disabled = false,
    id,
    value,
    defaultValue,
    onChange,
    ...rest
  } = props;

  const invalid = Boolean(error) && !disabled;
  const { fieldId, hintId, errorId, describedBy } = useFieldIds(id, {
    hint,
    error: invalid ? error : undefined,
  });

  const controlProps = {
    id: fieldId,
    disabled,
    invalid,
    state,
    value: value as string | undefined,
    defaultValue: defaultValue as string | undefined,
    "aria-invalid": invalid || undefined,
    "aria-describedby": describedBy,
  };

  return (
    <div className={cn("flex w-full flex-col gap-1 font-body", className)}>
      {label ? (
        <FieldHeader
          fieldId={fieldId}
          label={label}
          required={required}
          optional={optional}
          hint={hint}
          hintId={hintId}
          disabled={disabled}
        />
      ) : null}

      {invalid && error ? <FieldError id={errorId} message={error} /> : null}

      {multiline ? (
        <Textarea
          {...(rest as Omit<
            React.TextareaHTMLAttributes<HTMLTextAreaElement>,
            "value" | "defaultValue" | "onChange"
          >)}
          {...controlProps}
          rows={"rows" in props ? props.rows : 5}
          onChange={onChange as TextareaTextFieldProps["onChange"]}
        />
      ) : (
        <Input
          {...(rest as Omit<
            React.InputHTMLAttributes<HTMLInputElement>,
            "value" | "defaultValue" | "onChange"
          >)}
          {...controlProps}
          leadingIcon={leadingIcon}
          clearable={clearable}
          type={"type" in props ? (props.type ?? "text") : "text"}
          onChange={onChange as InputTextFieldProps["onChange"]}
        />
      )}
    </div>
  );
}

export default TextField;
