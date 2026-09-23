---
sidebar_position: 6.35
---

# Slider

Range input for selecting a value along a track, matching Practical UI Slider.

**Import:** `@repo/ui/atoms/slider`

**Storybook:** Atoms/Slider

## Usage

```tsx
import { Slider } from "@repo/ui/atoms/slider";

<Slider label="Volume" value={volume} onValueChange={setVolume} />

<Slider
  aria-label="Volume"
  showValue={false}
  defaultValue={25}
/>
```

## Props

Extends native range input attributes except `type`, `value`, `defaultValue`, and `onChange`.

| Prop            | Type                       | Default | Description                                      |
| --------------- | -------------------------- | ------- | ------------------------------------------------ |
| `label`         | `string`                   | —       | Visible label associated with the slider         |
| `showValue`     | `boolean`                  | `true` when `label` is set | Value readout on the right            |
| `formatValue`   | `(value: number) => string`| —       | Formats the readout (defaults to percentage)     |
| `value`         | `number`                   | —       | Controlled value                                 |
| `defaultValue`  | `number`                   | `0`     | Initial uncontrolled value                       |
| `onValueChange` | `(value: number) => void`  | —       | Called when the value changes                    |
| `min`           | `number`                   | `0`     | Minimum value                                    |
| `max`           | `number`                   | `100`   | Maximum value                                    |
| `step`          | `number`                   | `1`     | Step increment                                   |
| `disabled`      | `boolean`                  | `false` | Disable interaction                              |

## Layout

- Optional header row: label (strong text) and value readout (weak text), 16px apart
- Track: 8px pill with weak fill, weak stroke, and sunken shadow
- Filled portion: primary colour from the start to the thumb
- Thumb: 24px white circle with weak stroke and overlay shadow
- 8px gap between the header and track

## States

- **Default:** primary fill to the thumb position
- **Hover / press:** thumb uses fill-hover and fill-press overlays
- **Focus:** 2px focus ring on the thumb
- **Disabled:** 40% opacity, no primary fill

## Accessibility

- Uses a native `input[type="range"]` with an associated `<label>` when `label` is provided
- Provide `aria-label` or `aria-labelledby` when omitting the visible label
- Keyboard adjustment uses native arrow keys, Home, and End behaviour

## Related

- [Toggle](./toggle)
- [TextField](./text-field)
- [Design tokens](./tokens)
