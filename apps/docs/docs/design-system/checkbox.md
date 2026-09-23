---
sidebar_position: 5.6
---

# Checkbox

Single boolean or mixed-state control matching the Practical UI Checkbox atom.

**Import:** `@repo/ui/atoms/checkbox`

**Storybook:** Atoms/Checkbox

## Usage

```tsx
import { Checkbox } from "@repo/ui/atoms/checkbox";

<Checkbox label="Mint" />
<Checkbox label="Near mint" defaultChecked />
<Checkbox label="Select all" indeterminate />
<Checkbox label="Unavailable" invalid />
```

## Props

Extends native `input` checkbox attributes via `React.InputHTMLAttributes`.

| Prop            | Type                   | Default   | Description                       |
| --------------- | ---------------------- | --------- | --------------------------------- |
| `label`         | `ReactNode`            | —         | Optional visible, associated name |
| `size`          | `"small"` \| `"large"` | `"small"` | 24px or 32px control              |
| `indeterminate` | `boolean`              | `false`   | Native mixed state with minus     |
| `invalid`       | `boolean`              | `false`   | Error tokens and `aria-invalid`   |
| `disabled`      | `boolean`              | `false`   | Disable interaction               |

Use `checked` / `defaultChecked` and `onChange` like a native checkbox. This atom does not own selection state for a group.

## Visual states

- Unselected: inverse fill, strong 1px stroke
- Selected: primary fill with a white check
- Indeterminate: primary fill with a white minus
- Invalid: error-weak fill and 2px error-strong stroke; selected/mixed use error-strong fill
- Disabled: disabled stroke/fill and disabled label text
- Radius is 4px; label gap is 12px

## Accessibility

- Native `<input type="checkbox">` with a `<label htmlFor>`
- Indeterminate sets the native DOM property and `aria-checked="mixed"`
- Check/minus marks are decorative; the label is the accessible name
- Keyboard focus uses the Figma 2px focus ring
- When omitting `label`, provide `aria-label` or `aria-labelledby`

## Related

- [CheckboxGroup](./checkbox-group)
- [Tag](./tag)
- [TextField](./text-field)
- [FeatherIcon](./icon)
