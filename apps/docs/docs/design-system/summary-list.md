---
sidebar_position: 7.9
---

# Summary list

Review list of term/description pairs with optional row actions, matching Practical UI Summary list.

**Import:** `@repo/ui/molecules/summary-list`

**Storybook:** Molecules/SummaryList

## Usage

```tsx
import { SummaryList } from "@repo/ui/molecules/summary-list";

<SummaryList
  aria-label="Order summary"
  items={[
    {
      term: "Email",
      description: "john@example.com",
      action: { type: "link", label: "Change", href: "/settings/email" },
    },
    {
      term: "Plan",
      description: "Pro",
      action: {
        type: "links",
        links: [
          { type: "link", label: "Copy", href: "#copy" },
          { type: "link", label: "Delete", href: "#delete" },
        ],
      },
    },
  ]}
/>
```

Icon actions:

```tsx
<SummaryList
  aria-label="Files"
  items={[
    {
      term: "Invoice.pdf",
      description: "Uploaded today",
      action: {
        type: "icons",
        icons: [
          { label: "Copy", icon: "copy", onClick: handleCopy },
          { label: "Download", icon: "download", onClick: handleDownload },
          { label: "Delete", icon: "trash-2", onClick: handleDelete },
        ],
      },
    },
  ]}
/>
```

Pass custom `action` nodes for bespoke controls.

## Props

| Prop         | Type                 | Default | Description                          |
| ------------ | -------------------- | ------- | ------------------------------------ |
| `items`      | `SummaryListItem[]`  | —       | Rows to render (required)            |
| `aria-label` | `string`             | —       | Accessible name for the list         |
| `className`  | `string`             | —       | Additional classes on the root `<dl>`|

### SummaryListItem

| Prop          | Type                | Description                              |
| ------------- | ------------------- | ---------------------------------------- |
| `id`          | `string`            | Stable key for the row                   |
| `term`        | `ReactNode`         | Left column label (required)             |
| `description` | `ReactNode`         | Middle column value (required)           |
| `action`      | `SummaryListAction` | Optional right column action             |

### SummaryListAction

| Shape                                              | Description                                      |
| -------------------------------------------------- | ------------------------------------------------ |
| `{ type: "link"; label; href }`                    | Single brand text link                           |
| `{ type: "links"; links: SummaryListLinkAction[] }`| Multiple text links with 16px gap                |
| `{ type: "icons"; icons: SummaryListIconAction[] }`| Tertiary icon buttons (48px, 24px icons)         |
| `ReactNode`                                        | Custom action content                            |

## Layout

- Top border plus row dividers using weak stroke
- 80px minimum row height with three equal-width columns
- Term: semibold small text in weak colour, 24px trailing padding
- Description: regular small text in weak colour
- Actions: right-aligned with 24px leading padding

## Accessibility

- Uses a description list (`<dl>`) with grouped `<dt>` / `<dd>` rows
- Provide `aria-label` when the list needs an accessible name
- Link and icon actions expose accessible names via `TextLink` and `ButtonIcon`

## Related

- [Text link](./text-link)
- [Button icon](./button-icon)
- [Divider](./divider)
