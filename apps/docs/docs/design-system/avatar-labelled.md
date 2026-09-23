---
sidebar_position: 8.2
---

# AvatarLabelled

Avatar plus name, with an optional description. Matches Practical UI Avatar labelled.

**Import:** `@repo/ui/molecules/avatar-labelled`

**Storybook:** Molecules/AvatarLabelled

## Usage

```tsx
import { AvatarLabelled } from "@repo/ui/molecules/avatar-labelled";

<AvatarLabelled name="John Smith" description="john@practical-ui.com" />

<AvatarLabelled
  name="John Smith"
  description="john@practical-ui.com"
  src="/john.jpg"
  size="large"
/>
```

Small in the spec is name-only (8px gap, `text-tiny`). Medium and large add a description (12px gap, name `text-small`).

## Props

| Prop          | Type                                 | Default    | Description                         |
| ------------- | ------------------------------------ | ---------- | ----------------------------------- |
| `name`        | `string`                             | —          | Visible name; also seeds initials   |
| `description` | `string`                             | —          | Second line (email, plan, etc.)     |
| `src`         | `string`                             | —          | Passed through to [Avatar](./avatar) |
| `alt`         | `string`                             | —          | Photo alt; unused when decorative   |
| `type`        | `"photo"` \| `"icon"` \| `"initials"` | derived   | Passed through to Avatar            |
| `size`        | `"small"` \| `"medium"` \| `"large"` | `"medium"` | Avatar size and type scale          |
| `className`   | `string`                             | —          | Wrapper class                       |

## Accessibility

- The name is visible text, so the Avatar is `aria-hidden`
- Description is a second text line, not a substitute for the name

## Related

- [Avatar](./avatar)
- [AvatarDropdown](./avatar-dropdown)
- [AvatarStack](./avatar-stack)
