"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import {
  getTextFieldBoxClassName,
  getTextFieldControlClassName,
  type TextFieldVisualState,
} from "../../lib/text-field-styles";
import { useControllableString } from "../../lib/use-controllable-string";

export type { TextFieldVisualState as TextareaVisualState };

export interface TextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "className" | "value" | "defaultValue" | "onChange"
  > {
  state?: TextFieldVisualState;
  invalid?: boolean;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      state = "default",
      invalid = false,
      className,
      disabled = false,
      value,
      defaultValue = "",
      onChange,
      rows = 5,
      ...rest
    },
    ref,
  ) {
    const { isControlled, currentValue, setCurrentValue } = useControllableString(
      value,
      defaultValue,
    );

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setCurrentValue(event.target.value);
      }
      onChange?.(event);
    };

    return (
      <div
        className={cn(
          getTextFieldBoxClassName({
            invalid,
            disabled,
            multiline: true,
            state,
          }),
          className,
        )}
      >
        <textarea
          ref={ref}
          disabled={disabled}
          rows={rows}
          className={getTextFieldControlClassName(true, false)}
          value={currentValue}
          onChange={handleChange}
          {...rest}
        />
      </div>
    );
  },
);
