---
sidebar_position: 2
---

# Apps and Packages

## Apps

### `apps/web`

The main **Next.js 16** application using the App Router. It consumes shared UI from `@repo/ui` and shared styles via `@repo/ui/styles.css`.

- **Dev port:** 3000
- **Stack:** Next.js, React 19, Tailwind CSS v4
- **Guide:** [Web app](../apps/web)

### `apps/docs`

The **Docusaurus 3** documentation site (this site).

- **Dev port:** 3001
- **Content:** Markdown files under `apps/docs/docs/`
- **Guide:** [Docs site](../apps/docs-site)

## Packages

### `@repo/ui`

Shared React component library with Storybook.

```
packages/ui/src/
├── atoms/       # Single-purpose building blocks
├── molecules/   # Composed components
├── lib/         # Shared utilities (cn, types, hooks, field helpers)
└── styles.css   # Tailwind entry + design tokens
```

**Storybook** runs from this package on port 6006. See [Design system overview](../design-system/overview).

### `@repo/eslint-config`

Shared ESLint flat configs exported as:

- `@repo/eslint-config/base`
- `@repo/eslint-config/next-js`
- `@repo/eslint-config/react-internal`

See [ESLint config](../development/eslint-config).

### `@repo/typescript-config`

Shared `tsconfig.json` bases:

- `base.json`
- `nextjs.json`
- `react-library.json`

See [TypeScript config](../development/typescript-config).

## Workspace dependencies

Internal packages are linked with the `workspace:*` protocol in `package.json`:

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

pnpm resolves these to local packages — no publishing required during development.

## Import conventions

`@repo/ui` uses explicit export paths in `packages/ui/package.json`:

| Import                                 | Description                                    |
| -------------------------------------- | ---------------------------------------------- |
| `@repo/ui/atoms/button`                | Button component                               |
| `@repo/ui/atoms/button-icon`           | ButtonIcon icon-only actions                   |
| `@repo/ui/atoms/icon`                  | FeatherIcon component                          |
| `@repo/ui/atoms/icon-container`        | IconContainer emphasis treatment               |
| `@repo/ui/atoms/code`                  | Inline Code component                          |
| `@repo/ui/atoms/image-placeholder`     | ImagePlaceholder component                     |
| `@repo/ui/atoms/text-field`            | TextField component                            |
| `@repo/ui/atoms/text-area`             | TextArea multiline component                   |
| `@repo/ui/atoms/avatar`                | Avatar component                               |
| `@repo/ui/atoms/tag`                   | Tag filter chip                                |
| `@repo/ui/atoms/badge`                 | Badge status pill                              |
| `@repo/ui/atoms/badge-count`           | BadgeCount notification number                 |
| `@repo/ui/atoms/badge-dot`             | BadgeDot presence or notification              |
| `@repo/ui/atoms/breadcrumbs`           | Breadcrumbs navigation trail                   |
| `@repo/ui/atoms/checkbox`              | Checkbox control                               |
| `@repo/ui/atoms/radio`                 | Radio single-choice control                    |
| `@repo/ui/atoms/toggle`                | Toggle immediate on/off switch                 |
| `@repo/ui/atoms/divider`               | Divider weak/strong separator                  |
| `@repo/ui/atoms/alert`                 | Alert in-content status message                |
| `@repo/ui/atoms/alert-global`          | Alert global page banner                       |
| `@repo/ui/molecules/card`              | Practical UI Card content container            |
| `@repo/ui/molecules/accordion`         | Accordion stacked expandable headings          |
| `@repo/ui/molecules/autocomplete`      | Searchable single or multiple option picker    |
| `@repo/ui/molecules/combobox`          | Select-like field that filters as you type     |
| `@repo/ui/molecules/button-group`      | ButtonGroup primary/secondary/tertiary cluster |
| `@repo/ui/molecules/checkbox-group`    | Labelled Checkbox collection                   |
| `@repo/ui/molecules/radio-group`       | Labelled Radio collection                      |
| `@repo/ui/molecules/avatar-stack`      | AvatarStack overlapping avatars                |
| `@repo/ui/molecules/avatar-labelled`   | AvatarLabelled name + description              |
| `@repo/ui/molecules/avatar-dropdown`   | AvatarDropdown user-menu trigger               |
| `@repo/ui/styles.css`                  | Shared Tailwind stylesheet                     |
| `@repo/ui/lib/cn`                      | Class name merge helper                        |
| `@repo/ui/lib/button-types`            | Shared Button / ButtonGroup types              |
| `@repo/ui/lib/format-dot-list`         | Dot-separated list formatter                   |
| `@repo/ui/lib/use-controllable-string` | Controlled string hook                         |
| `@repo/ui/lib/use-field-ids`           | Field ID and ARIA hook                         |
| `@repo/ui/lib/text-field-styles`       | TextField class builders                       |

Example:

```tsx
import { Button } from "@repo/ui/atoms/button";
import { TextField } from "@repo/ui/atoms/text-field";
import { TextArea } from "@repo/ui/atoms/text-area";
import { FeatherIcon } from "@repo/ui/atoms/icon";
import { IconContainer } from "@repo/ui/atoms/icon-container";
import { cn } from "@repo/ui/lib/cn";
import "@repo/ui/styles.css";
```

When adding a new component, register its export path in `packages/ui/package.json`. See [Adding components](../development/adding-components).
