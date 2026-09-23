---
sidebar_position: 8.2
---

# Testimonial

Customer quote with optional author details and star rating, matching Practical UI Testimonial.

**Import:** `@repo/ui/molecules/testimonial`

**Storybook:** Molecules/Testimonial

## Usage

```tsx
import { Testimonial } from "@repo/ui/molecules/testimonial";

<Testimonial
  align="left"
  quote="Such a useful and practical book by one of the best in the game."
  author={{
    name: "John Smith",
    description: "john@practical-ui.com",
  }}
  rating={3.5}
/>
```

Center-aligned variant:

```tsx
<Testimonial
  align="center"
  quote="Surprisingly powerful."
  author={{
    name: "John Smith",
    description: "john@practical-ui.com",
  }}
  rating={5}
/>
```

## Props

| Prop         | Type                    | Default  | Description                              |
| ------------ | ----------------------- | -------- | ---------------------------------------- |
| `quote`      | `string`                | —        | Testimonial body text (required)         |
| `align`      | `"left"` \| `"center"`  | `"left"` | Horizontal alignment                     |
| `author`     | `TestimonialAuthor`     | —        | Optional avatar, name, and description   |
| `rating`     | `number`                | —        | Optional star rating value               |
| `maxRating`  | `number`                | `5`      | Maximum rating scale                     |
| `className`  | `string`                | —        | Additional classes on the root `<figure>`|

### TestimonialAuthor

| Prop          | Type     | Description                |
| ------------- | -------- | -------------------------- |
| `name`        | `string` | Author name (required)     |
| `description` | `string` | Secondary line (e.g. email)|
| `src`         | `string` | Avatar image URL           |
| `alt`         | `string` | Avatar alt text            |

## Layout

- Vertical stack with 24px gap
- Max width 364px by default
- Quote: small regular text in weak colour
- Author: medium `AvatarLabelled` when provided
- Rating: stars only via `Rating` (no value or review link)

## Accessibility

- Uses semantic `<figure>`, `<figcaption>`, and `<blockquote>`
- Star rating exposes an `img` role with an accessible value label

## Related

- [Avatar labelled](./avatar-labelled)
- [Rating](./rating)
