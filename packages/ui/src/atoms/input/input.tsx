"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import {
  getTextFieldBoxClassName,
  getTextFieldControlClassName,
  textFieldClearButtonClassName,
  type TextFieldVisualState,
} from "../../lib/text-field-styles";
import { useControllableString } from "../../lib/use-controllable-string";
import { FeatherIcon } from "../icon/icon";

export type { TextFieldVisualState as InputVisualState };

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className" | "value" | "defaultValue" | "onChange"
  > {
  leadingIcon?: React.ReactNode;
  clearable?: boolean;
  state?: TextFieldVisualState;
  invalid?: boolean;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      leadingIcon,
      clearable = false,
      state = "default",
      invalid = false,
      className,
      disabled = false,
      value,
      defaultValue = "",
      onChange,
      type = "text",
      ...rest
    },
    ref,
  ) {
    const { isControlled, currentValue, setCurrentValue } = useControllableString(
      value,
      defaultValue,
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setCurrentValue(event.target.value);
      }
      onChange?.(event);
    };

    const handleClear = () => {
      if (!isControlled) {
        setCurrentValue("");
      }

      onChange?.({
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div
        className={cn(
          getTextFieldBoxClassName({
            invalid,
            disabled,
            multiline: false,
            state,
          }),
          className,
        )}
      >
        {leadingIcon ? (
          <span className="pl-4 text-fg-weak">{leadingIcon}</span>
        ) : null}

        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={getTextFieldControlClassName(false, Boolean(leadingIcon))}
          value={currentValue}
          onChange={handleChange}
          {...rest}
        />

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
    );
  },
);
