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
│   ├── button-icon/
│   ├── icon/
│   ├── icon-container/
│   ├── code/
│   ├── image-placeholder/
│   ├── tag/
│   ├── badge/
│   ├── badge-count/
│   ├── badge-dot/
│   ├── breadcrumbs/
│   ├── checkbox/
│   ├── radio/
│   ├── toggle/
│   ├── divider/
│   ├── alert/
│   ├── alert-global/
│   ├── select/
│   ├── avatar/
│   ├── text-area/
│   └── text-field/
├── molecules/       # Composed components built from atoms
│   ├── button-group/
│   ├── accordion/
│   ├── autocomplete/
│   ├── checkbox-group/
│   ├── radio-group/
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

| Layer        | When to use                                | Examples                                                                             |
| ------------ | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| **Atom**     | A single, reusable UI primitive            | Button, ButtonIcon, FeatherIcon, TextField, TextArea, Toggle, Divider, Alert, AlertGlobal, Code, ImagePlaceholder |
| **Molecule** | Combines atoms into a higher-level pattern | Accordion, ButtonGroup, ItemCard                                                     |

Add new **atoms** for standalone primitives. Add **molecules** when a component orchestrates multiple atoms (e.g. a primary/secondary/tertiary button cluster).

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
import { ButtonIcon } from "@repo/ui/atoms/button-icon";
import { FeatherIcon } from "@repo/ui/atoms/icon";
import { IconContainer } from "@repo/ui/atoms/icon-container";
import { TextField } from "@repo/ui/atoms/text-field";
import { TextArea } from "@repo/ui/atoms/text-area";
import { Tag } from "@repo/ui/atoms/tag";
import { Badge } from "@repo/ui/atoms/badge";
import { BadgeCount } from "@repo/ui/atoms/badge-count";
import { BadgeDot } from "@repo/ui/atoms/badge-dot";
import { Breadcrumbs } from "@repo/ui/atoms/breadcrumbs";
import { Checkbox } from "@repo/ui/atoms/checkbox";
import { Radio } from "@repo/ui/atoms/radio";
import { Toggle } from "@repo/ui/atoms/toggle";
import { Divider } from "@repo/ui/atoms/divider";
import { Alert } from "@repo/ui/atoms/alert";
import { AlertGlobal } from "@repo/ui/atoms/alert-global";
import { Select } from "@repo/ui/atoms/select";
import { Accordion, AccordionItem } from "@repo/ui/molecules/accordion";
import { Autocomplete } from "@repo/ui/molecules/autocomplete";
import { Avatar } from "@repo/ui/atoms/avatar";
import { AvatarStack } from "@repo/ui/molecules/avatar-stack";
import { AvatarLabelled } from "@repo/ui/molecules/avatar-labelled";
import { AvatarDropdown } from "@repo/ui/molecules/avatar-dropdown";
import { ButtonGroup } from "@repo/ui/molecules/button-group";
import { CheckboxGroup } from "@repo/ui/molecules/checkbox-group";
import { RadioGroup } from "@repo/ui/molecules/radio-group";
import { ItemCard } from "@repo/ui/molecules/card";
import { cn } from "@repo/ui/lib/cn";
```

## Components

| Component        | Type     | Docs                                    |
| ---------------- | -------- | --------------------------------------- |
| Button           | Atom     | [Button](./button)                      |
| ButtonIcon       | Atom     | [ButtonIcon](./button-icon)             |
| FeatherIcon      | Atom     | [Icon](./icon)                          |
| IconContainer    | Atom     | [IconContainer](./icon-container)       |
| TextField        | Atom     | [TextField](./text-field)               |
| TextArea         | Atom     | [TextArea](./text-area)                 |
| Tag              | Atom     | [Tag](./tag)                            |
| Badge            | Atom     | [Badge](./badge)                        |
| BadgeCount       | Atom     | [BadgeCount](./badge-count)             |
| BadgeDot         | Atom     | [BadgeDot](./badge-dot)                 |
| Breadcrumbs      | Atom     | [Breadcrumbs](./breadcrumbs)            |
| Checkbox         | Atom     | [Checkbox](./checkbox)                  |
| Radio            | Atom     | [Radio](./radio)                        |
| Toggle           | Atom     | [Toggle](./toggle)                      |
| Divider          | Atom     | [Divider](./divider)                    |
| Alert            | Atom     | [Alert](./alert)                        |
| Alert global     | Atom     | [Alert global](./alert-global)          |
| Select           | Atom     | [Select](./select)                      |
| Accordion        | Molecule | [Accordion](./accordion)                |
| Autocomplete     | Molecule | [Autocomplete](./autocomplete)          |
| Avatar           | Atom     | [Avatar](./avatar)                      |
| AvatarStack      | Molecule | [AvatarStack](./avatar-stack)           |
| AvatarLabelled   | Molecule | [AvatarLabelled](./avatar-labelled)     |
| AvatarDropdown   | Molecule | [AvatarDropdown](./avatar-dropdown)     |
| ImagePlaceholder | Atom     | [ImagePlaceholder](./image-placeholder) |
| Code             | Atom     | [Code](./code)                          |
| ItemCard         | Molecule | [ItemCard](./card)                      |
| ButtonGroup      | Molecule | [ButtonGroup](./button-group)           |
| CheckboxGroup    | Molecule | [CheckboxGroup](./checkbox-group)       |
| RadioGroup       | Molecule | [RadioGroup](./radio-group)             |
| Shared utilities | Lib      | [Shared utilities](./cn-helper)         |

## Related

- [Adding components](../development/adding-components)
- [Storybook workflow](../development/storybook)
