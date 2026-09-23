---
sidebar_position: 8.3
---

# AvatarDropdown

Trigger for a user menu: [AvatarLabelled](./avatar-labelled) plus a trailing icon. Matches Practical UI Avatar dropdown.

This molecule does **not** render a menu. Pass `open` and `onClick`; the parent owns the panel.

**Import:** `@repo/ui/organisms/avatar-dropdown`

**Storybook:** Molecules/AvatarDropdown

## Usage

```tsx
import { AvatarDropdown } from "@repo/ui/organisms/avatar-dropdown";

<AvatarDropdown name="John Smith" src="/john.jpg" />

<AvatarDropdown
  name="Karabo Seipelo"
  description="Free plan"
  open={open}
  onClick={() => setOpen((o) => !o)}
/>
```

## Props

Extends native `button` attributes except `type` (always `"button"`).

| Prop          | Type                   | Default    | Description                                      |
| ------------- | ---------------------- | ---------- | ------------------------------------------------ |
| `name`        | `string`               | —          | Visible name and accessible name                 |
| `description` | `string`               | —          | Optional second line                             |
| `src`         | `string`               | —          | Photo URL                                        |
| `size`        | Avatar size            | `"small"`  | Spec uses the 32px labelled avatar               |
| `variant`     | `"button"` \| `"navigation"` | `"button"` | Hug + chevron, or full-width + more icon |
| `open`        | `boolean`              | `false`    | Sets `aria-expanded`; button uses chevron-up     |
| `disabled`    | `boolean`              | `false`    | 30% opacity, no interaction                      |

`button` is padding 16×8. `navigation` is padding 24×12 and stretches to the parent width (320px in the spec).

## Accessibility

- Native `<button type="button">`
- `aria-expanded` reflects `open`
- `aria-haspopup="menu"`
- Trailing icon is decorative; the name is the accessible name
- Focus uses `ring-stroke-focus`

## Related

- [AvatarLabelled](./avatar-labelled)
- [Avatar](./avatar)
- [Button](./button)
