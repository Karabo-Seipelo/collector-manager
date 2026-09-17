"use client";

import * as React from "react";

import { FeatherIcon } from "../icon/icon";
import { cn } from "../../lib/cn";
import { FieldError } from "../../lib/field-error";
import { FieldHeader } from "../../lib/field-header";
import {
  getTextFieldBoxClassName,
  getTextFieldControlClassName,
  textFieldClearButtonClassName,
  type TextFieldVisualState,
} from "../../lib/text-field-styles";
import { useControllableString } from "../../lib/use-controllable-string";
import { useFieldIds } from "../../lib/use-field-ids";

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
    defaultValue = "",
    onChange,
    ...rest
  } = props;

  const { fieldId, hintId, errorId, describedBy } = useFieldIds(id, {
    hint,
    error,
  });
  const { isControlled, currentValue, setCurrentValue } = useControllableString(
    value,
    defaultValue,
  );
  const invalid = Boolean(error);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!isControlled) {
      setCurrentValue(event.target.value);
    }

    if (multiline) {
      (onChange as TextareaTextFieldProps["onChange"] | undefined)?.(
        event as React.ChangeEvent<HTMLTextAreaElement>,
      );
    } else {
      (onChange as InputTextFieldProps["onChange"] | undefined)?.(
        event as React.ChangeEvent<HTMLInputElement>,
      );
    }
  };

  const handleClear = () => {
    if (!isControlled) {
      setCurrentValue("");
    }

    if (multiline) {
      (onChange as TextareaTextFieldProps["onChange"] | undefined)?.({
        target: { value: "" },
        currentTarget: { value: "" },
      } as unknown as React.ChangeEvent<HTMLTextAreaElement>);
    } else {
      (onChange as InputTextFieldProps["onChange"] | undefined)?.({
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const boxClassName = getTextFieldBoxClassName({
    invalid,
    disabled,
    multiline,
    state,
  });

  const controlClassName = getTextFieldControlClassName(
    multiline,
    Boolean(leadingIcon),
  );

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

      <div className={boxClassName}>
        {leadingIcon ? (
          <span className="pl-4 text-fg-weak">{leadingIcon}</span>
        ) : null}

        {multiline ? (
          <textarea
            id={fieldId}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={controlClassName}
            value={currentValue}
            onChange={handleChange}
            rows={"rows" in props ? props.rows : 5}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={fieldId}
            type={"type" in props ? (props.type ?? "text") : "text"}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={controlClassName}
            value={currentValue}
            onChange={handleChange}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {clearable && currentValue && !disabled ? (
          <button
            type="button"
            aria-label="Clear"
            onClick={handleClear}
            className={textFieldClearButtonClassName}
          >
            <FeatherIcon name="x" size={24} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default TextField;
