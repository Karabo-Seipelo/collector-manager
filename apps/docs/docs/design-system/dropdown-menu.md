---
sidebar_position: 7.4
---

# Dropdown menu

A floating menu of actions or options triggered by a button, icon button, or avatar trigger. The menu aligns to the trigger and supports keyboard navigation.

**Import:** `@repo/ui/molecules/dropdown-menu`

**Storybook:** Molecules/DropdownMenu

## Usage

```tsx
import { useState } from "react";
import { Button } from "@repo/ui/atoms/button";
import { FeatherIcon } from "@repo/ui/atoms/icon";
import {
  DropdownMenu,
  DropdownMenuAvatarItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/molecules/dropdown-menu";

const [open, setOpen] = useState(false);

<DropdownMenu open={open} onOpenChange={setOpen} align="bottom-left">
  <DropdownMenuTrigger>
    <Button
      variant="secondary"
      iconRight={
        <FeatherIcon name={open ? "chevron-up" : "chevron-down"} />
      }
    >
      Label
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent aria-label="Account menu">
    <DropdownMenuAvatarItem
      name="John Smith"
      description="john@practical-ui.com"
      src="/avatar.jpg"
    />
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<FeatherIcon name="user" size={24} />}>
      Profile
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<FeatherIcon name="log-out" size={24} />}>
      Sign out
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

Pair with [`AvatarDropdown`](./avatar-dropdown) for avatar triggers — the trigger molecule does not render the menu itself.

## Props

### `DropdownMenu`

| Prop             | Type                                                                 | Default          | Description                         |
| ---------------- | -------------------------------------------------------------------- | ---------------- | ----------------------------------- |
| `open`           | `boolean`                                                            | —                | Controlled open state               |
| `defaultOpen`    | `boolean`                                                            | `false`          | Initial uncontrolled open state     |
| `onOpenChange`   | `(open: boolean) => void`                                            | —                | Called when open state changes      |
| `align`          | `"bottom-left"` \| `"bottom-right"` \| `"top-left"` \| `"top-right"` | `"bottom-left"`  | Menu placement relative to trigger  |
| `closeOnSelect`  | `boolean`                                                            | `true`           | Close after selecting a menu item   |

### `DropdownMenuItem`

| Prop            | Type              | Default | Description                                      |
| --------------- | ----------------- | ------- | ------------------------------------------------ |
| `icon`          | `ReactNode`       | —       | Leading icon (24px)                              |
| `description`   | `string`          | —       | Secondary line under the label                   |
| `selected`      | `boolean`         | `false` | Selected background treatment                    |
| `trailing`      | `ReactNode`       | —       | Badge, count, toggle, or other trailing content  |
| `closeOnSelect` | `boolean`         | `true`  | Override menu-level close behavior for this item |
| `onSelect`      | `(event) => void` | —       | Called when the item is activated                |

### `DropdownMenuCheckboxItem`

| Prop              | Type                      | Default | Description                |
| ----------------- | ------------------------- | ------- | -------------------------- |
| `checked`         | `boolean`                 | —       | Controlled checked state   |
| `defaultChecked`  | `boolean`                 | `false` | Initial checked state      |
| `onCheckedChange` | `(checked: boolean) => void` | —    | Called when toggled        |

Checkbox items keep the menu open when toggled.

## Subcomponents

- **`DropdownMenuTrigger`** — wraps the trigger and wires `aria-expanded` / `aria-controls`
- **`DropdownMenuContent`** — 280px menu panel with overlay shadow
- **`DropdownMenuItem`** — default action row
- **`DropdownMenuCheckboxItem`** — checkbox row
- **`DropdownMenuAvatarItem`** — non-interactive avatar header row
- **`DropdownMenuLabel`** — section heading
- **`DropdownMenuSeparator`** — divider between groups

## Motion

The menu fades and scales in over 200ms when opened. Animations are disabled when the user prefers reduced motion.

## Accessibility

- Trigger uses `aria-haspopup="menu"` and `aria-expanded`
- Menu uses `role="menu"` with `menuitem` / `menuitemcheckbox` children
- Arrow keys, Home, and End move focus between items
- Escape closes the menu and returns focus to the trigger
- Click outside closes the menu
