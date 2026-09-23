---
sidebar_position: 7.1
---

# Combobox

Select-like field that filters a closed list of options as the user types, matching Practical UI Combobox.

**Import:** `@repo/ui/molecules/combobox`

**Storybook:** Molecules/Combobox

Use **Select** when the list is short and typing is not needed. Use **Autocomplete** when the field is a search that suggests options. Use **Combobox** when the control should look like a select but still filter as the user types.

## Usage

```tsx
import { Combobox } from "@repo/ui/molecules/combobox";

const options = [
  { value: "vinyl", label: "Vinyl records" },
  { value: "cards", label: "Trading cards" },
  { value: "coins", label: "Coins" },
];

<Combobox label="Category" options={options} required />

<Combobox
  label="Categories"
  type="multiple"
  options={options}
  defaultValue={["vinyl"]}
/>
```

## Props

The value API is discriminated by `type`:

- Single: `value?: string`, `defaultValue?: string`, `onValueChange?: (value: string) => void`
- Multiple: `value?: string[]`, `defaultValue?: string[]`, `onValueChange?: (value: string[]) => void`

| Prop            | Type                                               | Default                               | Description                       |
| --------------- | -------------------------------------------------- | ------------------------------------- | --------------------------------- |
| `label`         | `string`                                           | required                              | Accessible field label            |
| `options`       | `ComboboxOption[]`                                 | required                              | Closed option list                |
| `type`          | `"single"` \| `"multiple"`                         | `"single"`                            | Selection behavior                |
| `hint`          | `string`                                           | `"Start typing to filter results"`    | Supporting text                   |
| `error`         | `string`                                           | —                                     | Error message and invalid styling |
| `required`      | `boolean`                                          | `false`                               | Required marker                   |
| `optional`      | `boolean`                                          | `false`                               | Optional marker                   |
| `state`         | `"default"` \| `"hover"` \| `"press"` \| `"focus"` | `"default"`                           | Pinned visual state               |
| `defaultOpen`   | `boolean`                                          | `false`                               | Initially show the option list    |

`ComboboxOption` contains `value`, `label`, and optional `disabled`.

## Behavior

- Looks like Select: trailing chevron, no leading search icon
- Typing filters the option list; the chevron opens and closes it
- A filled field shows a clear control and divider before the chevron
- Multiple selection shows removable tags in the field and checkboxes in the list
- Arrow keys move through enabled options; Enter selects; Escape closes

## Accessibility

- Uses the ARIA combobox/listbox pattern
- Exposes `aria-expanded`, `aria-controls`, and `aria-activedescendant`
- Options expose `aria-selected`; multiple mode marks the listbox as multiselectable
- Errors are connected with `aria-describedby`

## Related

- [Select](./select)
- [Autocomplete](./autocomplete)
- [Tag](./tag)
- [Checkbox](./checkbox)
