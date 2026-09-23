---
sidebar_position: 5.4
---

# Search input

Compact search field with a leading icon, optional clear control, and an optional submit-button variant.

**Import:** `@repo/ui/atoms/search-input`

**Storybook:** Atoms/SearchInput

## Usage

```tsx
import { SearchInput } from "@repo/ui/atoms/search-input";

<SearchInput
  placeholder="Search"
  aria-label="Search collection"
  onChange={(event) => setQuery(event.target.value)}
/>

<SearchInput
  variant="button"
  defaultValue=""
  onSearch={(value) => fetchResults(value)}
/>
```

## Props

Extends native search input attributes except `className`, `size`, and controlled value props listed below.

| Prop           | Type                                      | Default     | Description                                           |
| -------------- | ----------------------------------------- | ----------- | ----------------------------------------------------- |
| `variant`      | `"default"` \| `"button"`                 | `"default"` | Single field or field plus submit button              |
| `size`         | `"medium"` \| `"small"`                   | `"medium"`  | 48px or 32px field height                             |
| `clearable`    | `boolean`                                 | `true`      | Show clear button when the field has a value          |
| `searchLabel`  | `string`                                  | `"Search"`  | Submit button label for the button variant            |
| `state`        | `"default"` \| `"hover"` \| `"press"` \| `"focus"` | `"default"` | Storybook-only pinned visual state           |
| `value`        | `string`                                  | —           | Controlled value                                      |
| `defaultValue` | `string`                                  | `""`        | Initial uncontrolled value                            |
| `onChange`     | `(event) => void`                         | —           | Native change handler                                 |
| `onSearch`     | `(value: string) => void`                 | —           | Called when the button variant is submitted           |
| `onClear`      | `() => void`                              | —           | Called after the clear button resets the field        |
| `disabled`     | `boolean`                                 | `false`     | Disables input, clear, and submit interactions        |
| `placeholder`  | `string`                                  | `"Search"`  | Placeholder copy                                      |

## Layout

- Default variant: rounded field with 8px radius, search icon, input, and optional clear control
- Button variant: input field with left rounding plus primary submit button with right rounding
- Medium: 48px height, 16px horizontal padding, 24px icons, small typography
- Small: 32px height, 12px horizontal padding, 16px icons, tiny typography

## Accessibility

- Renders `role="search"` on the wrapper or form
- Provide `aria-label` when placeholder text alone is not descriptive enough
- Clear button exposes `aria-label="Clear search"`
- Focus ring follows the shared `stroke-focus` token

## Related

- [TextField](./text-field)
- [Button](./button)
- [Autocomplete](./autocomplete)
