---
sidebar_position: 8
---

# Table

Data table with sortable headers, striped rows, rich cell content, and optional pagination — matching Practical UI Table.

**Import:** `@repo/ui/organisms/table`

**Storybook:** Molecules/Table

## Usage

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableCellNumber,
  TableCellText,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "@repo/ui/organisms/table";

<Table
  aria-label="Team members"
  variant="striped"
  footer={
    <TablePagination
      currentPage={2}
      totalPages={10}
      totalItems={128}
      pageSize={10}
      onPageChange={setPage}
    />
  }
>
  <TableHeader>
    <TableRow>
      <TableHead sortable sortDirection="asc" onSort={handleSort}>
        Name
      </TableHead>
      <TableHead align="right">Score</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>
        <TableCellText bold>Ada Lovelace</TableCellText>
      </TableCell>
      <TableCell align="right">
        <TableCellNumber value="98" trend="up" />
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

Compose cells with existing atoms (`Checkbox`, `Badge`, `AvatarLabelled`, `TextLink`, etc.) or use `TableCellActions` for icon/link action columns.

## Props

### Table

| Prop          | Type                         | Default     | Description                              |
| ------------- | ---------------------------- | ----------- | ---------------------------------------- |
| `variant`     | `"default"` \| `"striped"`   | `"default"` | Striped applies `bg-fill-weaker` to even rows |
| `footer`      | `ReactNode`                  | —           | Optional footer (typically pagination)   |
| `aria-label`  | `string`                     | —           | Accessible name for the table region   |
| `className`   | `string`                     | —           | Classes on the outer wrapper             |

### TableHead

| Prop            | Type                              | Default     | Description                    |
| --------------- | --------------------------------- | ----------- | ------------------------------ |
| `align`         | `"left"` \| `"right"`             | `"left"`    | Header text alignment          |
| `padding`       | `"default"` \| `"checkbox"` \| `"actions"` | `"default"` | Column padding variant |
| `sortable`      | `boolean`                         | `false`     | Renders a sort button          |
| `sortDirection` | `"asc"` \| `"desc"`               | —           | Active sort direction          |
| `onSort`        | `() => void`                      | —           | Sort button handler            |

### TableCell

| Prop      | Type                              | Default     | Description              |
| --------- | --------------------------------- | ----------- | ------------------------ |
| `align`   | `"left"` \| `"right"`             | `"left"`    | Cell content alignment   |
| `padding` | `"default"` \| `"checkbox"` \| `"actions"` | `"default"` | Column padding variant |

### TablePagination

Thin wrapper around [`Pagination`](./pagination) with `aria-label="Table pagination"`. Accepts the same props as `Pagination`.

## Layout

- Header cells: 48px height, weak top/bottom borders, semibold tiny text
- Body cells: 80px minimum height, weak bottom border, 24px horizontal padding
- Checkbox column: 72px width, no leading padding
- Actions column: trailing padding removed, content right-aligned
- Pagination: uses the shared [`Pagination`](./pagination) molecule

## Accessibility

- Use `aria-label` on `Table` when the table needs an accessible name
- Sortable headers expose `aria-sort` and use a `<button>` for interaction
- Pagination uses `<nav aria-label="Table pagination">` with `aria-current="page"` on the active page
- Checkbox and icon actions rely on their atom-level accessible names

## Related

- [Checkbox](./checkbox)
- [Badge](./badge)
- [Avatar labelled](./avatar-labelled)
- [Text link](./text-link)
- [Button icon](./button-icon)
