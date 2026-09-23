---
sidebar_position: 4.1
---

# Loading bar

Determinate progress indicator with an optional percentage label, matching Practical UI Loading bar.

**Import:** `@repo/ui/atoms/loading-bar`

**Storybook:** Atoms/LoadingBar

## Usage

```tsx
import { LoadingBar } from "@repo/ui/atoms/loading-bar";

<LoadingBar value={50} />
```

Without a label:

```tsx
<LoadingBar value={25} showLabel={false} />
```

## Props

| Prop           | Type                      | Default | Description                              |
| -------------- | ------------------------- | ------- | ---------------------------------------- |
| `value`        | `number`                  | —       | Progress value from 0 to 100 (required)  |
| `showLabel`    | `boolean`                 | `true`  | Show the percentage label on the right   |
| `formatLabel`  | `(value: number) => string` | `"N%"` | Format the visible and accessible label  |
| `className`    | `string`                  | —       | Additional classes on the root element   |

## Layout

- Track: 8px height, pill shape, weak fill, sunken inner shadow
- Fill: brand primary colour with matching inset shadow
- Label: 41px wide, right-aligned tiny text when shown

## Accessibility

- Uses `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`
- Exposes `aria-valuetext` and links the visible label via `aria-labelledby` when shown

## Related

- [Slider](./slider)
- [File upload](./file-upload)
