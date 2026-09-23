---
sidebar_position: 7.3
---

# Drawer

A panel that slides in from the side when triggered by an interactive element like a button. Similar to a modal, the drawer floats above the rest of the page and prevents interaction with the underlying content.

**Import:** `@repo/ui/organisms/drawer`

**Storybook:** Molecules/Drawer

## Usage

```tsx
import { useState } from "react";
import { Button } from "@repo/ui/atoms/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@repo/ui/organisms/drawer";
import { ButtonGroup } from "@repo/ui/molecules/button-group";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open drawer</Button>

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerHeader title="Heading" />
  <DrawerContent>{/* content */}</DrawerContent>
  <DrawerFooter>
    <ButtonGroup aria-label="Actions" layout="responsive">
      <Button>Save</Button>
      <Button>Cancel</Button>
      <Button>Skip</Button>
    </ButtonGroup>
  </DrawerFooter>
</Drawer>
```

## Props

| Prop                  | Type                         | Default   | Description                              |
| --------------------- | ---------------------------- | --------- | ---------------------------------------- |
| `open`                | `boolean`                    | —         | Controlled open state                    |
| `defaultOpen`         | `boolean`                    | `false`   | Initial uncontrolled open state          |
| `onOpenChange`        | `(open: boolean) => void`    | —         | Called when open state changes           |
| `side`                | `"left"` \| `"right"`        | `"right"` | Desktop panel edge (`md+`)               |
| `size`                | `"small"` \| `"large"`       | `"small"` | Desktop width: 400px or 600px          |
| `closeOnOverlayClick` | `boolean`                    | `true`    | Close when clicking the scrim            |
| `closeOnEscape`       | `boolean`                    | `true`    | Close on Escape                          |

## Subcomponents

- **`DrawerHeader`** — title and close control
- **`DrawerContent`** — scrollable body slot
- **`DrawerFooter`** — optional footer slot for actions

## Motion

- The scrim fades in and out over 300ms.
- The panel slides in from the right or left on desktop, and from the bottom on mobile.
- Exit animation completes before the drawer unmounts.
- Animations are disabled when the user prefers reduced motion.

## Responsive behavior

| Breakpoint | Layout |
| ---------- | ------ |
| Desktop (`md+`) | Side panel from `side` at 400px or 600px width |
| Mobile | Bottom sheet with 64px left scrim inset; use `ButtonGroup layout="responsive"` for stacked footer buttons |

On mobile, `side` does not change entry direction — the sheet always enters from the bottom, matching Practical UI.

## Accessibility

- Uses `role="dialog"` with `aria-modal="true"`
- Header title is exposed via `aria-labelledby`
- Close control has an accessible name
- Escape and overlay click close the drawer
- Focus is trapped while open and restored on close
- Body scroll is locked while open

## Related

- [ButtonGroup](./button-group)
- [Button](./button)
- [ButtonIcon](./button-icon)
