---
sidebar_position: 6
---

# ESLint Config

Shared ESLint flat configs live in `@repo/eslint-config` (`packages/eslint-config`).

## Exports

| Export                               | Used by                 | Purpose                           |
| ------------------------------------ | ----------------------- | --------------------------------- |
| `@repo/eslint-config/base`           | Base config             | Core ESLint + TypeScript rules    |
| `@repo/eslint-config/next-js`        | `apps/web`              | Next.js-specific lint rules       |
| `@repo/eslint-config/react-internal` | `@repo/ui`, `apps/docs` | React library / internal packages |

## Usage

Each app/package has an `eslint.config.js` (or `.mjs`) that imports the appropriate preset:

**Web app** — `apps/web/eslint.config.js`:

```js
import { nextJsConfig } from "@repo/eslint-config/next-js";
export default nextJsConfig;
```

**UI package** — `packages/ui/eslint.config.mjs`:

```js
import { config } from "@repo/eslint-config/react-internal";
export default config;
```

**Docs app** — `apps/docs/eslint.config.js`:

```js
import { config as reactInternalConfig } from "@repo/eslint-config/react-internal";

export default [
  ...reactInternalConfig,
  { ignores: [".docusaurus/**", "build/**"] },
];
```

## Running lint

```bash
pnpm lint                        # all packages
pnpm --filter web lint           # single package
```

All configs enforce `--max-warnings 0` in package scripts.

## Related

- [Linting and types](./linting-and-types)
