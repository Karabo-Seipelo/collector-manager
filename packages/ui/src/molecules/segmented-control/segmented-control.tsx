"use client";

import * as React from "react";

import { useControllableString } from "../../lib/use-controllable-string";
import {
  getSegmentedControlIconClassName,
  getSegmentedControlItemClassName,
  getSegmentedControlLabelClassName,
  getSegmentedControlTrackClassName,
  type SegmentedControlSize,
} from "./segmented-control-styles";

export type { SegmentedControlSize };

export interface SegmentedControlOption {
  value: string;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  "aria-label"?: string;
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: SegmentedControlSize;
  disabled?: boolean;
  "aria-label": string;
}

function getNextIndex(
  currentIndex: number,
  direction: "next" | "prev" | "first" | "last",
  length: number,
) {
  if (length === 0) {
    return -1;
  }

  switch (direction) {
    case "first":
      return 0;
    case "last":
      return length - 1;
    case "next":
      return (currentIndex + 1) % length;
    case "prev":
      return (currentIndex - 1 + length) % length;
  }
}

function getFirstEnabledIndex(options: SegmentedControlOption[]) {
  return options.findIndex((option) => !option.disabled);
}

function getLastEnabledIndex(options: SegmentedControlOption[]) {
  for (let index = options.length - 1; index >= 0; index -= 1) {
    if (!options[index]?.disabled) {
      return index;
    }
  }

  return -1;
}

function getEnabledIndex(
  options: SegmentedControlOption[],
  startIndex: number,
  direction: "next" | "prev",
) {
  if (options.length === 0) {
    return -1;
  }

  let index = startIndex;

  for (let step = 0; step < options.length; step += 1) {
    index = getNextIndex(index, direction, options.length);

    if (!options[index]?.disabled) {
      return index;
    }
  }

  return startIndex;
}

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  size = "medium",
  disabled = false,
  className,
  "aria-label": ariaLabel,
  ...rest
}: SegmentedControlProps) {
  const fallbackValue = defaultValue ?? options[0]?.value ?? "";
  const { currentValue, setCurrentValue } = useControllableString(
    value,
    fallbackValue,
  );
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const selectValue = (nextValue: string) => {
    setCurrentValue(nextValue);
    onValueChange?.(nextValue);
  };

  const focusItem = (index: number) => {
    itemRefs.current[index]?.focus();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (disabled) {
      return;
    }

    let nextIndex = -1;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = getEnabledIndex(options, index, "next");
        if (nextIndex !== index) {
          event.preventDefault();
          selectValue(options[nextIndex]!.value);
          focusItem(nextIndex);
        }
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = getEnabledIndex(options, index, "prev");
        if (nextIndex !== index) {
          event.preventDefault();
          selectValue(options[nextIndex]!.value);
          focusItem(nextIndex);
        }
        break;
      case "Home":
        nextIndex = getFirstEnabledIndex(options);
        if (nextIndex >= 0) {
          event.preventDefault();
          selectValue(options[nextIndex]!.value);
          focusItem(nextIndex);
        }
        break;
      case "End":
        nextIndex = getLastEnabledIndex(options);
        if (nextIndex >= 0) {
          event.preventDefault();
          selectValue(options[nextIndex]!.value);
          focusItem(nextIndex);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={getSegmentedControlTrackClassName(className)}
      {...rest}
    >
      {options.map((option, index) => {
        const selected = option.value === currentValue;
        const itemDisabled = disabled || option.disabled;
        const label = option.label ?? option["aria-label"] ?? option.value;

        return (
          <button
            key={option.value}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={option.icon && !option.label ? option["aria-label"] : undefined}
            disabled={itemDisabled}
            tabIndex={selected ? 0 : -1}
            onClick={() => {
              if (!itemDisabled) {
                selectValue(option.value);
              }
            }}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={getSegmentedControlItemClassName({
              selected,
              size,
              disabled: Boolean(itemDisabled),
            })}
          >
            {option.icon ? (
              <span
                aria-hidden="true"
                className={getSegmentedControlIconClassName(size)}
              >
                {option.icon}
              </span>
            ) : null}
            {option.label ? (
              <span className={getSegmentedControlLabelClassName(size)}>
                {option.label}
              </span>
            ) : null}
            {!option.label && !option.icon ? (
              <span className={getSegmentedControlLabelClassName(size)}>
                {label}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
