---
sidebar_position: 7.4
---

# Modal

A centered overlay dialog for confirmations, forms, and focused tasks. On mobile it presents as a bottom sheet; on desktop it scales in at the center of the viewport.

**Import:** `@repo/ui/organisms/modal`

**Storybook:** Organisms/Modal

## Usage

```tsx
import { useState } from "react";
import { Button } from "@repo/ui/atoms/button";
import { FeatherIcon } from "@repo/ui/atoms/icon";
import { ButtonGroup } from "@repo/ui/molecules/button-group";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalMedia,
} from "@repo/ui/organisms/modal";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open modal</Button>

<Modal open={open} onOpenChange={setOpen} dismissible>
  <ModalHeader
    title="Heading"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    icon={<FeatherIcon name="layers" size={24} />}
  />
  <ModalMedia>
    <img src="/preview.jpg" alt="" className="h-full w-full object-cover" />
  </ModalMedia>
  <ModalContent>{/* slots or custom content */}</ModalContent>
  <ModalFooter>
    <ButtonGroup aria-label="Actions" layout="responsive">
      <Button>Confirm</Button>
      <Button variant="secondary" tone="neutral">Cancel</Button>
    </ButtonGroup>
  </ModalFooter>
</Modal>
```

## Props

| Prop                  | Type                         | Default     | Description                              |
| --------------------- | ---------------------------- | ----------- | ---------------------------------------- |
| `open`                | `boolean`                    | —           | Controlled open state                    |
| `defaultOpen`         | `boolean`                    | `false`     | Initial uncontrolled open state          |
| `onOpenChange`        | `(open: boolean) => void`    | —           | Called when open state changes           |
| `size`                | `"small"` \| `"large"`       | `"small"`   | Desktop width: 500px or 700px            |
| `tone`                | `"default"` \| `"destructive"` | `"default"` | Header icon tone                         |
| `dismissible`         | `boolean`                    | `false`     | Show top-right close button              |
| `closeOnOverlayClick` | `boolean`                    | `true`      | Close when clicking the scrim            |
| `closeOnEscape`       | `boolean`                    | `true`      | Close on Escape                          |

## Subcomponents

- **`ModalHeader`** — optional icon, title, and description
- **`ModalMedia`** — optional 245px image slot
- **`ModalContent`** — scrollable body slot
- **`ModalFooter`** — optional footer slot for actions

### ModalHeader

| Prop            | Type              | Default | Description                         |
| --------------- | ----------------- | ------- | ----------------------------------- |
| `title`         | `string`          | —       | Dialog heading (required)           |
| `description`   | `string`          | —       | Supporting copy                     |
| `icon`          | `React.ReactNode` | —       | Icon inside `IconContainer`         |
| `headingLevel`  | `2`–`6`           | `2`     | Heading level for the title         |

## Destructive tone

Set `tone="destructive"` on `Modal` to render a destructive `IconContainer`. Style actions individually — do not rely on `ButtonGroup tone` alone, because it applies the same tone to every button:

```tsx
<Modal tone="destructive" dismissible>
  <ModalHeader
    title="Delete account?"
    description="This action cannot be undone."
    icon={<FeatherIcon name="alert-triangle" size={24} />}
  />
  <ModalFooter>
    <ButtonGroup aria-label="Actions" layout="responsive">
      <Button tone="destructive">Delete</Button>
      <Button variant="secondary" tone="neutral">Cancel</Button>
    </ButtonGroup>
  </ModalFooter>
</Modal>
```

## Motion

- The scrim fades in over 300ms with a 12px backdrop blur.
- The panel slides up on mobile and scales in on desktop.
- Exit animation completes before the modal unmounts.
- Animations are disabled when the user prefers reduced motion.

## Responsive behavior

| Breakpoint | Layout |
| ---------- | ------ |
| Desktop (`md+`) | Centered panel at 500px or 700px width |
| Mobile | Full-width bottom sheet; use `ButtonGroup layout="responsive"` for stacked footer buttons |

## Accessibility

- Uses `role="dialog"` with `aria-modal="true"`
- Title is exposed via `aria-labelledby`
- Description is linked with `aria-describedby` only when provided
- Optional dismiss control has an accessible name
- Escape and overlay click close the modal
- Focus is trapped while open and restored on close
- Body scroll is locked while open

## Related

- [Drawer](./drawer)
- [ButtonGroup](./button-group)
- [IconContainer](./icon-container)
- [Slot](./slot)
