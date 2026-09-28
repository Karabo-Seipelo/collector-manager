---
sidebar_position: 4
---

# FeatherIcon

Renders icons from the [Feather Icons](https://feathericons.com/) set as inline SVG.

**Import:** `@repo/ui/atoms/icon`

**Storybook:** Atoms/Icon

## Usage

```tsx
import { FeatherIcon } from "@repo/ui/atoms/icon";

<FeatherIcon name="search" />

<FeatherIcon name="bell" size={20} strokeWidth={2} className="text-neutral-600" />
```

## Props

| Prop          | Type              | Default  | Description                    |
| ------------- | ----------------- | -------- | ------------------------------ |
| `name`        | `FeatherIconName` | required | Icon name from the Feather set |
| `size`        | `number`          | `24`     | Width and height in pixels     |
| `strokeWidth` | `number`          | `2`      | SVG stroke width               |
| `className`   | `string`          | —        | Additional CSS classes         |

## Icon names

Use kebab-case names matching [feathericons.com](https://feathericons.com/), for example:

`home`, `search`, `settings`, `user`, `plus`, `edit`, `trash-2`, `check`, `x`, `arrow-right`, `bell`

TypeScript provides autocomplete via the `FeatherIconName` type.

## Pairing with Button

```tsx
import { Button } from "@repo/ui/atoms/button";
import { ButtonIcon } from "@repo/ui/atoms/button-icon";
import { FeatherIcon } from "@repo/ui/atoms/icon";

<Button iconLeft={<FeatherIcon name="plus" />}>Add item</Button>

<Button iconRight={<FeatherIcon name="arrow-right" />}>Continue</Button>

<Button iconOnly={<FeatherIcon name="menu" />} aria-label="Open menu" />

<ButtonIcon icon={<FeatherIcon name="plus" />} aria-label="Add" />
```

Icons inherit `currentColor` from parent text color, so Tailwind text utilities on the button apply automatically.

## Accessibility

- Decorative icons render with `aria-hidden="true"`
- When an icon is the only content in a button, set `aria-label` on the **Button**, not the icon

## Related

- [Button](./button)
- [ButtonIcon](./button-icon)
