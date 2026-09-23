---
sidebar_position: 6.2
---

# Radio

Single-choice control matching the Practical UI Radio button atom.

**Import:** `@repo/ui/atoms/radio`

**Storybook:** Atoms/Radio

## Usage

```tsx
import { Radio } from "@repo/ui/atoms/radio";

<Radio name="format" value="vinyl" label="Vinyl" />
<Radio name="format" value="cd" label="CD" />
```

Use [RadioGroup](./radio-group) for a labelled set; it supplies one shared name automatically.

## Props

Extends native radio input attributes except `type` and the numeric input `size`.

| Prop       | Type                   | Default   | Description                       |
| ---------- | ---------------------- | --------- | --------------------------------- |
| `label`    | `ReactNode`            | —         | Optional visible, associated name |
| `size`     | `"small"` \| `"large"` | `"small"` | 24px or 32px control              |
| `invalid`  | `boolean`              | `false`   | Error tokens and `aria-invalid`   |
| `disabled` | `boolean`              | `false`   | Disable interaction               |

Use `checked` / `defaultChecked`, `value`, and `onChange` like a native radio.

## Visual states

- Unselected: inverse fill and strong stroke
- Selected: primary fill with a white center dot
- Invalid: error-weak fill and 2px error-strong stroke; selected uses error-strong fill
- Disabled: disabled stroke/fill and disabled label text
- Label gap is 12px

## Accessibility

- Uses a native `<input type="radio">` and associated `<label>`
- Keyboard selection and arrow-key group behavior remain native
- When omitting `label`, provide `aria-label` or `aria-labelledby`

## Related

- [RadioGroup](./radio-group)
- [Checkbox](./checkbox)
- [Toggle](./toggle)
- [Design tokens](./tokens)
