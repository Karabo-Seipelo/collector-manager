"use client";

import * as React from "react";

import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon } from "../../atoms/icon/icon";
import { cn } from "../../lib/cn";
import {
  addMonthsClamped,
  formatAccessibleDate,
  formatDate,
  formatMonthLabel,
  getCalendarWeeks,
  getNextFocusedDate,
  sameDay,
  startOfMonth,
  weekDays,
} from "./date-picker-utils";

export interface CalendarProps {
  id: string;
  viewMonth: Date;
  focusedDate: Date;
  selectedDate: Date | null;
  today: Date;
  onSelectDate: (date: Date) => void;
  onFocusedDateChange: (date: Date) => void;
  onViewMonthChange: (month: Date) => void;
  onClose: () => void;
}

export function Calendar({
  id,
  viewMonth,
  focusedDate,
  selectedDate,
  today,
  onSelectDate,
  onFocusedDateChange,
  onViewMonthChange,
  onClose,
}: CalendarProps) {
  const dayRefs = React.useRef(new Map<string, HTMLButtonElement>());
  const monthLabel = formatMonthLabel(viewMonth);
  const weeks = getCalendarWeeks(viewMonth);

  React.useEffect(() => {
    dayRefs.current.get(formatDate(focusedDate))?.focus();
  }, [focusedDate, viewMonth]);

  const moveFocus = (date: Date) => {
    onFocusedDateChange(date);
    if (
      date.getFullYear() !== viewMonth.getFullYear() ||
      date.getMonth() !== viewMonth.getMonth()
    ) {
      onViewMonthChange(startOfMonth(date));
    }
  };

  const handleDayKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    date: Date,
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    const next = getNextFocusedDate(date, event.key, event.shiftKey);
    if (next) {
      event.preventDefault();
      moveFocus(next);
    }
  };

  const navigateMonth = (amount: number) => {
    const next = addMonthsClamped(focusedDate, amount);
    onViewMonthChange(startOfMonth(next));
    onFocusedDateChange(next);
  };

  return (
    <div
      id={id}
      role="dialog"
      aria-label="Choose date"
      className="absolute top-full z-20 mt-1 w-full rounded-lg border border-stroke-weak bg-fill-inverse pb-4 shadow-overlay"
    >
      <div className="flex h-16 items-center justify-between px-3 pt-4">
        <ButtonIcon
          aria-label="Previous month"
          icon={<FeatherIcon name="arrow-left" />}
          variant="tertiary"
          tone="neutral"
          onClick={() => navigateMonth(-1)}
        />
        <h2
          className="m-0 text-heading-4 font-semibold text-fg-strong"
          aria-live="polite"
        >
          {monthLabel}
        </h2>
        <ButtonIcon
          aria-label="Next month"
          icon={<FeatherIcon name="arrow-right" />}
          variant="tertiary"
          tone="neutral"
          onClick={() => navigateMonth(1)}
        />
      </div>

      <table
        role="grid"
        aria-label={monthLabel}
        className="mx-3.5 border-collapse"
      >
        <thead>
          <tr className="border-b border-stroke-weak">
            {weekDays.map((day) => (
              <th
                key={day}
                scope="col"
                className="size-12 p-0 text-center text-tiny font-normal text-fg-weak"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex} className="h-14">
              {week.map((date, dayIndex) => (
                <td
                  key={dayIndex}
                  role="gridcell"
                  aria-selected={
                    date ? sameDay(date, selectedDate) : undefined
                  }
                  className="size-12 p-0 text-center"
                >
                  {date ? (
                    <button
                      ref={(node) => {
                        const key = formatDate(date);
                        if (node) dayRefs.current.set(key, node);
                        else dayRefs.current.delete(key);
                      }}
                      type="button"
                      aria-label={formatAccessibleDate(date)}
                      aria-current={sameDay(date, today) ? "date" : undefined}
                      aria-pressed={sameDay(date, selectedDate)}
                      tabIndex={sameDay(date, focusedDate) ? 0 : -1}
                      className={cn(
                        "relative grid size-12 place-items-center rounded-lg text-small text-fg-strong",
                        "hover:bg-fill-hover active:bg-fill-press",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus",
                        sameDay(date, selectedDate) &&
                          "bg-primary font-semibold text-primary-foreground hover:bg-primary-active active:bg-primary-active",
                        sameDay(date, today) &&
                          !sameDay(date, selectedDate) &&
                          "after:absolute after:bottom-1 after:size-2 after:rounded-full after:bg-primary",
                      )}
                      onClick={() => onSelectDate(date)}
                      onKeyDown={(event) => handleDayKeyDown(event, date)}
                    >
                      {date.getDate()}
                    </button>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
