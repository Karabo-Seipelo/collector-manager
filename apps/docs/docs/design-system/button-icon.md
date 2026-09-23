---
sidebar_position: 4
---

# ButtonIcon

Used to trigger actions when space is limited. The button type indicates the
importance of the action.

**Import:** `@repo/ui/atoms/button-icon`

**Storybook:** Atoms/ButtonIcon

## Usage

```tsx
import { ButtonIcon } from "@repo/ui/atoms/button-icon";
import { FeatherIcon } from "@repo/ui/atoms/icon";

<ButtonIcon icon={<FeatherIcon name="plus" />} aria-label="Add" />

<ButtonIcon
  variant="tertiary"
  icon={<FeatherIcon name="bell" />}
  badge="dot"
  aria-label="Notifications"
/>

<ButtonIcon
  variant="tertiary"
  icon={<FeatherIcon name="shopping-cart" />}
  badge={8}
  aria-label="Cart"
/>
```

`aria-label` is required. The control has no visible text.

## Props

Extends native `button` attributes via `React.ButtonHTMLAttributes`.

| Prop        | Type                                                       | Default     | Description                         |
| ----------- | ---------------------------------------------------------- | ----------- | ----------------------------------- |
| `icon`      | `ReactNode`                                                | required    | Icon content                        |
| `aria-label` | `string`                                                  | required    | Accessible name                     |
| `variant`   | `"primary"` \| `"secondary"` \| `"tertiary"`               | `"primary"` | Visual style                        |
| `tone`      | `"brand"` \| `"neutral"` \| `"destructive"` \| `"inverse"` | `"brand"`   | Color intent                        |
| `size`      | `"small"` \| `"medium"`                                    | `"medium"`  | 32px or 48px hit area               |
| `shape`     | `"square"` \| `"circle"`                                   | `"square"`  | Corner radius                       |
| `badge`     | `"dot"` \| `number`                                        | —           | Notification dot or count           |
| `disabled`  | `boolean`                                                  | `false`     | Disable interaction                 |

Type and tone match [Button](./button). Size does **not** include `large`.

## Variants

| Variant     | Use case                         |
| ----------- | -------------------------------- |
| `primary`   | Filled icon action               |
| `secondary` | Outlined icon action             |
| `tertiary`  | Ghost icon (no fill, no underline) |

## Sizes

| Size     | Hit area | Radius (square) | Icon |
| -------- | -------- | --------------- | ---- |
| `small`  | 32px     | 8px             | 16px |
| `medium` | 48px     | 8px             | 24px |

Circle uses a full pill radius. Hover, press, focus, and disabled reuse Button tokens.

## Badges

- `badge="dot"` — overlays a small [BadgeDot](./badge-dot) (`notification`)
- `badge={n}` — overlays [BadgeCount](./badge-count) with a 2px inverse ring

Notification counts are the BadgeCount atom. Status labels are [Badge](./badge).

## Accessibility

- Native `<button>` with a required `aria-label`
- Icon and badge are `aria-hidden`
- `focus-visible` ring matches Button

## Related

- [Button](./button)
- [FeatherIcon](./icon)
- [ButtonGroup](./button-group)
- [Badge](./badge)
- [BadgeCount](./badge-count)
- [BadgeDot](./badge-dot)
