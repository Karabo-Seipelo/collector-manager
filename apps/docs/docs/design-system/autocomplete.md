---
sidebar_position: 7
---

# Autocomplete

Searchable option picker matching Practical UI Autocomplete.

**Import:** `@repo/ui/molecules/autocomplete`

**Storybook:** Molecules/Autocomplete

## Usage

```tsx
import { Autocomplete } from "@repo/ui/molecules/autocomplete";

const options = [
  { value: "vinyl", label: "Vinyl records" },
  { value: "cards", label: "Trading cards" },
  { value: "coins", label: "Coins" },
];

<Autocomplete label="Category" options={options} required />

<Autocomplete
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

Common props include:

| Prop            | Type                                      | Default                    | Description                         |
| --------------- | ----------------------------------------- | -------------------------- | ----------------------------------- |
| `label`         | `string`                                  | required                   | Accessible field label              |
| `options`       | `AutocompleteOption[]`                    | required                   | Searchable options                  |
| `type`          | `"single"` \| `"multiple"`                | `"single"`                 | Selection behavior                  |
| `hint`          | `string`                                  | `"Start typing to search"` | Supporting text                     |
| `error`         | `string`                                  | —                          | Error message and invalid styling   |
| `required`      | `boolean`                                 | `false`                    | Required marker and input attribute |
| `optional`      | `boolean`                                 | `false`                    | Optional marker                     |
| `state`         | `"default"` \| `"hover"` \| `"press"` \| `"focus"` | `"default"` | Pinned visual state |
| `defaultOpen`   | `boolean`                                 | `false`                      | Initially show the option list      |
| `noResultsText` | `string`                                  | `"No results"`             | Empty search result                 |

`AutocompleteOption` contains `value`, `label`, and optional `disabled`.

## Behavior

- Filters labels case-insensitively as the user types
- Arrow keys move through enabled options; Enter selects; Escape closes
- Multiple selection displays removable tags and supports Backspace removal
- The clear control resets the current selection

## Accessibility

- Uses the ARIA combobox/listbox pattern
- Exposes `aria-expanded`, `aria-controls`, and `aria-activedescendant`
- Options expose `aria-selected`; multiple mode marks the listbox as multiselectable
- Errors are connected with `aria-describedby`

## Related

- [TextField](./text-field)
- [Checkbox](./checkbox)
- [Tag](./tag)
- [Select](./select)
