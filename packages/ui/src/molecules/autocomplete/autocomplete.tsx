"use client";

import * as React from "react";

import { FeatherIcon } from "../../atoms/icon/icon";
import { FieldError } from "../../atoms/field-error/field-error";
import { FieldHeader } from "../../atoms/field-header/field-header";
import { cn } from "../../lib/cn";
import {
  getTextFieldBoxClassName,
  type TextFieldVisualState,
} from "../../lib/text-field-styles";
import { useFieldIds } from "../../lib/use-field-ids";

export interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AutocompleteBaseProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "type"
  > {
  label: string;
  options: AutocompleteOption[];
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  state?: TextFieldVisualState;
  placeholder?: string;
  noResultsText?: string;
  defaultOpen?: boolean;
  className?: string;
}

interface SingleAutocompleteProps extends AutocompleteBaseProps {
  type?: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface MultipleAutocompleteProps extends AutocompleteBaseProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type AutocompleteProps =
  | SingleAutocompleteProps
  | MultipleAutocompleteProps;

export function Autocomplete(props: AutocompleteProps) {
  const {
    label,
    options,
    required = false,
    optional = false,
    hint = "Start typing to search",
    error,
    state = "default",
    placeholder = "",
    noResultsText = "No results",
    defaultOpen = false,
    className,
    disabled = false,
    id,
    type = "single",
    ...inputProps
  } = props;
  const multiple = type === "multiple";
  const controlled = props.value !== undefined;
  const initialValue = multiple
    ? ((props.defaultValue ?? []) as string[])
    : ((props.defaultValue ?? "") as string);
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    initialValue,
  );
  const selectedValue = controlled ? props.value : internalValue;
  const selectedValues = multiple
    ? ((selectedValue ?? []) as string[])
    : [];
  const selectedSingle = multiple ? "" : ((selectedValue ?? "") as string);
  const selectedOption = options.find(
    (option) => option.value === selectedSingle,
  );
  const [query, setQuery] = React.useState(selectedOption?.label ?? "");
  const [open, setOpen] = React.useState(defaultOpen);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const listboxId = `${React.useId()}-listbox`;
  const { fieldId, hintId, errorId, describedBy } = useFieldIds(id, {
    hint,
    error: error && !disabled ? error : undefined,
  });
  const invalid = Boolean(error) && !disabled;

  React.useEffect(() => {
    if (!multiple && !open) {
      setQuery(selectedOption?.label ?? "");
    }
  }, [multiple, open, selectedOption?.label]);

  React.useEffect(() => {
    if (!open) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [open]);

  const filteredOptions = options.filter((option) =>
    option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  const enabledOptions = filteredOptions.filter((option) => !option.disabled);
  const activeOption = enabledOptions[activeIndex];

  const updateValue = (next: string | string[]) => {
    if (!controlled) setInternalValue(next);
    if (multiple) {
      (props as MultipleAutocompleteProps).onValueChange?.(next as string[]);
    } else {
      (props as SingleAutocompleteProps).onValueChange?.(next as string);
    }
  };

  const selectOption = (option: AutocompleteOption) => {
    if (option.disabled) return;
    if (multiple) {
      const next = selectedValues.includes(option.value)
        ? selectedValues.filter((value) => value !== option.value)
        : [...selectedValues, option.value];
      updateValue(next);
      setQuery("");
      setOpen(true);
    } else {
      updateValue(option.value);
      setQuery(option.label);
      setOpen(false);
    }
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) =>
        Math.min(index + 1, enabledOptions.length - 1),
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && open && activeOption) {
      event.preventDefault();
      selectOption(activeOption);
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    } else if (
      event.key === "Backspace" &&
      multiple &&
      !query &&
      selectedValues.length
    ) {
      updateValue(selectedValues.slice(0, -1));
    }
    inputProps.onKeyDown?.(event);
  };

  const boxClassName = getTextFieldBoxClassName({
    invalid,
    disabled,
    multiline: false,
    state,
  });

  return (
    <div
      ref={rootRef}
      className={cn("relative flex w-full flex-col gap-1 font-body", className)}
    >
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

      <div className={cn(boxClassName, multiple && "h-auto min-h-12")}>
        <span className="pl-4 text-icon-neutral">
          <FeatherIcon name="search" size={24} />
        </span>
        {multiple && selectedValues.length ? (
          <div className="flex min-w-0 flex-wrap gap-1 py-1">
            {selectedValues.map((value) => {
              const option = options.find((item) => item.value === value);
              if (!option) return null;
              return (
                <span
                  key={value}
                  className="inline-flex h-8 items-center gap-1 rounded-2xl border border-stroke-weak bg-fill-weak px-2 text-tiny text-fg-strong"
                >
                  {option.label}
                  <button
                    type="button"
                    aria-label={`Remove ${option.label}`}
                    disabled={disabled}
                    className="inline-flex size-4 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-stroke-focus"
                    onClick={() =>
                      updateValue(
                        selectedValues.filter((item) => item !== value),
                      )
                    }
                  >
                    <FeatherIcon name="x" size={14} />
                  </button>
                </span>
              );
            })}
          </div>
        ) : null}
        <input
          {...inputProps}
          id={fieldId}
          role="combobox"
          type="text"
          value={query}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={
            activeOption ? `${listboxId}-${activeOption.value}` : undefined
          }
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className="h-12 min-w-[4rem] flex-1 bg-transparent pr-4 text-small text-fg-strong outline-none placeholder:text-fg-weak disabled:cursor-not-allowed disabled:text-text-disabled"
          onFocus={(event) => {
            setOpen(true);
            inputProps.onFocus?.(event);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
            if (!multiple && selectedSingle) updateValue("");
          }}
          onKeyDown={handleKeyDown}
        />
        {(query || selectedValues.length > 0) && !disabled ? (
          <button
            type="button"
            aria-label="Clear selection"
            className="pr-4 text-icon-neutral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus"
            onClick={() => {
              updateValue(multiple ? [] : "");
              setQuery("");
            }}
          >
            <FeatherIcon name="x" size={24} />
          </button>
        ) : null}
      </div>

      {open && !disabled ? (
        <div
          id={listboxId}
          role="listbox"
          aria-multiselectable={multiple || undefined}
          className="absolute top-full z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-stroke-weak bg-fill-inverse py-1 shadow-raised"
        >
          {filteredOptions.length ? (
            filteredOptions.map((option) => {
              const selected = multiple
                ? selectedValues.includes(option.value)
                : selectedSingle === option.value;
              const optionActive = activeOption?.value === option.value;
              return (
                <button
                  key={option.value}
                  id={`${listboxId}-${option.value}`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={option.disabled}
                  className={cn(
                    "flex min-h-12 w-full items-center gap-3 px-4 text-left text-small text-fg-strong",
                    "hover:bg-fill-hover focus:bg-fill-hover focus:outline-none active:bg-fill-press",
                    (selected || optionActive) && "bg-fill-brand-weak",
                    option.disabled && "cursor-not-allowed text-text-disabled",
                  )}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option)}
                >
                  {multiple ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-6 shrink-0 place-items-center rounded border",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-stroke-strong bg-fill-inverse",
                      )}
                    >
                      {selected ? <FeatherIcon name="check" size={14} /> : null}
                    </span>
                  ) : null}
                  {option.label}
                </button>
              );
            })
          ) : (
            <p className="px-4 py-3 text-small text-fg-weak">
              {noResultsText}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
