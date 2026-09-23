"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import type { TextFieldVisualState } from "../../lib/text-field-styles";
import { Calendar } from "./calendar";
import { DatePickerField } from "./date-picker-field";
import {
  atNoon,
  formatDate,
  getFocusDate,
  parseDate,
  startOfMonth,
} from "./date-picker-utils";

export interface DatePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "defaultValue" | "onChange"
  > {
  label: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  state?: TextFieldVisualState;
  defaultOpen?: boolean;
  initialMonth?: Date;
  className?: string;
}

export function DatePicker({
  label,
  value,
  defaultValue = "",
  onValueChange,
  required = false,
  optional = false,
  hint = "(dd/mm/yyyy)",
  error,
  state = "default",
  defaultOpen = false,
  initialMonth,
  className,
  disabled = false,
  id,
  ...inputProps
}: DatePickerProps) {
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = controlled ? value : internalValue;
  const selectedDate = parseDate(currentValue);
  const today = atNoon(new Date());
  const startingMonth = selectedDate ?? initialMonth ?? today;
  const [viewMonth, setViewMonth] = React.useState(() =>
    startOfMonth(startingMonth),
  );
  const [focusedDate, setFocusedDate] = React.useState(() =>
    getFocusDate(startOfMonth(startingMonth), selectedDate, today),
  );
  const [open, setOpen] = React.useState(defaultOpen && !disabled);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const calendarId = `${React.useId()}-calendar`;

  React.useEffect(() => {
    if (!open) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [open]);

  const updateValue = (next: string) => {
    if (!controlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const openCalendar = () => {
    if (disabled) return;
    const parsed = parseDate(currentValue);
    const nextMonth = startOfMonth(parsed ?? initialMonth ?? today);
    setViewMonth(nextMonth);
    setFocusedDate(getFocusDate(nextMonth, parsed, today));
    setOpen(true);
  };

  const closeCalendar = (restoreTrigger = false) => {
    setOpen(false);
    if (restoreTrigger) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  };

  const selectDate = (date: Date) => {
    updateValue(formatDate(date));
    closeCalendar(true);
  };

  const toggleCalendar = () => {
    if (open) closeCalendar();
    else openCalendar();
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative flex w-full flex-col gap-1 font-body", className)}
    >
      <DatePickerField
        {...inputProps}
        id={id}
        label={label}
        value={currentValue}
        onValueChange={updateValue}
        required={required}
        optional={optional}
        hint={hint}
        error={error}
        state={state}
        disabled={disabled}
        open={open}
        calendarId={calendarId}
        onToggleCalendar={toggleCalendar}
        triggerRef={triggerRef}
      />

      {open && !disabled ? (
        <Calendar
          id={calendarId}
          viewMonth={viewMonth}
          focusedDate={focusedDate}
          selectedDate={selectedDate}
          today={today}
          onSelectDate={selectDate}
          onFocusedDateChange={setFocusedDate}
          onViewMonthChange={setViewMonth}
          onClose={() => closeCalendar(true)}
        />
      ) : null}
    </div>
  );
}
