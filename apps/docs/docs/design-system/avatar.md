---
sidebar_position: 5.8
---

# Avatar

Circular identity mark for a user. Matches Practical UI: photo, icon, or initials at 32 / 48 / 64px.

**Import:** `@repo/ui/atoms/avatar`

**Storybook:** Atoms/Avatar

## Usage

```tsx
import { Avatar } from "@repo/ui/atoms/avatar";

<Avatar name="Karabo Seipelo" />
<Avatar name="Karabo Seipelo" src="/avatar.jpg" />
<Avatar name="Karabo Seipelo" type="icon" />
<Avatar name="Karabo Seipelo" size="large" />
```

When the avatar sits next to a visible name, mark it decorative:

```tsx
<Avatar name="Karabo Seipelo" aria-hidden="true" />
<p>Karabo Seipelo</p>
```

## Props

Extends native `span` attributes via `React.HTMLAttributes`.

| Prop   | Type                                      | Default                              | Description                                      |
| ------ | ----------------------------------------- | ------------------------------------ | ------------------------------------------------ |
| `name` | `string`                                  | —                                    | Source for initials and the accessible name      |
| `src`  | `string`                                  | —                                    | Photo URL; implies `type="photo"`                |
| `alt`  | `string`                                  | `name`                               | Photo alternative text                           |
| `size` | `"small"` \| `"medium"` \| `"large"`      | `"medium"`                           | 32px, 48px, or 64px                              |
| `type` | `"photo"` \| `"icon"` \| `"initials"`     | `"photo"` if `src`, else `"initials"` | Content variant                                  |
| `initials` | `string`                              | derived from `name`                  | Override the letters (used by AvatarStack overflow) |

Initials are the first letter of the first two words, or the first two letters of a single word. A failed photo falls back to initials. Icon uses `FeatherIcon` `user`.

Stack and labelled are separate Figma components: [AvatarStack](./avatar-stack) and [AvatarLabelled](./avatar-labelled). Status/notification badges are not in this atom yet.

## Accessibility

- Initials and icon avatars use `role="img"` and `aria-label={name}`
- Photos use a native `<img>` with `alt` (defaults to `name`)
- Pass `aria-hidden` when the name is already visible beside the avatar

## Related

- [ImagePlaceholder](./image-placeholder)
- [FeatherIcon](./icon)
- [AvatarStack](./avatar-stack)
- [AvatarLabelled](./avatar-labelled)
- [AvatarDropdown](./avatar-dropdown)
- [Shared utilities](./cn-helper)
