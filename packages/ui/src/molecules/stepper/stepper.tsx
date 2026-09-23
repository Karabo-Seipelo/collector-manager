"use client";

import * as React from "react";

import { FeatherIcon } from "../../atoms/icon/icon";
import { FieldError } from "../../atoms/field-error/field-error";
import { FieldHeader } from "../../atoms/field-header/field-header";
import { useControllableNumber } from "../../lib/use-controllable-number";
import { useFieldIds } from "../../lib/use-field-ids";
import {
  getStepperButtonClassName,
  getStepperFieldClassName,
  getStepperInputClassName,
  getStepperRootClassName,
} from "./stepper-styles";

function clampValue(value: number, min?: number, max?: number) {
  let next = value;

  if (min !== undefined) {
    next = Math.max(min, next);
  }

  if (max !== undefined) {
    next = Math.min(max, next);
  }

  return next;
}

export interface StepperProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "type" | "size"
  > {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  decreaseLabel?: string;
  increaseLabel?: string;
}

export const Stepper = React.forwardRef<HTMLInputElement, StepperProps>(
  function Stepper(
    {
      label,
      required = false,
      optional = false,
      hint,
      error,
      value,
      defaultValue = 1,
      onValueChange,
      min,
      max,
      step = 1,
      decreaseLabel,
      increaseLabel,
      disabled = false,
      className,
      id,
      onChange,
      ...rest
    },
    ref,
  ) {
    const invalid = Boolean(error) && !disabled;
    const { fieldId, hintId, errorId, describedBy } = useFieldIds(id, {
      hint,
      error: invalid ? error : undefined,
    });
    const { currentValue, setCurrentValue } = useControllableNumber(
      value,
      defaultValue,
    );

    const commitValue = (nextValue: number) => {
      const clamped = clampValue(nextValue, min, max);
      setCurrentValue(clamped);
      onValueChange?.(clamped);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = Number(event.target.value);

      if (event.target.value === "" || Number.isNaN(parsed)) {
        onChange?.(event);
        return;
      }

      commitValue(parsed);
      onChange?.(event);
    };

    const handleStep = (direction: "decrease" | "increase") => {
      const delta = direction === "decrease" ? -step : step;
      commitValue(currentValue + delta);
    };

    const atMin = min !== undefined && currentValue <= min;
    const atMax = max !== undefined && currentValue >= max;

    return (
      <div className={getStepperRootClassName(className)}>
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
          className={getStepperFieldClassName({ invalid, disabled })}
          data-testid="stepper-field"
        >
          <button
            type="button"
            aria-label={decreaseLabel ?? `Decrease ${label}`}
            disabled={disabled || atMin}
            onClick={() => handleStep("decrease")}
            className={getStepperButtonClassName({
              side: "decrease",
              invalid,
              disabled,
            })}
          >
            <FeatherIcon name="minus" size={24} />
          </button>

          <input
            ref={ref}
            id={fieldId}
            type="number"
            inputMode="numeric"
            value={currentValue}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            onChange={handleInputChange}
            className={getStepperInputClassName(disabled)}
            {...rest}
          />

          <button
            type="button"
            aria-label={increaseLabel ?? `Increase ${label}`}
            disabled={disabled || atMax}
            onClick={() => handleStep("increase")}
            className={getStepperButtonClassName({
              side: "increase",
              invalid,
              disabled,
            })}
          >
            <FeatherIcon name="plus" size={24} />
          </button>
        </div>
      </div>
    );
  },
);
