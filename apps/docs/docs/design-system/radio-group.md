---
sidebar_position: 6.3
---

# RadioGroup

Groups mutually exclusive Radio atoms with a shared label, name, hint, validation message, and size.

**Import:** `@repo/ui/molecules/radio-group`

**Storybook:** Molecules/RadioGroup

## Usage

```tsx
import { Radio } from "@repo/ui/atoms/radio";
import { RadioGroup } from "@repo/ui/molecules/radio-group";

<RadioGroup label="Format" required hint="Choose one">
  <Radio label="Vinyl" value="vinyl" />
  <Radio label="CD" value="cd" />
  <Radio label="Cassette" value="cassette" />
</RadioGroup>
```

## Props

| Prop       | Type                   | Default   | Description                      |
| ---------- | ---------------------- | --------- | -------------------------------- |
| `label`    | `string`               | required  | Group legend                     |
| `name`     | `string`               | generated | Shared native radio name         |
| `required` | `boolean`              | `false`   | Shows `*`                        |
| `optional` | `boolean`              | `false`   | Shows `(optional)`               |
| `hint`     | `string`               | —         | Group guidance                   |
| `error`    | `string`               | —         | Alert and invalid child styling  |
| `size`     | `"small"` \| `"large"` | `"small"` | Passed to every Radio child      |
| `disabled` | `boolean`              | `false`   | Disables fieldset and children   |
| `children` | `ReactNode`            | required  | Radio atoms                      |

The Figma layout is at most 364px wide, with 24px above the list and 16px between options.

## Accessibility

- Uses native `<fieldset>` and `<legend>` group semantics
- Every child receives the same `name`, preserving native mutual exclusion and keyboard behavior
- Hint and error IDs are connected through `aria-describedby`
- Error uses `role="alert"` and marks child radios invalid

## Related

- [Radio](./radio)
- [CheckboxGroup](./checkbox-group)
- [Design tokens](./tokens)
