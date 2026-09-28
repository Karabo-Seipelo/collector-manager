---
sidebar_position: 7.7
---

# Rating

Read-only rating display with star or heart icons, optional numeric score, and review count link.

**Import:** `@repo/ui/molecules/rating`

**Storybook:** Molecules/Rating

## Usage

```tsx
import { Rating } from "@repo/ui/molecules/rating";

<Rating value={3.5} reviewCount={23} reviewsHref="#reviews" />
```

Use `layout="vertical"` for stacked score and review-count copy (for example, “From 23 reviews”).

## Props

| Prop           | Type                          | Default         | Description                                      |
| -------------- | ----------------------------- | --------------- | ------------------------------------------------ |
| `value`        | `number`                      | —               | Rating value, supports half steps (required)     |
| `max`          | `number`                      | `5`             | Maximum number of icons                          |
| `icon`         | `"star"` \| `"heart"`         | `"star"`        | Icon style                                       |
| `layout`       | `"horizontal"` \| `"vertical"` | `"horizontal"` | Layout of score and review metadata              |
| `showValue`    | `boolean`                     | `true`          | Show numeric score beside icons                  |
| `showReviews`  | `boolean`                     | `true`          | Show review count link                           |
| `reviewCount`  | `number`                      | `23`            | Number of reviews for the link label             |
| `reviewsHref`  | `string`                      | `"#reviews"`    | Review link destination                          |

## Layout

- Icons: 24px with 4px gap
- Score row: 8px gap between icons and numeric value
- Horizontal reviews: `(23 reviews)` underlined brand link, 8px from score row
- Vertical reviews: `From` weak label + underlined link on the next row, 4px row gap

## Accessibility

- Root uses `role="img"` with an `aria-label` like `3.5 out of 5 stars`
- Individual icons are decorative (`aria-hidden`)
- Review count renders as a focusable link with visible underline
