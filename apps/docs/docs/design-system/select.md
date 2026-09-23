---
sidebar_position: 5.7
---

# Select

Labeled native select that shares TextField field chrome (48px height, label, error).

**Import:** `@repo/ui/molecules/select`

**Storybook:** Molecules/Select

## Usage

```tsx
import { Select } from "@repo/ui/molecules/select";

<Select label="Category">
  <option value="">Select</option>
  <option value="vinyl">Vinyl records</option>
  <option value="books">Books</option>
</Select>
```

## Props

Extends native `select` attributes via `React.SelectHTMLAttributes`.

| Prop       | Type      | Default | Description                         |
| ---------- | --------- | ------- | ----------------------------------- |
| `label`    | `string`  | —       | Visible, associated name            |
| `required` | `boolean` | `false` | Required marker on the label        |
| `optional` | `boolean` | `false` | “(optional)” on the label           |
| `hint`     | `string`  | —       | Helper text under the label         |
| `error`    | `string`  | —       | Error alert; sets `aria-invalid`    |
| `disabled` | `boolean` | `false` | Disable interaction                 |

Pass options as children (`<option>`). This atom does not implement a custom menu — keep that for a later molecule if native select is not enough.

## Accessibility

- Native `<select>` exposed as a combobox
- Label associated with `htmlFor` / `id`
- Errors use `role="alert"` and `aria-describedby`
- Chevron is decorative (`aria-hidden`)

## Related

- [Combobox](./combobox)
- [Autocomplete](./autocomplete)
- [TextField](./text-field)
- [Checkbox](./checkbox)
- [Shared utilities](./cn-helper)
