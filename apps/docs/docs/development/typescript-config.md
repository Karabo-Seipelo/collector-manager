---
sidebar_position: 7
---

# TypeScript Config

Shared TypeScript bases live in `@repo/typescript-config` (`packages/typescript-config`).

## Config files

| File | Used by | Purpose |
| --- | --- | --- |
| `base.json` | Extended by others | Core compiler options |
| `nextjs.json` | `apps/web` | Next.js app settings |
| `react-library.json` | `@repo/ui` | React component library |

## Usage

**Web app** — `apps/web/tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "strictNullChecks": true
  }
}
```

**UI package** — `packages/ui/tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "strictNullChecks": true
  },
  "include": ["src", ".storybook"]
}
```

**Docs app** extends `@docusaurus/tsconfig` directly (Docusaurus-specific requirements).

## Running type checks

```bash
pnpm check-types                 # all packages
pnpm --filter web check-types    # includes next typegen
pnpm --filter @repo/ui check-types
```

## Related

- [Linting and types](./linting-and-types)
