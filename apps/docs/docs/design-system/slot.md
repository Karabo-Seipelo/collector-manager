---
sidebar_position: 4.05
---

# Slot

Placeholder for swappable content areas in composed layouts, matching Practical UI Slot.

**Import:** `@repo/ui/atoms/slot`

**Storybook:** Atoms/Slot

## Usage

Use `Slot` in Storybook examples and docs to mark where real content should be composed. In production UI, replace the slot with the actual component.

```tsx
import { Slot } from "@repo/ui/atoms/slot";

<CardContent>
  <CardHeader heading="Heading" description="Supporting information." />
  <Slot />
</CardContent>
```

Swap in real content when building a screen:

```tsx
<CardContent>
  <CardHeader heading="Heading" description="Supporting information." />
  <ButtonGroup aria-label="Actions">
    <Button>Save</Button>
    <Button>Cancel</Button>
  </ButtonGroup>
</CardContent>
```

## Props

| Prop        | Type     | Default                        | Description                              |
| ----------- | -------- | ------------------------------ | ---------------------------------------- |
| `label`     | `string` | `"Swap with another component"`| Placeholder text when `children` is omitted |
| `className` | `string` | —                              | Additional classes for the container     |

Accepts standard `div` attributes. Pass `children` to render custom content inside the slot chrome instead of the default label.

## Layout

- Full-width dashed container with 8px radius
- Weak fill background and strong dashed stroke
- 32px horizontal and 24px vertical padding
- Monospace placeholder label at 14px in weak text colour

## Accessibility

- The default placeholder label is decorative and marked `aria-hidden`
- When rendering real content via `children`, provide appropriate labels and roles on the composed components

## Related

- [Card](./card)
- [Drawer](./drawer)
- [ImagePlaceholder](./image-placeholder)
