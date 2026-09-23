---
sidebar_position: 1
---

# Design System Overview

The design system lives in `@repo/ui` (`packages/ui`). Components are organized using atomic design principles and documented in **Storybook** for interactive previews.

## Structure

```
packages/ui/src/
├── atoms/           # Single-purpose UI building blocks
│   ├── button/
│   ├── icon/
│   ├── code/
│   ├── image-placeholder/
│   ├── tag/
│   ├── checkbox/
│   ├── select/
│   ├── avatar/
│   └── text-field/
├── molecules/       # Composed components built from atoms
│   ├── button-group/
│   ├── avatar-stack/
│   ├── avatar-labelled/
│   ├── avatar-dropdown/
│   └── card/
├── lib/             # Shared utilities and field building blocks
│   ├── cn.ts
│   ├── button-types.ts
│   ├── format-dot-list.ts
│   ├── use-controllable-string.ts
│   ├── use-field-ids.ts
│   ├── text-field-styles.ts
│   ├── field-header.tsx      # internal
│   └── field-error.tsx       # internal
└── styles.css       # Tailwind + design tokens
```

## Atoms vs molecules

| Layer        | When to use                                | Examples                                               |
| ------------ | ------------------------------------------ | ------------------------------------------------------ |
| **Atom**     | A single, reusable UI primitive            | Button, FeatherIcon, TextField, Code, ImagePlaceholder |
| **Molecule** | Combines atoms into a higher-level pattern | ButtonGroup, ItemCard                                  |

Add new **atoms** for standalone primitives. Add **molecules** when a component orchestrates multiple atoms or manages shared state (e.g. a radio-style button group).

## Storybook

Storybook is the **interactive catalog** for visual variants. Run it at http://localhost:6006:

```bash
pnpm storybook
```

Each component has a co-located `*.stories.tsx` file. Shared layout decorators (e.g. fixed-width wrappers) live in `.storybook/decorators.tsx`. Use Storybook to preview states; use these docs for API reference, import paths, and accessibility notes.

## Styling

All components use **Tailwind CSS v4**. Shared tokens and the Tailwind entry point are in `@repo/ui/styles.css`. Apps import this stylesheet and scan their own source for utility classes.

See [Design tokens](./tokens) and [Tailwind setup](../development/tailwind).

## Import pattern

Components are imported via explicit package exports:

```tsx
import { Button } from "@repo/ui/atoms/button";
import { FeatherIcon } from "@repo/ui/atoms/icon";
import { TextField } from "@repo/ui/atoms/text-field";
import { Tag } from "@repo/ui/atoms/tag";
import { Checkbox } from "@repo/ui/atoms/checkbox";
import { Select } from "@repo/ui/atoms/select";
import { Avatar } from "@repo/ui/atoms/avatar";
import { AvatarStack } from "@repo/ui/molecules/avatar-stack";
import { AvatarLabelled } from "@repo/ui/molecules/avatar-labelled";
import { AvatarDropdown } from "@repo/ui/molecules/avatar-dropdown";
import { ButtonGroup } from "@repo/ui/molecules/button-group";
import { ItemCard } from "@repo/ui/molecules/card";
import { cn } from "@repo/ui/lib/cn";
```

## Components

| Component        | Type     | Docs                                    |
| ---------------- | -------- | --------------------------------------- |
| Button           | Atom     | [Button](./button)                      |
| FeatherIcon      | Atom     | [Icon](./icon)                          |
| TextField        | Atom     | [TextField](./text-field)               |
| Tag              | Atom     | [Tag](./tag)                            |
| Checkbox         | Atom     | [Checkbox](./checkbox)                  |
| Select           | Atom     | [Select](./select)                      |
| Avatar           | Atom     | [Avatar](./avatar)                      |
| AvatarStack      | Molecule | [AvatarStack](./avatar-stack)           |
| AvatarLabelled   | Molecule | [AvatarLabelled](./avatar-labelled)     |
| AvatarDropdown   | Molecule | [AvatarDropdown](./avatar-dropdown)     |
| ImagePlaceholder | Atom     | [ImagePlaceholder](./image-placeholder) |
| Code             | Atom     | [Code](./code)                          |
| ItemCard         | Molecule | [ItemCard](./card)                      |
| ButtonGroup      | Molecule | [ButtonGroup](./button-group)           |
| Shared utilities | Lib      | [Shared utilities](./cn-helper)         |

## Related

- [Adding components](../development/adding-components)
- [Storybook workflow](../development/storybook)
