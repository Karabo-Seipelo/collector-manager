---
sidebar_position: 6.6
---

# Alert global

Full-width page banner for important system-wide messages, matching Practical UI Alert global.

**Import:** `@repo/ui/atoms/alert-global`

**Storybook:** Atoms/AlertGlobal

## Usage

```tsx
import { AlertGlobal } from "@repo/ui/atoms/alert-global";
import { Button } from "@repo/ui/atoms/button";

<AlertGlobal
  onClose={() => {}}
  action={
    <Button variant="secondary" size="small" tone="neutral">
      Label
    </Button>
  }
>
  System maintenance starts at 14:00.
</AlertGlobal>
```

Place at the top of the page. Use [Alert](./alert) for in-content messages.

## Props

Extends native `div` attributes.

| Prop         | Type                                                                                                                         | Default     | Description                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------- |
| `tone`       | `"error"` \| `"warning"` \| `"success"` \| `"information"` \| `"neutral"` \| `"brand"` \| `"inverse-neutral"` \| `"inverse-brand"` | `"error"` | Colour treatment                        |
| `device`     | `"desktop"` \| `"mobile"`                                                                                                    | `"desktop"` | 56px row or stacked 100px layout        |
| `icon`       | `ReactNode`                                                                                                                  | tone default | Pass `null` to hide                    |
| `action`     | `ReactNode`                                                                                                                  | —           | Trailing (desktop) or stacked (mobile) action |
| `onClose`    | `() => void`                                                                                                                 | —           | Shows a dismiss control                 |
| `closeLabel` | `string`                                                                                                                     | `"Dismiss"` | Accessible name for dismiss             |
| `children`   | `ReactNode`                                                                                                                  | —           | Single-line message                     |

## Visual states

- Full width, no card radius, no leading bar
- Weak fill and stroke; inverse tones use inverse fill
- Desktop: icon + Tiny message, then action and dismiss on the right (56px tall at full width)
- Mobile: dismiss stays top-right; action sits under the message

## Accessibility

- `error` and `warning` use `role="alert"`
- Other tones use `role="status"`
- Dismiss is a native button with `aria-label`

## Related

- [Alert](./alert)
- [Button](./button)
- [Design tokens](./tokens)
