---
sidebar_position: 6
---

# ItemCard

Displays a collection item with an image area, title, optional metadata, and price. Used for grids and lists of items in the collection manager.

**Import:** `@repo/ui/molecules/card`

**Storybook:** Molecules/ItemCard

## Usage

```tsx
import { ItemCard } from "@repo/ui/molecules/card";

<ItemCard
  title="Kind of Blue"
  meta={["Vinyl", "1959", "NM"]}
  price="$120.00"
/>

<ItemCard
  title="Blue Train"
  meta="Vinyl, 1959, NM"
  price="$95.00"
/>

<ItemCard
  title="Leica M6"
  meta="Mint condition, 1984, Excellent"
  price="$2,400.00"
  imageSrc="/images/leica-m6.jpg"
  imageAlt="Leica M6 camera"
/>

<ItemCard
  title="Polaroid camera"
  meta="Collection A"
  price="$65.00"
  onClick={() => console.log("Open item")}
/>
```

With an overlay badge:

```tsx
<ItemCard
  title="Instant camera"
  meta="Collection B"
  price="$85.00"
  imageSrc="/images/instant.jpg"
  imageAlt="Instant camera"
  overlay={
    <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-fg-strong">
      New
    </span>
  }
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | required | Item name |
| `meta` | `string \| string[]` | — | Secondary metadata; comma-separated string or array, displayed as `Vinyl · 1959 · NM` |
| `price` | `string` | — | Price or value label |
| `imageSrc` | `string` | — | Image URL; shows placeholder icon when omitted |
| `imageAlt` | `string` | `""` | Alt text for the item image |
| `overlay` | `ReactNode` | — | Content positioned over the image area (badges, actions) |
| `onClick` | `() => void` | — | Makes the card interactive; renders as a `<button>` |
| `className` | `string` | — | Additional CSS classes on the root element |

Set `meta` as an array or comma-separated string when generating item data. A single value without commas renders as plain text.

```tsx
meta={["Vinyl", "1959", "NM"]}   // Vinyl · 1959 · NM
meta="Vinyl, 1959, NM"           // Vinyl · 1959 · NM
meta="Added 2 days ago"           // Added 2 days ago
```

## Layout

The card is a vertical stack:

1. **Image area** — fixed 190px height, `rounded-card` corners, `bg-fill-weak` background
2. **Text block** — title (`text-small`), optional meta (`text-tiny`, muted, items joined with ` · `), optional price (`text-tiny`, semibold)

Set a width on the parent container (e.g. `w-[220px]`) — the card stretches to `w-full`.

## Behavior

| Condition | Root element | Notes |
| --- | --- | --- |
| No `onClick` | `<div>` | Static display |
| With `onClick` | `<button type="button">` | Keyboard focusable with visible focus ring |

When `imageSrc` is not provided, a placeholder icon is shown in the image area via the [ImagePlaceholder](./image-placeholder) atom.

## Design tokens

ItemCard uses semantic tokens from [Design tokens](./tokens):

| Token | Usage |
| --- | --- |
| `bg-fill-weak` | Image placeholder background |
| `rounded-card` | Image corner radius |
| `text-fg-strong` | Title and price |
| `text-fg-weak` | Meta line |
| `text-small` / `text-tiny` | Typography scale |
| `font-body` | Body font stack |

## Accessibility

- When using `onClick`, the card becomes a button — ensure the action is clear from `title` or surrounding context
- Always provide `imageAlt` when `imageSrc` is set
- Place decorative overlay content with appropriate `aria-hidden` if it duplicates visible text
- For icon-only or ambiguous actions, consider an visible label in `title` or `meta`

## Storybook stories

| Story | Description |
| --- | --- |
| Default | Title, meta, and price with placeholder image |
| TitleOnly | Title without meta or price |
| WithImage | Full card with photo |
| Clickable | Interactive card with `onClick` |
| WithOverlay | Badge overlay on image |
| Grid | Three cards in a grid layout |

## Related

- [Design tokens](./tokens)
- [Design system overview](./overview)
