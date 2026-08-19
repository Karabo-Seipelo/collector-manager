const DEFAULT_SEPARATOR = " · ";

export function formatDotList(
  value: string | string[] | undefined,
  separator = DEFAULT_SEPARATOR,
): string | null {
  if (!value) {
    return null;
  }

  const items = (Array.isArray(value) ? value : value.split(","))
    .map((item) => item.trim())
    .filter(Boolean);

  if (items.length === 0) {
    return null;
  }

  return items.join(separator);
}
