"use client";

import * as React from "react";

import { useControllableNumber } from "../../lib/use-controllable-number";
import {
  getSliderFillClassName,
  getSliderHeaderClassName,
  getSliderInputClassName,
  getSliderLabelClassName,
  getSliderRootClassName,
  getSliderThumbClassName,
  getSliderTrackAreaClassName,
  getSliderTrackClassName,
  getSliderValueClassName,
} from "./slider-styles";

function getPercent(value: number, min: number, max: number) {
  if (max <= min) {
    return 0;
  }

  return ((value - min) / (max - min)) * 100;
}

function defaultFormatValue(value: number, min: number, max: number) {
  return `${Math.round(getPercent(value, min, max))}%`;
}

export interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "type"
  > {
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  function Slider(
    {
      label,
      showValue = Boolean(label),
      formatValue,
      value,
      defaultValue = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      className,
      id,
      onChange,
      ...rest
    },
    ref,
  ) {
    const autoId = React.useId();
    const fieldId = id ?? autoId;
    const { currentValue, setCurrentValue } = useControllableNumber(
      value,
      defaultValue,
    );
    const percent = getPercent(currentValue, min, max);
    const displayValue = (formatValue ?? ((next) => defaultFormatValue(next, min, max)))(
      currentValue,
    );
    const showHeader = Boolean(label) || showValue;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = Number(event.target.value);
      setCurrentValue(nextValue);
      onValueChange?.(nextValue);
      onChange?.(event);
    };

    return (
      <div
        className={getSliderRootClassName(className, disabled)}
        data-disabled={disabled ? "" : undefined}
      >
        {showHeader ? (
          <div className={getSliderHeaderClassName()}>
            {label ? (
              <label htmlFor={fieldId} className={getSliderLabelClassName()}>
                {label}
              </label>
            ) : (
              <span className="min-w-0 flex-1" />
            )}
            {showValue ? (
              <span className={getSliderValueClassName()}>{displayValue}</span>
            ) : null}
          </div>
        ) : null}

        <div className={getSliderTrackAreaClassName()}>
          <div
            aria-hidden="true"
            className={getSliderTrackClassName()}
            data-testid="slider-track"
          />
          {!disabled && percent > 0 ? (
            <div
              aria-hidden="true"
              className={getSliderFillClassName()}
              data-testid="slider-fill"
              style={{ width: `${percent}%` }}
            />
          ) : null}
          <input
            ref={ref}
            id={fieldId}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            disabled={disabled}
            onChange={handleChange}
            className={getSliderInputClassName(disabled)}
            {...rest}
          />
          <span
            aria-hidden="true"
            className={getSliderThumbClassName()}
            data-testid="slider-thumb"
            style={{ left: `${percent}%` }}
          />
        </div>
      </div>
    );
  },
);
