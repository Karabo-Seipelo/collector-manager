---
sidebar_position: 5.5
---

# Tag

Filter and category chip. Selected and unselected states match the Collection Manager wireframes.

**Import:** `@repo/ui/atoms/tag`

**Storybook:** Atoms/Tag

## Usage

```tsx
import { Tag } from "@repo/ui/atoms/tag";
import { FeatherIcon } from "@repo/ui/atoms/icon";

<Tag>Vinyl</Tag>

<Tag selected icon={<FeatherIcon name="check" />}>
  All
</Tag>
```

## Props

Extends native `button` attributes via `React.ButtonHTMLAttributes`.

| Prop       | Type                   | Default    | Description                         |
| ---------- | ---------------------- | ---------- | ----------------------------------- |
| `selected` | `boolean`              | `false`    | Filled selected state; sets `aria-pressed` |
| `size`     | `"small"` \| `"medium"` | `"medium"` | 24px or 32px height                 |
| `icon`     | `ReactNode`            | —          | Optional leading icon               |
| `disabled` | `boolean`              | `false`    | Disable interaction                 |

Pass `onClick` to toggle selection in the parent. This atom does not own selected state.

## Accessibility

- Uses a native `<button type="button">`
- `aria-pressed` reflects `selected`
- Leading icons are `aria-hidden`; the label carries the name
- Keyboard focus uses `focus-visible:ring`

## Related

- [FeatherIcon](./icon)
- [Button](./button)
- [Badge](./badge)
- [Shared utilities](./cn-helper)
