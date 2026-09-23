---
sidebar_position: 6.5
---

# Alert

Used to convey an important message or status, matching Practical UI Alert.

**Import:** `@repo/ui/atoms/alert`

**Storybook:** Atoms/Alert

## Usage

```tsx
import { Alert } from "@repo/ui/atoms/alert";

<Alert heading="Heading" onClose={() => {}}>
  Payment failed. Try again.
</Alert>
```

## Props

Extends native `div` attributes.

| Prop         | Type                                                                                                                         | Default         | Description                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------ |
| `tone`       | `"error"` \| `"warning"` \| `"success"` \| `"information"` \| `"neutral"` \| `"brand"` \| `"inverse-neutral"` \| `"inverse-brand"` | `"error"` | Colour treatment                                 |
| `size`       | `"large"` \| `"small"`                                                                                                       | `"large"`       | 24px or 16px padding                             |
| `layout`     | `"horizontal"` \| `"vertical"`                                                                                               | `"horizontal"`  | Icon beside or above the text                    |
| `heading`    | `ReactNode`                                                                                                                  | —               | Title                                            |
| `icon`       | `ReactNode`                                                                                                                  | tone default    | Pass `null` to hide                              |
| `onClose`    | `() => void`                                                                                                                 | —               | Shows a dismiss control                          |
| `closeLabel` | `string`                                                                                                                     | `"Dismiss"`     | Accessible name for the dismiss control          |
| `aside`      | `ReactNode`                                                                                                                  | —               | Trailing slot (date or action)                   |
| `footer`     | `ReactNode`                                                                                                                  | —               | List, link, or button group below the body       |
| `children`   | `ReactNode`                                                                                                                  | —               | Description                                      |

## Visual states

- 4px tone bar on the leading edge, 12px radius, weak fill and stroke
- Large heading is Heading 4 / semibold; small heading is Tiny / semibold
- Inverse tones use inverse fill and inverse text

## Accessibility

- `error` and `warning` use `role="alert"`
- Other tones use `role="status"`
- Dismiss is a native button with `aria-label`

## Related

- [Alert global](./alert-global)
- [ButtonGroup](./button-group)
- [FeatherIcon](./icon)
- [Design tokens](./tokens)
