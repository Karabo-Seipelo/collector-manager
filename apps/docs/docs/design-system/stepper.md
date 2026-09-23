---
sidebar_position: 5.45
---

# Stepper

Numeric field with increment and decrement controls, matching Practical UI Stepper.

**Import:** `@repo/ui/atoms/stepper`

**Storybook:** Atoms/Stepper

## Usage

```tsx
import { Stepper } from "@repo/ui/atoms/stepper";

<Stepper
  label="Quantity"
  required
  value={quantity}
  onValueChange={setQuantity}
  min={0}
  max={10}
/>
```

## Props

Extends native number input attributes except `type`, `value`, `defaultValue`, and `size`.

| Prop            | Type                      | Default | Description                               |
| --------------- | ------------------------- | ------- | ----------------------------------------- |
| `label`         | `string`                  | —       | Visible label (required)                  |
| `required`      | `boolean`                 | `false` | Shows required asterisk                   |
| `optional`      | `boolean`                 | `false` | Shows optional marker                     |
| `hint`          | `string`                  | —       | Supporting hint below the label           |
| `error`         | `string`                  | —       | Error message shown above the field       |
| `value`         | `number`                  | —       | Controlled value                          |
| `defaultValue`  | `number`                  | `1`     | Initial uncontrolled value                |
| `onValueChange` | `(value: number) => void` | —       | Called when the value changes             |
| `min`           | `number`                  | —       | Minimum allowed value                     |
| `max`           | `number`                  | —       | Maximum allowed value                     |
| `step`          | `number`                  | `1`     | Increment/decrement amount                |
| `decreaseLabel` | `string`                  | —       | Accessible name for the decrease button   |
| `increaseLabel` | `string`                  | —       | Accessible name for the increase button   |
| `disabled`      | `boolean`                 | `false` | Disable interaction                       |

## Layout

- Field header with label, optional/required markers, and hint
- 48px control row: minus button, centered number input, plus button
- Raised border and shadow on the default field
- Error message appears between the label and the field

## States

- **Default:** strong stroke, raised shadow, hover/press fills on buttons
- **Focus:** 2px focus ring on the field (offset 3px; 4px when invalid)
- **Error:** error-weak fill, 2px error stroke, error message with icon
- **Disabled:** disabled stroke and text, no raised shadow

## Accessibility

- Uses a native `input[type="number"]` (`role="spinbutton"`) with associated label
- Decrease and increase buttons have accessible names derived from the field label
- Buttons disable at `min` and `max` bounds
- Error state sets `aria-invalid` and links to the error message

## Related

- [TextField](./text-field)
- [Slider](./slider)
- [Design tokens](./tokens)
