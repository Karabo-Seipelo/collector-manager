---
sidebar_position: 8.3
---

# Tooltip

Dark inverse tooltip bubble with directional arrow, matching Practical UI Tooltip.

**Import:** `@repo/ui/molecules/tooltip`

**Storybook:** Molecules/Tooltip

## Usage

Interactive tooltip:

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/molecules/tooltip";

<Tooltip placement="bottom-center">
  <TooltipTrigger>
    <ButtonIcon aria-label="More information" ... />
  </TooltipTrigger>
  <TooltipContent>Lorem ipsum dolor</TooltipContent>
</Tooltip>
```

Large tooltip with heading:

```tsx
<Tooltip placement="top-center" size="large">
  <TooltipTrigger>
    <button type="button">Hover for details</button>
  </TooltipTrigger>
  <TooltipContent heading="Lorem ipsum dolor">
    Lorem ipsum dolor sit amet, consec tetur adipiscing elit.
  </TooltipContent>
</Tooltip>
```

Static bubble (design previews):

```tsx
import { TooltipBubble } from "@repo/ui/molecules/tooltip";

<TooltipBubble placement="bottom-left">Lorem ipsum dolor</TooltipBubble>
```

## Props

### Tooltip

| Prop            | Type                     | Default         | Description                    |
| --------------- | ------------------------ | --------------- | ------------------------------ |
| `open`          | `boolean`                | —               | Controlled visibility          |
| `defaultOpen`   | `boolean`                | `false`         | Initial visibility             |
| `onOpenChange`  | `(open: boolean) => void`| —               | Visibility change handler      |
| `placement`     | `TooltipPlacement`       | `"bottom-left"` | Bubble position and arrow      |
| `size`          | `"small"` \| `"large"`   | `"small"`       | Content density                |

### TooltipContent

| Prop        | Type          | Description                              |
| ----------- | ------------- | ---------------------------------------- |
| `heading`   | `ReactNode`   | Optional bold title for large tooltips   |
| `children`  | `ReactNode`   | Tooltip body (required)                  |

### TooltipBubble

| Prop        | Type                | Default         | Description                         |
| ----------- | ------------------- | --------------- | ----------------------------------- |
| `size`      | `"small"` \| `"large"` | `"small"`    | Single-line or heading + body       |
| `placement` | `TooltipPlacement`  | `"bottom-left"` | Arrow side and alignment          |
| `heading`   | `ReactNode`         | —               | Large tooltip title                 |
| `children`  | `ReactNode`         | —               | Tooltip body (required)             |

### TooltipPlacement

`bottom-left`, `bottom-right`, `bottom-center`, `top-left`, `top-right`, `top-center`, `left`, `right`

## Layout

- Inverse bubble: 12px radius, 32px horizontal / 24px vertical padding
- Small: single line, inverse strong text
- Large: semibold heading + inverse weak body, up to 364px wide
- Arrow: 32×16px caret aligned to placement
- 8px gap between trigger and tooltip when interactive

## Accessibility

- Tooltip content uses `role="tooltip"`
- Trigger sets `aria-describedby` while open
- Opens on hover and focus; closes on blur, mouse leave, and Escape

## Related

- [Dropdown menu](./dropdown-menu)
- [Button icon](./button-icon)
