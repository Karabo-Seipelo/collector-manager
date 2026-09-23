---
sidebar_position: 7.5
---

# Navigation side

Persistent sidebar navigation for app shells. Desktop shows a 320px side panel; mobile uses a top header bar and slide-in drawer with overlay.

**Import:** `@repo/ui/organisms/navigation-side`

**Storybook:** Organisms/NavigationSide

## Usage

```tsx
import { useState } from "react";
import { Avatar } from "@repo/ui/atoms/avatar";
import { Button } from "@repo/ui/atoms/button";
import { FeatherIcon } from "@repo/ui/atoms/icon";
import { SearchInput } from "@repo/ui/molecules/search-input";
import { AvatarDropdown } from "@repo/ui/organisms/avatar-dropdown";
import {
  NavigationSide,
  NavigationSideBottom,
  NavigationSideClose,
  NavigationSideContent,
  NavigationSideDivider,
  NavigationSideHeader,
  NavigationSideItem,
  NavigationSideLogo,
  NavigationSideMobileHeader,
  NavigationSideSection,
  NavigationSideTop,
} from "@repo/ui/organisms/navigation-side";

const [open, setOpen] = useState(false);

<NavigationSideMobileHeader
  logo={<Logo />}
  avatar={<Avatar src={photoSrc} alt="John Smith" size="small" />}
  onMenuClick={() => setOpen(true)}
/>

<NavigationSide open={open} onOpenChange={setOpen}>
  <NavigationSideTop>
    <NavigationSideClose />
    <NavigationSideLogo>{/* logo — hidden on mobile drawer */}</NavigationSideLogo>
    <NavigationSideSection>
      <SearchInput aria-label="Search navigation" />
    </NavigationSideSection>
  </NavigationSideTop>
  <NavigationSideContent>
    <NavigationSideItem href="/home" icon={<FeatherIcon name="home" size={24} />} selected>
      Home
    </NavigationSideItem>
    <NavigationSideDivider />
    <NavigationSideHeader>Workspace</NavigationSideHeader>
    <NavigationSideItem href="/settings" icon={<FeatherIcon name="settings" size={24} />}>
      Settings
    </NavigationSideItem>
  </NavigationSideContent>
  <NavigationSideBottom>
    <NavigationSideSection>
      <Button className="w-full">Upgrade</Button>
    </NavigationSideSection>
    <NavigationSideSection>
      <AvatarDropdown variant="navigation" name="John Smith" description="john@practical-ui.com" />
    </NavigationSideSection>
  </NavigationSideBottom>
</NavigationSide>
```

## Props

### NavigationSide

| Prop                  | Type                      | Default   | Description                              |
| --------------------- | ------------------------- | --------- | ---------------------------------------- |
| `open`                | `boolean`                 | —         | Controlled mobile drawer open state      |
| `defaultOpen`         | `boolean`                 | `false`   | Initial uncontrolled open state          |
| `onOpenChange`        | `(open: boolean) => void` | —         | Called when open state changes           |
| `closeOnOverlayClick` | `boolean`                 | `true`    | Close when clicking the scrim            |
| `closeOnEscape`       | `boolean`                 | `true`    | Close on Escape                          |
| `closeOnNavigate`     | `boolean`                 | `true`    | Close drawer after selecting a link      |
| `aria-label`          | `string`                  | `"Main"`  | Accessible name for the `<nav>` landmark |

### NavigationSideItem

| Prop              | Type              | Default | Description                                |
| ----------------- | ----------------- | ------- | ------------------------------------------ |
| `href`            | `string`          | —       | Renders an anchor when provided            |
| `icon`            | `React.ReactNode` | —       | Leading icon                               |
| `selected`        | `boolean`         | `false` | Active state with left brand indicator     |
| `badge`           | `React.ReactNode` | —       | Trailing badge (`BadgeCount`, `Badge`, …)  |
| `closeOnNavigate` | `boolean`         | `true`  | Close mobile drawer after click            |

## Subcomponents

- **`NavigationSideTop`** — logo and search region
- **`NavigationSideClose`** — mobile drawer close button
- **`NavigationSideLogo`** — logo slot (desktop only)
- **`NavigationSideSection`** — padded slot wrapper for search, alerts, buttons, avatar
- **`NavigationSideContent`** — scrollable primary nav items
- **`NavigationSideBottom`** — footer nav, promo, CTA, and user row
- **`NavigationSideItem`** — nav link or button row
- **`NavigationSideHeader`** — non-interactive section label
- **`NavigationSideDivider`** — inset divider between groups
- **`NavigationSideMobileHeader`** — mobile top bar with menu, logo, and avatar

## Responsive behavior

| Breakpoint | Layout |
| ---------- | ------ |
| Desktop (`md+`) | Fixed 320px sidebar in page layout; always visible |
| Mobile | 72px top header bar; sidebar slides in as a drawer when `open` |

Wire `NavigationSideMobileHeader` `onMenuClick` to set `open` to `true`. The drawer closes via overlay click, Escape, the close button, or navigating to a link.

## Item states

Selected items use a 4px left brand border and `bg-fill-hover`. Default, hover, press, and focus states follow the same interaction tokens as dropdown menu items.

## Accessibility

- Root uses `<aside aria-label="Main">` (customize via `aria-label`)
- Selected links expose `aria-current="page"`
- Mobile drawer traps focus and locks body scroll while open
- Overlay click and Escape close the drawer

## Related

- [AvatarDropdown](./avatar-dropdown)
- [SearchInput](./search-input)
- [BadgeCount](./badge-count)
- [Drawer](./drawer)
