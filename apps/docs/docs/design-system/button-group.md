---
sidebar_position: 8
---

# ButtonGroup

A group of three [Buttons](./button) — primary, secondary, then tertiary. Place them horizontally on large screens or stack them vertically on mobile.

**Import:** `@repo/ui/molecules/button-group`

**Storybook:** Molecules/ButtonGroup

## Usage

```tsx
import { Button } from "@repo/ui/atoms/button";
import { ButtonGroup } from "@repo/ui/molecules/button-group";

<ButtonGroup aria-label="Actions">
  <Button>Save</Button>
  <Button>Cancel</Button>
  <Button>Skip</Button>
</ButtonGroup>

<ButtonGroup layout="vertical" size="small">
  <Button>Save</Button>
  <Button>Cancel</Button>
  <Button>Skip</Button>
</ButtonGroup>
```

Children are assigned variants by index: first primary, second secondary, third tertiary. Pass icons, `onClick`, and `disabled` on each `Button`.

## Props

| Prop              | Type                         | Default          | Description                          |
| ----------------- | ---------------------------- | ---------------- | ------------------------------------ |
| `layout`          | `"horizontal"` \| `"vertical"` | `"horizontal"` | Row, or a 364px full-width stack     |
| `order`           | `"default"` \| `"reverse"`   | `"default"`      | Reverse puts tertiary first          |
| `size`            | Button size                  | `"medium"`       | Passed to every button               |
| `tone`            | Button tone                  | `"brand"`        | Passed to every button               |
| `aria-label`      | `string`                     | —                | Accessible name for the group        |
| `aria-labelledby` | `string`                     | —                | ID of labelling element              |
| `className`       | `string`                     | —                | Wrapper class                        |

Gap is 16px. Radii come from Button (8px small/medium, 12px large). Vertical items stretch to the group width.

## Accessibility

- Wrapper is `role="group"`
- Each child stays a native `<button>`
- Reverse changes DOM order so tab order matches the visual order

## Related

- [Button](./button)
- [Shared utilities](./cn-helper)
