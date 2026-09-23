---
sidebar_position: 3
---

# Button

Used to trigger actions. The button type indicates the importance of the
action.

**Import:** `@repo/ui/atoms/button`

**Storybook:** Atoms/Button

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

| Prop        | Type                                                       | Default     | Description                |
| ----------- | ---------------------------------------------------------- | ----------- | -------------------------- |
| `variant`   | `"primary"` \| `"secondary"` \| `"tertiary"`               | `"primary"` | Visual style               |
| `tone`      | `"brand"` \| `"neutral"` \| `"destructive"` \| `"inverse"` | `"brand"`   | Color intent               |
| `size`      | `"small"` \| `"medium"` \| `"large"`                      | `"medium"`  | Height, type, radius, and icons |
| `iconLeft`  | `ReactNode`                                                | —           | Icon before label          |
| `iconRight` | `ReactNode`                                                | —           | Icon after label           |
| `iconOnly`  | `ReactNode`                                                | —           | Icon-only square button    |
| `fullWidth` | `boolean`                                                  | `false`     | Stretch to container width |
| `disabled`  | `boolean`                                                  | `false`     | Disable interaction        |

Pass standard button props (`type`, `onClick`, `aria-*`, etc.) as usual.

## Shared types

`ButtonType`, `ButtonTone`, and `ButtonSize` are defined in `@repo/ui/lib/button-types` and re-exported from the Button module. [ButtonGroup](./button-group) imports the same types so size and tone props stay in sync.

```ts
import type { ButtonType, ButtonTone, ButtonSize } from "@repo/ui/atoms/button";
// or
import type { ButtonTone, ButtonSize } from "@repo/ui/lib/button-types";
```

## Variants

| Variant     | Use case                      |
| ----------- | ----------------------------- |
| `primary`   | Main call to action           |
| `secondary` | Secondary actions with border |
| `tertiary`  | Underlined text action        |

## Tones

| Tone          | Use case                       |
| ------------- | ------------------------------ |
| `brand`       | Default brand-colored actions  |
| `neutral`     | General UI actions             |
| `destructive` | Delete or irreversible actions |
| `inverse`     | Actions on dark backgrounds    |

## Icons

Pass any `ReactNode` as an icon — typically `FeatherIcon`. The button sizes icons automatically per `size`.

When using `iconOnly`, always provide an **`aria-label`**. For the Figma icon-button component (circle shape, badges, 24px medium icon), use [ButtonIcon](./button-icon).

## Sizes

| Size       | Height | Horizontal padding | Type          | Radius | Icon |
| ---------- | ------ | ------------------ | ------------- | ------ | ---- |
| `small`    | 32px   | 12px               | Tiny 14/20    | 8px    | 16px |
| `medium`   | 48px   | 16px               | Small 16/24   | 8px    | 20px |
| `large`    | 56px   | 24px               | Heading 4 20/28 | 12px | 24px |

The label container contributes an additional 4px inset on each side, matching
the Figma component.

## States

- Hover and press use the shared `fill-hover` and `fill-press` overlays.
- Focus uses a 2px `stroke-focus` ring offset 2px from the button.
- Disabled primary buttons use `fill-disabled`; secondary and tertiary buttons
  use disabled stroke/text tokens.

## Accessibility

- Uses a native `<button>` element
- Supports `disabled` with reduced opacity and no pointer events
- `focus-visible:ring` styles for keyboard focus
- Icon wrappers are `aria-hidden`; label text or `aria-label` carries meaning

## Related

- [FeatherIcon](./icon)
- [ButtonIcon](./button-icon)
- [ButtonGroup](./button-group)
- [Shared utilities](./cn-helper)
