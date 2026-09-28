---
sidebar_position: 19
---

# Pagination

Navigate paginated content with Previous/Next controls, numbered pages, and a range summary on desktop; a compact prev/next layout on mobile — matching Practical UI Pagination.

**Import:** `@repo/ui/molecules/pagination`

**Storybook:** Molecules/Pagination

## Usage

```tsx
import { Pagination } from "@repo/ui/molecules/pagination";

<Pagination
  currentPage={2}
  totalPages={10}
  totalItems={128}
  pageSize={10}
  onPageChange={setPage}
/>
```

Use inside a table footer via `TablePagination` from `@repo/ui/organisms/table`, which wraps this component with a table-specific accessible name.

## Props

| Prop            | Type                     | Default        | Description                          |
| --------------- | ------------------------ | -------------- | ------------------------------------ |
| `currentPage`   | `number`                 | —              | Active page (1-based)                |
| `totalPages`    | `number`                 | —              | Total page count                     |
| `totalItems`    | `number`                 | —              | Total item count for range summary   |
| `pageSize`      | `number`                 | —              | Items per page for range summary     |
| `onPageChange`  | `(page: number) => void` | —              | Page selection handler               |
| `aria-label`    | `string`                 | `"Pagination"` | Accessible name for the nav region   |
| `className`     | `string`                 | —              | Classes on the root `<nav>`          |

When `totalItems` and `pageSize` are omitted, the desktop range summary is hidden.

The component is responsive: it uses a single layout that adapts based on container width (`@container` + `@md`) and viewport (`md:`). Resize the container or viewport to switch between layouts.

## Layout

- **Desktop (≥768px container or viewport):** Previous link, numbered pages with ellipsis, Next link, and optional `Showing X - Y of Z` summary
- **Mobile (under 768px):** Arrow icons (16px), “current page of total pages” centered status, full-width row with 16px gaps — no page numbers or range summary
- Selected page: 40×40 cell with `border-stroke-strong` and 8px radius
- Unselected pages: no border until hover/focus
- Control spacing: 8px between all desktop controls; 16px padding before Previous and after Next

## Accessibility

- Root element is `<nav>` with configurable `aria-label`
- Active page uses `aria-current="page"`
- Previous/Next use `TextLink` with disabled state on first/last page
- Mobile prev/next are icon buttons with explicit labels

## Related

- [Table](./table)
- [Text link](./text-link)
