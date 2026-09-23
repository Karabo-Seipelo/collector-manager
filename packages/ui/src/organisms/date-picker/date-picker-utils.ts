export const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

export function atNoon(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 12);
}

export function sameDay(left: Date | null, right: Date | null) {
  return Boolean(
    left &&
      right &&
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate(),
  );
}

export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

export function formatAccessibleDate(date: Date) {
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
  return `${date.getDate()} ${month} ${date.getFullYear()}`;
}

export function formatMonthLabel(month: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(month);
}

export function parseDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]) - 1;
  const year = Number(match[3]);
  const date = new Date(year, month, day, 12);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function addDays(date: Date, amount: number) {
  const next = atNoon(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function addMonthsClamped(date: Date, amount: number) {
  const day = date.getDate();
  const target = new Date(
    date.getFullYear(),
    date.getMonth() + amount,
    1,
    12,
  );
  const lastDay = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0,
    12,
  ).getDate();
  target.setDate(Math.min(day, lastDay));
  return target;
}

export function getCalendarWeeks(month: Date) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const leading = new Date(year, monthIndex, 1, 12).getDay();
  const dayCount = new Date(year, monthIndex + 1, 0, 12).getDate();
  const cells: Array<Date | null> = [
    ...Array.from<null>({ length: leading }).fill(null),
    ...Array.from(
      { length: dayCount },
      (_, index) => new Date(year, monthIndex, index + 1, 12),
    ),
  ];

  while (cells.length % 7) cells.push(null);

  return Array.from({ length: cells.length / 7 }, (_, index) =>
    cells.slice(index * 7, index * 7 + 7),
  );
}

export function getFocusDate(month: Date, selected: Date | null, today: Date) {
  if (
    selected &&
    selected.getFullYear() === month.getFullYear() &&
    selected.getMonth() === month.getMonth()
  ) {
    return selected;
  }
  if (
    today.getFullYear() === month.getFullYear() &&
    today.getMonth() === month.getMonth()
  ) {
    return today;
  }
  return startOfMonth(month);
}

export function getNextFocusedDate(
  date: Date,
  key: string,
  shiftKey: boolean,
): Date | null {
  if (key === "ArrowLeft") return addDays(date, -1);
  if (key === "ArrowRight") return addDays(date, 1);
  if (key === "ArrowUp") return addDays(date, -7);
  if (key === "ArrowDown") return addDays(date, 7);
  if (key === "Home") return addDays(date, -date.getDay());
  if (key === "End") return addDays(date, 6 - date.getDay());
  if (key === "PageUp") return addMonthsClamped(date, shiftKey ? -12 : -1);
  if (key === "PageDown") return addMonthsClamped(date, shiftKey ? 12 : 1);
  return null;
}
