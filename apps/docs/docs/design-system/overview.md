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
│   └── image-placeholder/
├── molecules/       # Composed components built from atoms
│   ├── button-group/
│   └── card/
├── lib/             # Shared utilities
│   └── cn.ts
└── styles.css       # Tailwind + design tokens
```

## Atoms vs molecules

| Layer | When to use | Examples |
| --- | --- | --- |
| **Atom** | A single, reusable UI primitive | Button, FeatherIcon, Code, ImagePlaceholder |
| **Molecule** | Combines atoms into a higher-level pattern | ButtonGroup, ItemCard |

Add new **atoms** for standalone primitives. Add **molecules** when a component orchestrates multiple atoms or manages shared state (e.g. a radio-style button group).

## Storybook

Storybook is the **interactive catalog** for visual variants. Run it at http://localhost:6006:

```bash
pnpm storybook
```

Each component has a co-located `*.stories.tsx` file. Use Storybook to preview states; use these docs for API reference, import paths, and accessibility notes.

## Styling

All components use **Tailwind CSS v4**. Shared tokens and the Tailwind entry point are in `@repo/ui/styles.css`. Apps import this stylesheet and scan their own source for utility classes.

See [Design tokens](./tokens) and [Tailwind setup](../development/tailwind).

## Import pattern

Components are imported via explicit package exports:

```tsx
import { Button } from "@repo/ui/atoms/button";
import { FeatherIcon } from "@repo/ui/atoms/icon";
import { ButtonGroup } from "@repo/ui/molecules/button-group";
import { ItemCard } from "@repo/ui/molecules/card";
```

## Components

| Component | Type | Docs |
| --- | --- | --- |
| Button | Atom | [Button](./button) |
| FeatherIcon | Atom | [Icon](./icon) |
| ImagePlaceholder | Atom | [ImagePlaceholder](./image-placeholder) |
| Code | Atom | [Code](./code) |
| ItemCard | Molecule | [ItemCard](./card) |
| ButtonGroup | Molecule | [ButtonGroup](./button-group) |
| `cn` | Utility | [cn helper](./cn-helper) |

## Related

- [Adding components](../development/adding-components)
- [Storybook workflow](../development/storybook)
