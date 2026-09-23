---
sidebar_position: 7.2
---

# Date picker

Date field with manual `dd/mm/yyyy` entry and an accessible calendar overlay, matching Practical UI Date picker.

**Import:** `@repo/ui/organisms/date-picker`

**Storybook:** Molecules/DatePicker

## Usage

```tsx
import { DatePicker } from "@repo/ui/organisms/date-picker";

<DatePicker
  label="Date"
  required
  onValueChange={(value) => console.log(value)}
/>

<DatePicker label="Start date" defaultValue="23/05/2024" />
```

## Props

| Prop            | Type                                               | Default         | Description                            |
| --------------- | -------------------------------------------------- | --------------- | -------------------------------------- |
| `label`         | `string`                                           | required        | Accessible field label                 |
| `value`         | `string`                                           | —               | Controlled `dd/mm/yyyy` value          |
| `defaultValue`  | `string`                                           | `""`            | Initial uncontrolled value             |
| `onValueChange` | `(value: string) => void`                          | —               | Called after typing or date selection  |
| `hint`          | `string`                                           | `"(dd/mm/yyyy)"` | Supporting format text                 |
| `error`         | `string`                                           | —               | Error message and invalid styling      |
| `required`      | `boolean`                                          | `false`         | Required marker and input requirement  |
| `optional`      | `boolean`                                          | `false`         | Optional marker                        |
| `disabled`      | `boolean`                                          | `false`         | Disables entry and calendar opening    |
| `state`         | `"default"` \| `"hover"` \| `"press"` \| `"focus"` | `"default"`     | Pinned field visual state              |
| `defaultOpen`   | `boolean`                                          | `false`         | Initially shows the calendar           |
| `initialMonth`  | `Date`                                             | current month   | Month shown when no valid value exists |

Other standard text-input attributes are forwarded to the input.

## Behavior

- Users can type a date or choose one from the calendar.
- Selecting a day writes a zero-padded `dd/mm/yyyy` value and closes the overlay.
- A valid field value determines the month shown when the calendar opens.
- Previous and next controls move by one month.
- Escape and an outside pointer press close the overlay.

## Keyboard support

- Arrow keys move by one day or one week.
- Home and End move to the start and end of the week.
- Page Up and Page Down move by one month.
- Shift + Page Up and Shift + Page Down move by one year.
- Enter or Space selects the focused date.

## Accessibility

- The text input uses the visible field label and connects hint and error text with `aria-describedby`.
- The trigger exposes its expanded state and controls relationship.
- The overlay uses a labelled dialog and calendar grid with a single roving tab stop.
- Selected and current dates are announced independently.
