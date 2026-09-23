---
sidebar_position: 6
---

# TextArea

Labeled multiline text input for notes and longer free-form content. It uses the same field states and accessibility behavior as TextField with the 160px height defined by Practical UI.

**Import:** `@repo/ui/atoms/text-area`

**Storybook:** Atoms/TextArea

## Usage

```tsx
import { TextArea } from "@repo/ui/atoms/text-area";

<TextArea
  label="Notes"
  required
  hint="Describe condition and storage history."
  placeholder="Add notes…"
/>;
```

Invalid and disabled states:

```tsx
<TextArea label="Notes" error="Notes are too long." />

<TextArea
  label="Notes"
  disabled
  defaultValue="Stored upright in a protective outer sleeve."
/>
```

## Props

TextArea extends native `textarea` attributes except `className`, `value`, `defaultValue`, and `onChange`, which are typed explicitly.

| Prop           | Type                                               | Default     | Description                                              |
| -------------- | -------------------------------------------------- | ----------- | -------------------------------------------------------- |
| `label`        | `string`                                           | required    | Visible field label                                      |
| `required`     | `boolean`                                          | `false`     | Shows a required marker (`*`)                            |
| `optional`     | `boolean`                                          | `false`     | Shows an `(optional)` marker                             |
| `hint`         | `string`                                           | —           | Helper text below the label                              |
| `error`        | `string`                                           | —           | Validation message; sets invalid styling unless disabled |
| `state`        | `"default"` \| `"hover"` \| `"press"` \| `"focus"` | `"default"` | Pins a visual state for design review                    |
| `value`        | `string`                                           | —           | Controlled value                                         |
| `defaultValue` | `string`                                           | `""`        | Initial uncontrolled value                               |
| `onChange`     | `ChangeEventHandler<HTMLTextAreaElement>`          | —           | Called when the value changes                            |
| `disabled`     | `boolean`                                          | `false`     | Disables interaction and suppresses invalid presentation |
| `rows`         | `number`                                           | `5`         | Native textarea row count                                |
| `className`    | `string`                                           | —           | Wrapper class                                            |
| `id`           | `string`                                           | auto        | Links label, hint, and error with the textarea           |

Pass other native textarea props such as `name`, `maxLength`, `autoComplete`, and `placeholder` as usual.

## Layout

- The field is full-width with a 160px minimum height.
- Content uses 16px horizontal and 12px vertical padding.
- Native resizing is disabled to preserve the design-system dimensions.
- Set the parent width; the Storybook reference uses 364px.

## Accessibility

- A visible label is required and linked using `htmlFor` and `id`.
- Hint and error messages are included in `aria-describedby`.
- Invalid fields set `aria-invalid`; errors use `role="alert"`.
- Disabled fields suppress invalid styling and error announcements.
- The control remains a native `<textarea>`.

## Related

- [TextField](./text-field)
- [Design tokens](./tokens)
- [Shared utilities](./cn-helper)
