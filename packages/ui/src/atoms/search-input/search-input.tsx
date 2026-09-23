"use client";

import * as React from "react";

import { FeatherIcon } from "../icon/icon";
import { cn } from "../../lib/cn";
import type { TextFieldVisualState } from "../../lib/text-field-styles";
import { useControllableString } from "../../lib/use-controllable-string";
import {
  getSearchButtonClassName,
  getSearchClearButtonClassName,
  getSearchFieldClassName,
  getSearchFieldPadding,
  getSearchGroupClassName,
  getSearchInputClassName,
  type SearchInputSize,
  type SearchInputVariant,
} from "./search-input-styles";

export type { SearchInputSize, SearchInputVariant };

export interface SearchInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className" | "value" | "defaultValue" | "onChange" | "size"
  > {
  variant?: SearchInputVariant;
  size?: SearchInputSize;
  clearable?: boolean;
  searchLabel?: string;
  state?: TextFieldVisualState;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      variant = "default",
      size = "medium",
      clearable = true,
      searchLabel = "Search",
      state = "default",
      disabled = false,
      placeholder = "Search",
      "aria-label": ariaLabel = "Search",
      value,
      defaultValue = "",
      onChange,
      onSearch,
      onClear,
      className,
      ...rest
    },
    ref,
  ) {
    const { isControlled, currentValue, setCurrentValue } =
      useControllableString(value, defaultValue);
    const iconSize = size === "medium" ? 24 : 16;
    const showClear = clearable && Boolean(currentValue) && !disabled;

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
      onClear?.();
    };

    const submitSearch = () => {
      onSearch?.(currentValue);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitSearch();
    };

    const field = (
      <div
        data-testid="search-input-field"
        className={cn(
          getSearchFieldClassName({ variant, size, disabled, state }),
          getSearchFieldPadding(size),
        )}
      >
        <FeatherIcon
          name="search"
          size={iconSize}
          className={cn(
            "shrink-0",
            disabled ? "text-text-disabled" : "text-icon-neutral",
          )}
        />
        <input
          ref={ref}
          type="search"
          disabled={disabled}
          aria-label={ariaLabel}
          placeholder={placeholder}
          className={getSearchInputClassName(size)}
          value={currentValue}
          onChange={handleChange}
          {...rest}
        />
        {showClear ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={handleClear}
            className={getSearchClearButtonClassName(size)}
          >
            <FeatherIcon name="x" size={iconSize} />
          </button>
        ) : null}
      </div>
    );

    if (variant === "button") {
      return (
        <form
          role="search"
          onSubmit={handleSubmit}
          className={cn(
            getSearchGroupClassName({ variant, disabled, state }),
            className,
          )}
        >
          {field}
          <button
            type="submit"
            disabled={disabled}
            className={getSearchButtonClassName(size)}
          >
            {searchLabel}
          </button>
        </form>
      );
    }

    return (
      <div
        role="search"
        className={cn(
          getSearchGroupClassName({ variant, disabled, state }),
          className,
        )}
      >
        {field}
      </div>
    );
  },
);
