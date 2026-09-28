---
sidebar_position: 8.1
---

# AvatarStack

Overlapping row of [Avatar](./avatar) atoms with an overflow count. Matches Practical UI Avatar stack (small / medium / large).

**Import:** `@repo/ui/molecules/avatar-stack`

**Storybook:** Molecules/AvatarStack

## Usage

```tsx
import { AvatarStack } from "@repo/ui/molecules/avatar-stack";

<AvatarStack
  people={[
    { name: "Ada Lovelace", src: "/ada.jpg" },
    { name: "Alan Turing", src: "/alan.jpg" },
    { name: "Grace Hopper" },
  ]}
/>
```

## Props

| Prop     | Type           | Default    | Description                                      |
| -------- | -------------- | ---------- | ------------------------------------------------ |
| `people` | `AvatarStackPerson[]` | —     | People to show (`name`, optional `src` / `type`) |
| `size`   | `"small"` \| `"medium"` \| `"large"` | `"medium"` | Passed through to each Avatar           |
| `max`    | `number`       | `5`        | How many faces to show before the count          |
| `className` | `string`    | —          | Wrapper class                                    |

When `people.length` is greater than `max`, remaining people collapse into a trailing initials Avatar (`2+`, capped at `99+`). Each face has a 2px `fill-inverse` ring so they separate when they overlap.

Size4 / Size5 in Figma are “how many faces”, not extra sizes — use `max` for that.

## Accessibility

- Wrapper is `role="group"` with an accessible name summarizing the first person and how many others are stacked
- Individual avatars are `aria-hidden`; the group carries the name

## Related

- [Avatar](./avatar)
- [AvatarLabelled](./avatar-labelled)
- [ButtonGroup](./button-group)
