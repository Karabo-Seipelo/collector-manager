---
sidebar_position: 8.3
---

# Hero

Marketing hero section with optional eyebrow, tag, email signup, CTAs, and social proof. Matches Practical UI Hero across five layout variants.

**Import:** `@repo/ui/organisms/hero`

**Storybook:** Organisms/Hero

## Usage

```tsx
import { Button } from "@repo/ui/atoms/button";
import { AvatarStack } from "@repo/ui/molecules/avatar-stack";
import { ButtonGroup } from "@repo/ui/molecules/button-group";
import { Rating } from "@repo/ui/molecules/rating";
import {
  Hero,
  HeroEmailSignup,
} from "@repo/ui/organisms/hero";

<Hero
  layout="horizontal"
  title="Lorem ipsum dolor sit amet tetur elit"
  description="Lorem ipsum dolor sit amet, con sec tetur adipiscing elit dolor sit."
  media={<img src="/hero.jpg" alt="" className="h-full w-full object-cover" />}
  emailSignup={<HeroEmailSignup />}
  actions={
    <ButtonGroup size="large">
      <Button>Buy now</Button>
      <Button>Free preview</Button>
    </ButtonGroup>
  }
  socialProof={
    <div className="flex items-center gap-4">
      <AvatarStack people={people} max={5} />
      <Rating value={3.5} layout="vertical" />
    </div>
  }
/>
```

## Layout variants

| `layout`              | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `horizontal`          | Content left, edge-to-edge media right                   |
| `horizontal-padded`   | Content and rounded media with horizontal page padding   |
| `vertical`            | Centered content, full-width media below                 |
| `vertical-large`      | Centered content, full-width media with rounded top edge |
| `vertical-small`      | Centered content, constrained rounded media below        |

## Props

| Prop           | Type              | Default        | Description                                |
| -------------- | ----------------- | -------------- | ------------------------------------------ |
| `layout`       | `HeroLayout`      | `"horizontal"` | Layout variant                             |
| `title`        | `string`          | —              | Display heading (required)                 |
| `description`  | `string`          | —              | Supporting copy (required)                 |
| `media`        | `React.ReactNode` | —              | Image or media slot (required)             |
| `eyebrow`      | `string`          | —              | Optional uppercase label above the title   |
| `tag`          | `React.ReactNode` | —              | Optional tag slot below the eyebrow        |
| `emailSignup`  | `React.ReactNode` | —              | Optional email capture row                 |
| `actions`      | `React.ReactNode` | —              | Optional CTA row (e.g. `ButtonGroup`)      |
| `socialProof`  | `React.ReactNode` | —              | Optional avatars and rating row            |
| `className`    | `string`          | —              | Additional classes on the root `<section>` |

### HeroEmailSignup

Convenience form composing `Input` and `Button` for the email row.

| Prop            | Type     | Default       | Description                    |
| --------------- | -------- | ------------- | ------------------------------ |
| `placeholder`   | `string` | `"Email"`     | Input placeholder and label    |
| `buttonLabel`   | `string` | `"Subscribe"` | Submit button text             |
| `onSubscribe`   | `(email: string) => void` | — | Called on form submit |

## Accessibility

- Uses semantic `<section>` with an `<h1>` for the page title
- Pass meaningful `alt` text on hero media images
- Email signup uses a labelled input and submit button

## Related

- [ButtonGroup](./button-group)
- [Input](./text-field)
- [Rating](./rating)
- [AvatarStack](./avatar-stack)
- [Tag](./tag)
