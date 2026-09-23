---
sidebar_position: 6.1
---

# CheckboxGroup

Groups related Checkbox atoms with a shared label, hint, validation message, and size.

**Import:** `@repo/ui/molecules/checkbox-group`

**Storybook:** Molecules/CheckboxGroup

## Usage

```tsx
import { Checkbox } from "@repo/ui/atoms/checkbox";
import { CheckboxGroup } from "@repo/ui/molecules/checkbox-group";

<CheckboxGroup
  label="Condition"
  required
  hint="Choose all that apply"
>
  <Checkbox label="Mint" />
  <Checkbox label="Near mint" />
  <Checkbox label="Very good" />
</CheckboxGroup>
```

## Props

| Prop       | Type                   | Default   | Description                         |
| ---------- | ---------------------- | --------- | ----------------------------------- |
| `label`    | `string`               | required  | Group legend                        |
| `required` | `boolean`              | `false`   | Shows `*`                           |
| `optional` | `boolean`              | `false`   | Shows `(optional)`                  |
| `hint`     | `string`               | —         | Group guidance                      |
| `error`    | `string`               | —         | Alert and invalid child styling     |
| `size`     | `"small"` \| `"large"` | `"small"` | Passed to every Checkbox child      |
| `disabled` | `boolean`              | `false`   | Disables the fieldset and children  |
| `children` | `ReactNode`            | required  | Checkbox atoms                      |

The Figma layout is 364px wide, with 24px above the list and 16px between items.

## Accessibility

- Uses native `<fieldset>` and `<legend>` semantics
- Hint and error IDs are connected with `aria-describedby`
- Error uses `role="alert"` and marks child checkboxes invalid
- A disabled group uses the native `fieldset disabled` behavior

## Related

- [Checkbox](./checkbox)
- [TextField](./text-field)
- [Design tokens](./tokens)
