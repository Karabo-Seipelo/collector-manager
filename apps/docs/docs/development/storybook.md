---
sidebar_position: 2
---

# Storybook

Storybook provides an interactive catalog of `@repo/ui` components, running on port **6006**.

## Run Storybook

```bash
pnpm storybook
```

Open http://localhost:6006.

Storybook also starts when you run `pnpm dev` at the repo root.

## Build static Storybook

```bash
pnpm build-storybook
```

Output is written to `packages/ui/storybook-static/`. Deploy this folder to any static host for a hosted component catalog.

## Configuration

| File                                    | Purpose                                         |
| --------------------------------------- | ----------------------------------------------- |
| `packages/ui/.storybook/main.ts`        | Framework, stories glob, Vite + Tailwind plugin |
| `packages/ui/.storybook/preview.ts`     | Global styles import                            |
| `packages/ui/.storybook/decorators.tsx` | Shared story decorators                         |

Stories are co-located with components:

```
packages/ui/src/atoms/button/
├── button.tsx
└── button.stories.tsx
```

Stories are grouped under `Atoms/` and `Molecules/` titles (e.g. `Atoms/Button`, `Molecules/Card`).

## Shared decorators

Use `withWidth` from `.storybook/decorators.tsx` when a story needs a fixed container width:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { withWidth } from "../../../.storybook/decorators";
import { TextField } from "./text-field";

const fieldWidth = withWidth("360px");

const meta = {
  title: "Molecules/TextField",
  component: TextField,
  decorators: [fieldWidth],
} satisfies Meta<typeof TextField>;
```

TextField uses `withWidth("360px")`; compositional stories such as Card can set
their recipe width directly in the story render function.

## Writing stories

Use Component Story Format with `@storybook/react-vite`:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  args: { children: "Button label" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

## Docs vs Storybook

| Storybook                 | Docusaurus docs                |
| ------------------------- | ------------------------------ |
| Live visual previews      | Written API reference          |
| Interactive controls      | Import paths and accessibility |
| All variants side by side | Architecture and workflows     |

Link to Storybook from the docs navbar (configured in `apps/docs/docusaurus.config.ts`).

## Related

- [Design system overview](../design-system/overview)
- [Adding components](./adding-components)
