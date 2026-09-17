---
sidebar_position: 6
---

# Testing

Tests live in `@repo/ui` (`packages/ui`) and cover shared component behavior and utilities.

## Run tests

From the repository root:

```bash
pnpm test
```

Watch mode (UI package only):

```bash
pnpm --filter @repo/ui test:watch
```

## Stack

- [Vitest](https://vitest.dev/) — test runner
- [Testing Library](https://testing-library.com/react) — component rendering and queries
- [user-event](https://testing-library.com/docs/user-event/intro) — keyboard and pointer interactions

Configuration:

- `packages/ui/vitest.config.ts`
- `packages/ui/vitest.setup.ts`

## What is covered

| Area          | File                                                           |
| ------------- | -------------------------------------------------------------- |
| `cn` helper   | `packages/ui/src/lib/cn.test.ts`                               |
| `TextField`   | `packages/ui/src/atoms/text-field/text-field.test.tsx`         |
| `ButtonGroup` | `packages/ui/src/molecules/button-group/button-group.test.tsx` |

Current tests focus on accessibility wiring, controlled/uncontrolled state, and keyboard interaction. Add co-located `*.test.tsx` files when introducing new components with non-trivial behavior.

## Before opening a PR

```bash
pnpm lint
pnpm check-types
pnpm test
pnpm build
```

CI runs the same checks on push and pull requests.

## Related

- [Scripts reference](./scripts)
- [Adding components](./adding-components)
- [Linting and types](./linting-and-types)
