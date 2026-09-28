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
| `packages/ui/.storybook/preview.ts`     | Global styles, MSW loader, default API handlers |
| `packages/ui/.storybook/decorators.tsx` | Shared story decorators                         |
| `packages/ui/public/mockServiceWorker.js` | MSW service worker (regenerate with `pnpm msw:init` in `@repo/ui`) |

Stories are co-located with components:

```
packages/ui/src/atoms/button/
├── button.tsx
└── button.stories.tsx
```

Stories are grouped under `Atoms/`, `Molecules/`, `Organisms/`, and `Templates/` titles (e.g. `Atoms/Button`, `Molecules/Card`, `Templates/Collection`).

## Accessibility

The [@storybook/addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y) addon is enabled. In the Storybook UI, open the **Accessibility** panel on any story to see automated checks (axe) and highlight issues in the preview.

Per-story options via `parameters.a11y` (for example `test: "todo"` while fixing violations). See the [addon documentation](https://storybook.js.org/addons/@storybook/addon-a11y) for details.

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

## Mock API (MSW)

Collection **Pages/** stories load data with `fetch` against `/api/collection/*`. In Storybook, [Mock Service Worker](https://mswjs.io/) intercepts those requests via the [msw-storybook-addon](https://storybook.js.org/addons/msw-storybook-addon).

- **Handlers:** [`packages/ui/src/mocks/handlers/collection.ts`](../../../packages/ui/src/mocks/handlers/collection.ts) (fixture data in [`packages/ui/src/api/collection/fixtures/`](../../../packages/ui/src/api/collection/fixtures/))
- **Global wiring:** [`packages/ui/.storybook/preview.ts`](../../../packages/ui/.storybook/preview.ts) registers `mswLoader()` and applies collection handlers in `beforeEach`
- **Per-story overrides:** set `parameters.msw.handlers` (see **Pages/CollectionSearchFilter → SearchLoadError**)

Regenerate the worker after upgrading MSW:

```bash
pnpm --filter @repo/ui msw:init
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
