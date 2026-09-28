---
sidebar_position: 7
---

# Card

Content container for information and actions about a single topic, matching Practical UI Card.

**Import:** `@repo/ui/molecules/card`

**Storybook:** Molecules/Card

## Usage

```tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardImage,
} from "@repo/ui/molecules/card";
import { AvatarLabelled } from "@repo/ui/molecules/avatar-labelled";

<Card>
  <CardImage>
    <img src="/images/beach.jpg" alt="Dunes beside a beach" />
  </CardImage>
  <CardContent>
    <CardHeader
      heading="Heading"
      description="Supporting information about this topic."
    />
    <a href="/details">View details</a>
    <AvatarLabelled
      name="John Smith"
      description="john@example.com"
    />
  </CardContent>
</Card>
```

Horizontal layout:

```tsx
<Card orientation="horizontal">
  <CardImage>
    <img src="/images/beach.jpg" alt="" />
  </CardImage>
  <CardContent>
    <CardHeader heading="Heading" description="Supporting information." />
  </CardContent>
</Card>
```

## Components

| Component     | Purpose                                                                |
| ------------- | ---------------------------------------------------------------------- |
| `Card`        | Raised container; `orientation` is `"vertical"` or `"horizontal"`      |
| `CardImage`   | Cropped media area: 204px high vertically or 225px wide horizontally   |
| `CardContent` | 32px padded content stack with 24px gaps                               |
| `CardHeader`  | Optional icon, uppercase label, heading, and supporting description    |

`CardContent` accepts arbitrary children. Compose existing `IconContainer`,
`AvatarLabelled`, `Tag`, links, buttons, or feature-specific content instead of
adding one prop for every possible slot. Use [`Slot`](./slot) in examples to
mark swappable areas before real content is wired in.

`CardHeader` supports `headingLevel={2 | 3 | 4 | 5 | 6}` and defaults to `3`.

## Visual states

- Default: raised background, weak border, 16px radius, raised shadow
- Hover: overlay shadow
- Press: sunken shadow
- Focus: 2px brand focus ring when the card or content inside receives focus

## Accessibility

- Use the heading level appropriate to the surrounding page hierarchy.
- Give meaningful images useful alt text; use `alt=""` for decorative images.
- The card is a container, not one large button, so links, buttons, tags, and
  other controls remain valid interactive children.
- The focus ring uses `:focus-within` so keyboard focus remains visible around
  the card while a child control is active.

## Storybook stories

Stories cover vertical and horizontal layouts plus the Practical UI recipes:
image, image + avatar, image + tags, image + text link, icon, text only, and
**CompactImage** (dense grid tile used on the Collection template).

## Related

- [AvatarLabelled](./avatar-labelled)
- [IconContainer](./icon-container)
- [Tag](./tag)
- [Design tokens](./tokens)
- [Design system overview](./overview)
