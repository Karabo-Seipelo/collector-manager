---
sidebar_position: 7.6
---

# Navigation header

Top app bar with horizontal nav on desktop and a slide-in menu drawer on mobile. Matches Practical UI Navigation header across desktop, mobile closed, and mobile open variants.

**Import:** `@repo/ui/organisms/navigation-header`

**Storybook:** Organisms/NavigationHeader

## Usage

```tsx
import { useState } from "react";
import { Avatar } from "@repo/ui/atoms/avatar";
import { Button } from "@repo/ui/atoms/button";
import { Breadcrumbs } from "@repo/ui/molecules/breadcrumbs";
import { ButtonGroup } from "@repo/ui/molecules/button-group";
import { SearchInput } from "@repo/ui/molecules/search-input";
import { AvatarDropdown } from "@repo/ui/organisms/avatar-dropdown";
import {
  NavigationHeader,
  NavigationHeaderBar,
  NavigationHeaderButtons,
  NavigationHeaderItem,
  NavigationHeaderLeft,
  NavigationHeaderLogo,
  NavigationHeaderMobileDrawer,
  NavigationHeaderMobileFooter,
  NavigationHeaderMobileHeader,
  NavigationHeaderMobileItem,
  NavigationHeaderMobileNav,
  NavigationHeaderNav,
  NavigationHeaderRight,
  NavigationHeaderSearch,
  NavigationHeaderUser,
} from "@repo/ui/organisms/navigation-header";

const [open, setOpen] = useState(false);

<NavigationHeader open={open} onOpenChange={setOpen}>
  <NavigationHeaderBar>
    <NavigationHeaderLeft>
      <NavigationHeaderLogo>{/* logo */}</NavigationHeaderLogo>
      <NavigationHeaderNav>
        <NavigationHeaderItem href="/home" selected>Home</NavigationHeaderItem>
        <NavigationHeaderItem href="/projects">Projects</NavigationHeaderItem>
      </NavigationHeaderNav>
    </NavigationHeaderLeft>
    <NavigationHeaderRight>
      <NavigationHeaderSearch>
        <SearchInput size="small" aria-label="Search" />
      </NavigationHeaderSearch>
      <NavigationHeaderButtons>
        <ButtonGroup aria-label="Actions" size="small">
          <Button variant="secondary">Secondary</Button>
          <Button>Primary</Button>
        </ButtonGroup>
      </NavigationHeaderButtons>
      <NavigationHeaderUser
        desktop={<AvatarDropdown name="John Smith" size="small" />}
        mobile={<Avatar name="John Smith" size="small" />}
      />
    </NavigationHeaderRight>
  </NavigationHeaderBar>
  <NavigationHeaderMobileDrawer>
    <NavigationHeaderMobileHeader />
    <NavigationHeaderMobileNav>
      <NavigationHeaderMobileItem href="/home" selected>Home</NavigationHeaderMobileItem>
    </NavigationHeaderMobileNav>
    <NavigationHeaderMobileFooter>
      <ButtonGroup layout="vertical" size="large" aria-label="Mobile actions">
        <Button variant="secondary">Secondary</Button>
        <Button>Primary</Button>
      </ButtonGroup>
    </NavigationHeaderMobileFooter>
  </NavigationHeaderMobileDrawer>
</NavigationHeader>
```

## Props

### NavigationHeader

| Prop                  | Type                      | Default   | Description                         |
| --------------------- | ------------------------- | --------- | ----------------------------------- |
| `open`                | `boolean`                 | —         | Controlled mobile drawer open state |
| `defaultOpen`         | `boolean`                 | `false`   | Initial uncontrolled open state     |
| `onOpenChange`        | `(open: boolean) => void` | —         | Called when open state changes      |
| `closeOnOverlayClick` | `boolean`                 | `true`    | Close when clicking the scrim       |
| `closeOnEscape`       | `boolean`                 | `true`    | Close on Escape                     |
| `closeOnNavigate`     | `boolean`                 | `true`    | Close drawer after selecting a link |

### NavigationHeaderItem

| Prop       | Type              | Default | Description                              |
| ---------- | ----------------- | ------- | ---------------------------------------- |
| `href`     | `string`          | —       | Renders an anchor when provided          |
| `icon`     | `React.ReactNode` | —       | Optional leading icon                    |
| `selected` | `boolean`         | `false` | Active state with bottom brand indicator |
| `badge`    | `React.ReactNode` | —       | Trailing badge                           |

## Subcomponents

**Bar (desktop + mobile closed):**
- **`NavigationHeaderBar`** — 72px root header
- **`NavigationHeaderLeft`** — logo, breadcrumbs, and nav (includes mobile menu button)
- **`NavigationHeaderLogo`** — logo slot
- **`NavigationHeaderNav`** — horizontal nav links (hidden below `md`)
- **`NavigationHeaderItem`** — desktop nav link with bottom-border selected state
- **`NavigationHeaderRight`** — search, actions, buttons, and user menu
- **`NavigationHeaderSearch`** — desktop-only search slot (`hidden md:block`)
- **`NavigationHeaderActions`** — icon button cluster
- **`NavigationHeaderButtons`** — desktop-only CTA row
- **`NavigationHeaderUser`** — responsive user slot (`desktop` / `mobile`)

**Mobile drawer:**
- **`NavigationHeaderMobileDrawer`** — registers drawer content (rendered in a portal when open)
- **`NavigationHeaderMobileHeader`** — close button
- **`NavigationHeaderMobileSearch`** — optional search row
- **`NavigationHeaderMobileNav`** — scrollable nav list
- **`NavigationHeaderMobileItem`** — vertical nav row with left-border selected state
- **`NavigationHeaderMobileDivider`** — section divider
- **`NavigationHeaderMobileFooter`** — stacked CTAs and profile
- **`NavigationHeaderMobileProfile`** — divider + avatar labelled row

## Responsive behavior

| Breakpoint | Layout |
| ---------- | ------ |
| Desktop (`md+`) | Full horizontal bar with inline nav, search, CTAs, and avatar dropdown |
| Mobile closed | Hamburger + logo + avatar; nav links hidden |
| Mobile open | 327px drawer with vertical nav, stacked CTAs, and profile footer |

Compose with **`Breadcrumbs`**, **`SearchInput`**, **`ButtonGroup`**, and **`AvatarDropdown`** for the full Practical UI variants.

## Accessibility

- Desktop nav uses `<nav aria-label="Primary">`
- Selected links expose `aria-current="page"`
- Mobile drawer traps focus and locks body scroll while open
- Menu and close buttons have accessible names

## Related

- [Navigation side](./navigation-side)
- [Breadcrumbs](./breadcrumbs)
- [AvatarDropdown](./avatar-dropdown)
- [ButtonGroup](./button-group)
