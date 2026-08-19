---
sidebar_position: 3
---

# Button

Primary action component with variant, tone, size, and icon support.

**Import:** `@repo/ui/atoms/button`

**Storybook:** UI/Button

## Usage

```tsx
import { Button } from "@repo/ui/atoms/button";
import { FeatherIcon } from "@repo/ui/atoms/icon";

<Button>Save changes</Button>

<Button
  variant="secondary"
  tone="neutral"
  iconLeft={<FeatherIcon name="plus" />}
>
  Add item
</Button>

<Button iconOnly={<FeatherIcon name="settings" />} aria-label="Settings" />
```

## Props

Extends native `button` attributes via `React.ButtonHTMLAttributes`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"primary"` \| `"secondary"` \| `"tertiary"` | `"primary"` | Visual style |
| `tone` | `"brand"` \| `"neutral"` \| `"destructive"` \| `"inverse"` | `"brand"` | Color intent |
| `size` | `"xsmall"` \| `"small"` \| `"medium"` \| `"large"` | `"medium"` | Height and padding |
| `iconLeft` | `ReactNode` | — | Icon before label |
| `iconRight` | `ReactNode` | — | Icon after label |
| `iconOnly` | `ReactNode` | — | Icon-only square button |
| `fullWidth` | `boolean` | `false` | Stretch to container width |
| `disabled` | `boolean` | `false` | Disable interaction |

Pass standard button props (`type`, `onClick`, `aria-*`, etc.) as usual.

## Variants

| Variant | Use case |
| --- | --- |
| `primary` | Main call to action |
| `secondary` | Secondary actions with border |
| `tertiary` | Low-emphasis / ghost actions |

## Tones

| Tone | Use case |
| --- | --- |
| `brand` | Default brand-colored actions |
| `neutral` | General UI actions |
| `destructive` | Delete or irreversible actions |
| `inverse` | Actions on dark backgrounds |

## Icons

Pass any `ReactNode` as an icon — typically `FeatherIcon`. The button sizes icons automatically per `size`.

When using `iconOnly`, always provide an **`aria-label`** so screen readers know the button's purpose.

## Accessibility

- Uses a native `<button>` element
- Supports `disabled` with reduced opacity and no pointer events
- `focus-visible:ring` styles for keyboard focus
- Icon wrappers are `aria-hidden`; label text or `aria-label` carries meaning

## Related

- [FeatherIcon](./icon)
- [ButtonGroup](./button-group)
