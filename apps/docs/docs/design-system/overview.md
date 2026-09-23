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
│   ├── field-header/
│   ├── field-error/
│   ├── icon/
│   ├── text-field/
│   └── …
├── molecules/       # One UX pattern composed from atoms
│   ├── button-group/
│   ├── breadcrumbs/
│   ├── search-input/
│   ├── stepper/
│   ├── avatar-labelled/
│   └── …
├── organisms/       # Multi-part sections or systems
│   ├── table/
│   ├── footer/
│   ├── date-picker/
│   ├── drawer/
│   ├── dropdown-menu/
│   └── …
├── lib/             # Shared utilities (hooks, formatters, styles)
│   ├── cn.ts
│   ├── use-field-ids.ts
│   └── text-field-styles.ts
└── styles.css       # Tailwind + design tokens
```

## Atoms vs molecules vs organisms

| Layer | When to use | May import | Examples |
| ----- | ----------- | ---------- | -------- |
| **Atom** | One visual or interaction primitive | `lib` only | Button, FeatherIcon, FieldHeader, FieldError, Avatar |
| **Molecule** | One UX pattern from atoms | atoms + `lib` | ButtonGroup, SearchInput, Stepper, Tabs, Rating, AvatarLabelled |
| **Organism** | Section-scale UI or multi-pattern system | atoms + molecules + `lib` | Table, Footer, DatePicker, Drawer, DropdownMenu, Testimonial |

**Dependency rules** (enforced by ESLint in `@repo/ui`):

- Atoms must not import molecules or organisms.
- Molecules must not import other molecules or organisms.
- Organisms may compose atoms and molecules.

Storybook stories and tests are exempt so demos can compose freely.

Add new **atoms** for standalone primitives. Add **molecules** when a component orchestrates multiple atoms into one pattern. Add **organisms** for page sections, overlays, or systems that combine multiple molecules.

## Storybook

Storybook is the **interactive catalog** for visual variants. Run it at http://localhost:6006:

```bash
pnpm storybook
```

Each component has a co-located `*.stories.tsx` file under `Atoms/`, `Molecules/`, or `Organisms/` in Storybook. Shared layout decorators (e.g. fixed-width wrappers) live in `.storybook/decorators.tsx`. Use Storybook to preview states; use these docs for API reference, import paths, and accessibility notes.

## Styling

All components use **Tailwind CSS v4**. Shared tokens and the Tailwind entry point are in `@repo/ui/styles.css`. Apps import this stylesheet and scan their own source for utility classes.

See [Design tokens](./tokens) and [Tailwind setup](../development/tailwind).

## Import pattern

Components are imported via explicit package exports:

```tsx
import { Button } from "@repo/ui/atoms/button";
import { FieldHeader } from "@repo/ui/atoms/field-header";
import { Breadcrumbs } from "@repo/ui/molecules/breadcrumbs";
import { SearchInput } from "@repo/ui/molecules/search-input";
import { Stepper } from "@repo/ui/molecules/stepper";
import { Tabs } from "@repo/ui/molecules/tabs";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { Table } from "@repo/ui/organisms/table";
import { Footer } from "@repo/ui/organisms/footer";
import { DatePicker } from "@repo/ui/organisms/date-picker";
import { Testimonial } from "@repo/ui/organisms/testimonial";
import { cn } from "@repo/ui/lib/cn";
```

## Components

| Component        | Type      | Docs                                    |
| ---------------- | --------- | --------------------------------------- |
| Button           | Atom      | [Button](./button)                      |
| ButtonIcon       | Atom      | [ButtonIcon](./button-icon)             |
| FeatherIcon      | Atom      | [Icon](./icon)                          |
| IconContainer    | Atom      | [IconContainer](./icon-container)       |
| FieldHeader      | Atom      | [TextField](./text-field)               |
| FieldError       | Atom      | [TextField](./text-field)               |
| Input            | Atom      | [TextField](./text-field)               |
| Textarea         | Atom      | [TextArea](./text-area)                 |
| TextLink         | Atom      | [Text link](./text-link)                |
| Tag              | Atom      | [Tag](./tag)                            |
| Badge            | Atom      | [Badge](./badge)                        |
| BadgeCount       | Atom      | [BadgeCount](./badge-count)             |
| BadgeDot         | Atom      | [BadgeDot](./badge-dot)                 |
| Checkbox         | Atom      | [Checkbox](./checkbox)                  |
| Radio            | Atom      | [Radio](./radio)                        |
| Toggle           | Atom      | [Toggle](./toggle)                      |
| Slider           | Atom      | [Slider](./slider)                      |
| Divider          | Atom      | [Divider](./divider)                    |
| Alert            | Atom      | [Alert](./alert)                        |
| Avatar           | Atom      | [Avatar](./avatar)                      |
| ImagePlaceholder | Atom      | [ImagePlaceholder](./image-placeholder) |
| Slot             | Atom      | [Slot](./slot)                          |
| Code             | Atom      | [Code](./code)                          |
| TextField        | Molecule  | [TextField](./text-field)               |
| TextArea         | Molecule  | [TextArea](./text-area)                 |
| Select           | Molecule  | [Select](./select)                      |
| Alert global     | Molecule  | [Alert global](./alert-global)          |
| Breadcrumbs      | Molecule  | [Breadcrumbs](./breadcrumbs)            |
| SearchInput      | Molecule  | [Search input](./search-input)          |
| Stepper          | Molecule  | [Stepper](./stepper)                    |
| Accordion        | Molecule  | [Accordion](./accordion)                |
| Autocomplete     | Molecule  | [Autocomplete](./autocomplete)          |
| Combobox         | Molecule  | [Combobox](./combobox)                  |
| Empty state      | Molecule  | [Empty state](./empty-state)          |
| Rating           | Molecule  | [Rating](./rating)                    |
| Segmented control | Molecule | [Segmented control](./segmented-control) |
| Summary list      | Molecule | [Summary list](./summary-list)          |
| Tabs              | Molecule | [Tabs](./tabs)                          |
| Tooltip           | Molecule | [Tooltip](./tooltip)                    |
| AvatarStack      | Molecule  | [AvatarStack](./avatar-stack)           |
| AvatarLabelled   | Molecule  | [AvatarLabelled](./avatar-labelled)     |
| Card             | Molecule  | [Card](./card)                          |
| ButtonGroup      | Molecule  | [ButtonGroup](./button-group)           |
| CheckboxGroup    | Molecule  | [CheckboxGroup](./checkbox-group)       |
| RadioGroup       | Molecule  | [RadioGroup](./radio-group)             |
| Date picker      | Organism  | [Date picker](./date-picker)            |
| Drawer           | Organism  | [Drawer](./drawer)                    |
| Dropdown menu    | Organism  | [Dropdown menu](./dropdown-menu)      |
| Footer           | Organism  | [Footer](./footer)                    |
| File upload      | Organism  | [File upload](./file-upload)          |
| Table             | Organism  | [Table](./table)                        |
| Testimonial       | Organism  | [Testimonial](./testimonial)            |
| AvatarDropdown   | Organism  | [AvatarDropdown](./avatar-dropdown)     |
| Shared utilities | Lib       | [Shared utilities](./cn-helper)         |

## Related

- [Adding components](../development/adding-components)
- [Storybook workflow](../development/storybook)
