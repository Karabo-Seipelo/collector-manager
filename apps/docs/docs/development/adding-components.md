---
sidebar_position: 4
---

# Adding Components

Guide for adding new components to `@repo/ui`.

## 1. Choose atoms, molecules, organisms, or templates

| Layer     | Directory                       | Example |
| --------- | ------------------------------- | ------- |
| Atom      | `packages/ui/src/atoms/`        | Button, FeatherIcon, Input, Textarea, FieldHeader, FieldError, Avatar, Checkbox, LoadingBar |
| Molecule  | `packages/ui/src/molecules/`    | TextField, TextArea, Select, ButtonGroup, SearchInput, Stepper, Breadcrumbs, Tabs, Rating, Pagination, ProgressIndicator, AvatarLabelled |
| Organism  | `packages/ui/src/organisms/`    | Table, Footer, Hero, Modal, NavigationSide, NavigationHeader, DatePicker, Drawer, DropdownMenu, Testimonial, AvatarDropdown |
| Template  | `packages/ui/src/templates/`    | Collection page wireframe (Storybook only; composes organisms) |

See [Design system overview](../design-system/overview) for layer rules and dependency constraints.

## 2. Create the component

Add a folder with the component file:

```
packages/ui/src/molecules/my-component/
└── my-component.tsx
```

Use Tailwind for styling and [`cn`](../design-system/cn-helper) for class merging when accepting `className`. Reuse existing helpers from `packages/ui/src/lib/` (types, hooks, formatters) and atoms such as `FieldHeader` / `FieldError` instead of duplicating logic — see [Shared utilities](../design-system/cn-helper).

## 3. Register the export

Add an entry to `packages/ui/package.json`:

```json
{
  "exports": {
    "./molecules/my-component": "./src/molecules/my-component/my-component.tsx"
  }
}
```

Consumers import via:

```tsx
import { MyComponent } from "@repo/ui/molecules/my-component";
```

## 4. Add a Storybook story

Create a co-located story file with the matching layer prefix in the title:

```
packages/ui/src/molecules/my-component/
├── my-component.tsx
└── my-component.stories.tsx   # title: "Molecules/MyComponent"
```

Run `pnpm storybook` to preview. See [Storybook](./storybook).

## 5. Document the component

Add a page under `apps/docs/docs/design-system/` with props, usage, and accessibility notes.

Docs pages are **MDX**. In prose (outside fenced code blocks):

- Avoid raw `<768px` — MDX treats `<` as JSX; write “under 768px” instead.
- Avoid bare `{propName}` — MDX treats `{…}` as JavaScript; describe props in words or keep examples in fenced `tsx` blocks.

Run `pnpm --filter docs build` before merging doc changes.

## 6. Verify

```bash
pnpm --filter @repo/ui check-types
pnpm --filter @repo/ui lint
pnpm storybook
pnpm --filter docs build
```

## Turbo generator

The UI package includes a scaffold script:

```bash
pnpm --filter @repo/ui generate:component
```

This runs `turbo gen react-component`. Adjust the output to match the atoms/molecules/organisms folder convention and export paths above.

## Related

- [Design system overview](../design-system/overview)
- [Tailwind setup](./tailwind)
- [Storybook](./storybook)
