---
sidebar_position: 7.8
---

# Segmented control

Single-select control for switching between a small set of related views or modes.

**Import:** `@repo/ui/molecules/segmented-control`

**Storybook:** Molecules/SegmentedControl

## Usage

```tsx
import { SegmentedControl } from "@repo/ui/molecules/segmented-control";

<SegmentedControl
  aria-label="View mode"
  options={[
    { value: "list", label: "List" },
    { value: "grid", label: "Grid" },
    { value: "table", label: "Table" },
  ]}
  value={view}
  onValueChange={setView}
/>
```

Add an `icon` to each option for the icon variant. Provide `aria-label` on icon-only options.

## Props

| Prop            | Type                         | Default    | Description                                |
| --------------- | ---------------------------- | ---------- | ------------------------------------------ |
| `options`       | `SegmentedControlOption[]`   | —          | Selectable segments (required)             |
| `value`         | `string`                     | —          | Controlled selected value                  |
| `defaultValue`  | `string`                     | first item | Initial uncontrolled value                 |
| `onValueChange` | `(value: string) => void`    | —          | Called when selection changes              |
| `size`          | `"medium"` \| `"small"`      | `"medium"` | 48px or 32px segment height                |
| `disabled`      | `boolean`                    | `false`    | Disables the entire control                |
| `aria-label`    | `string`                     | —          | Accessible name for the radiogroup         |

### SegmentedControlOption

| Prop         | Type          | Description                                      |
| ------------ | ------------- | ------------------------------------------------ |
| `value`      | `string`      | Stable segment value (required)                  |
| `label`      | `string`      | Visible label text                               |
| `icon`       | `ReactNode`   | Optional leading icon (20px medium, 16px small)  |
| `disabled`   | `boolean`     | Disable an individual segment                    |
| `aria-label` | `string`      | Required accessible name for icon-only segments  |

## Layout

- Track: fill-weak background, weak stroke, 8px radius
- Selected segment: inverse fill, strong stroke, raised shadow
- Unselected segment: weak text; hover and press use fill-hover/fill-press
- Medium segments: 48px height, 16px horizontal padding
- Small segments: 32px height, 12px horizontal padding

## Accessibility

- Uses `role="radiogroup"` with `role="radio"` segments
- Selected segment has `tabIndex={0}`; others are `-1`
- Arrow keys, Home, and End move selection and focus
- Provide `aria-label` on the group and on icon-only options

## Related

- [Tag](./tag)
- [RadioGroup](./radio-group)
- [ButtonGroup](./button-group)
