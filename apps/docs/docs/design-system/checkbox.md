---
sidebar_position: 5.6
---

# Checkbox

Labeled checkbox used for filters such as condition on Search.

**Import:** `@repo/ui/atoms/checkbox`

**Storybook:** Atoms/Checkbox

## Usage

```tsx
import { Checkbox } from "@repo/ui/atoms/checkbox";

<Checkbox label="Mint" />
<Checkbox label="Near mint" defaultChecked />
```

## Props

Extends native `input` checkbox attributes via `React.InputHTMLAttributes`.

| Prop       | Type      | Default | Description              |
| ---------- | --------- | ------- | ------------------------ |
| `label`    | `string`  | —       | Visible, associated name |
| `disabled` | `boolean` | `false` | Disable interaction      |

Use `checked` / `defaultChecked` and `onChange` like a native checkbox. This atom does not own selection state for a group.

## Accessibility

- Native `<input type="checkbox">` with a `<label htmlFor>`
- 32px hit target matches the Figma control
- Check mark is decorative (`aria-hidden`); the label is the accessible name
- Keyboard focus uses `focus-visible:ring` on the visual box

## Related

- [Tag](./tag)
- [TextField](./text-field)
- [FeatherIcon](./icon)
