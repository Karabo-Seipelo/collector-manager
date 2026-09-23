---
sidebar_position: 5
---

# TextField

Text input and textarea for forms, search, and item metadata. Supports labels, hints, validation errors, icons, and clear actions.

**Import:** `@repo/ui/atoms/text-field`

**Storybook:** Atoms/TextField

For new multiline fields, prefer the dedicated [TextArea](./text-area) atom. The `multiline` prop remains supported for compatibility.

## Usage

```tsx
import { TextField } from "@repo/ui/atoms/text-field";

<TextField
  label="Item name"
  placeholder="Search your collection"
  hint="Use the name shown on the sleeve or label."
/>

<TextField
  label="Notes"
  multiline
  rows={4}
  placeholder="Condition, pressing, storage history…"
/>

<TextField
  label="Item name"
  defaultValue="Blue Train"
  error="An item with this name already exists."
/>
```

With a leading icon and clear button:

```tsx
import { FeatherIcon } from "@repo/ui/atoms/icon";

<TextField
  label="Search"
  placeholder="Search items"
  leadingIcon={<FeatherIcon name="search" size={20} />}
  clearable
  defaultValue="Kind of Blue"
/>;
```

## Props

Extends native `input` or `textarea` attributes (depending on `multiline`), except `className`, `value`, `defaultValue`, and `onChange` which are typed explicitly.

| Prop           | Type                                               | Default     | Description                                              |
| -------------- | -------------------------------------------------- | ----------- | -------------------------------------------------------- |
| `label`        | `string`                                           | —           | Visible field label                                      |
| `required`     | `boolean`                                          | `false`     | Shows a required marker (`*`)                            |
| `optional`     | `boolean`                                          | `false`     | Shows an `(optional)` marker                             |
| `hint`         | `string`                                           | —           | Helper text below the label                              |
| `error`        | `string`                                           | —           | Validation message; sets invalid styling unless disabled |
| `leadingIcon`  | `ReactNode`                                        | —           | Icon inside the field on the left                        |
| `clearable`    | `boolean`                                          | `false`     | Shows a clear button when the field has a value          |
| `state`        | `"default"` \| `"hover"` \| `"press"` \| `"focus"` | `"default"` | Pin a visual state (Storybook / design review)           |
| `multiline`    | `boolean`                                          | `false`     | Renders a `<textarea>` instead of `<input>`              |
| `value`        | `string`                                           | —           | Controlled value                                         |
| `defaultValue` | `string`                                           | `""`        | Initial value (uncontrolled)                             |
| `onChange`     | `ChangeEventHandler`                               | —           | Called when the value changes                            |
| `disabled`     | `boolean`                                          | `false`     | Disable interaction                                      |
| `className`    | `string`                                           | —           | Wrapper class                                            |
| `id`           | `string`                                           | auto        | Links label, hint, and error via `htmlFor` / ARIA        |

Pass standard input props (`placeholder`, `type`, `name`, `autoComplete`, etc.) or textarea props (`rows`, `maxLength`, etc.) as usual.

## Controlled vs uncontrolled

```tsx
// Uncontrolled
<TextField
  defaultValue="Abbey Road"
  onChange={(e) => console.log(e.target.value)}
/>;

// Controlled
const [name, setName] = React.useState("");
<TextField value={name} onChange={(e) => setName(e.target.value)} />;
```

When `clearable` is enabled, the clear button resets the value and fires `onChange` with an empty string.

## Layout

The field stacks vertically:

1. **Label block** — label, required/optional markers, optional hint
2. **Error** — shown above the input when `error` is set
3. **Input box** — border, focus ring, leading icon slot, control, optional clear button

Set a width on the parent container (e.g. `w-[360px]`) — the field stretches to `w-full`.

## Design tokens

TextField uses semantic tokens from [Design tokens](./tokens):

| Token                                 | Usage                      |
| ------------------------------------- | -------------------------- |
| `bg-fill-inverse`                     | Field background           |
| `bg-fill-hover` / `bg-fill-press`     | Hover and press overlays   |
| `bg-fill-error-weak`                  | Invalid field background   |
| `border-stroke-strong`                | Default border             |
| `border-stroke-focus`                 | Focus outline              |
| `border-stroke-error-strong`          | Invalid border             |
| `text-fg-strong` / `text-fg-weak`     | Input and placeholder text |
| `text-text-error` / `text-icon-error` | Error message              |

## Accessibility

- Label is associated with the control via `htmlFor` / `id`
- Hint and error IDs are wired through `aria-describedby`
- Invalid fields set `aria-invalid`
- Error message uses `role="alert"`
- Disabled fields suppress invalid styling and error announcements
- Clear button has `aria-label="Clear"`

## Implementation notes

TextField is built from shared field utilities in `packages/ui/src/lib/`:

| Module                       | Role                           |
| ---------------------------- | ------------------------------ |
| `field-header.tsx`           | Label, required/optional, hint |
| `field-error.tsx`            | Error row with `FeatherIcon`   |
| `text-field-styles.ts`       | Box and control class builders |
| `use-controllable-string.ts` | Controlled/uncontrolled value  |
| `use-field-ids.ts`           | IDs and `aria-describedby`     |

See [Shared utilities](./cn-helper) for importable helpers.

## Storybook stories

| Story               | Description                                     |
| ------------------- | ----------------------------------------------- |
| Default             | Label, hint, and placeholder                    |
| WithValue           | Pre-filled uncontrolled value                   |
| Required            | Required marker                                 |
| Optional            | Optional marker                                 |
| WithLeadingIcon     | Search icon                                     |
| Clearable           | Clear button                                    |
| WithError           | Validation error                                |
| Disabled            | Disabled state                                  |
| DisabledWithError   | Disabled state takes precedence over an error   |
| Multiline           | Textarea                                        |
| VisualStates        | Pinned hover, press, and focus states           |
| InvalidVisualStates | Invalid default, hover, press, and focus states |

## Related

- [TextArea](./text-area)
- [FeatherIcon](./icon)
- [Design tokens](./tokens)
- [Shared utilities](./cn-helper)
