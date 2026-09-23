---
sidebar_position: 6
---

# Testing

Tests live in `@repo/ui` (`packages/ui`) using a **two-layer** strategy:

| Layer                 | Command               | Environment                      | Purpose                                               |
| --------------------- | --------------------- | -------------------------------- | ----------------------------------------------------- |
| **Unit**              | `pnpm test:unit`      | jsdom (Vitest)                   | Behavior, a11y wiring, hooks, pure utilities          |
| **Storybook browser** | `pnpm test:storybook` | Chromium (Playwright via Vitest) | Story smoke tests + `play` interactions with real CSS |

Run both from the repository root:

```bash
pnpm test
```

Or individually:

```bash
pnpm test:unit
pnpm test:storybook
```

Watch mode (UI package only):

```bash
pnpm --filter @repo/ui test:watch
```

## Local setup

Storybook browser tests require Playwright Chromium (one-time install):

```bash
pnpm --filter @repo/ui exec playwright install chromium
```

## Stack

- [Vitest](https://vitest.dev/) — test runner (unit + storybook projects)
- [@storybook/addon-vitest](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon) — transforms stories into browser tests
- [Playwright](https://playwright.dev/) — real Chromium via `@vitest/browser-playwright`
- [Testing Library](https://testing-library.com/react) — unit test rendering and queries
- [user-event](https://testing-library.com/docs/user-event/intro) — keyboard and pointer interactions

Configuration:

- `packages/ui/vitest.config.ts` — `unit` and `storybook` Vitest projects
- `packages/ui/vitest.setup.ts` — unit test setup
- `packages/ui/.storybook/vitest.setup.ts` — imports design tokens for browser tests

## Unit test coverage

| Area                    | File                                                                 |
| ----------------------- | -------------------------------------------------------------------- |
| `cn`                    | `packages/ui/src/lib/cn.test.ts`                                     |
| `formatDotList`         | `packages/ui/src/lib/format-dot-list.test.ts`                        |
| `useFieldIds`           | `packages/ui/src/lib/use-field-ids.test.ts`                          |
| `useControllableString` | `packages/ui/src/lib/use-controllable-string.test.ts`                |
| `FieldHeader`           | `packages/ui/src/lib/field-header.test.tsx`                          |
| `FieldError`            | `packages/ui/src/lib/field-error.test.tsx`                           |
| `Button`                | `packages/ui/src/atoms/button/button.test.tsx`                       |
| `ButtonIcon`            | `packages/ui/src/atoms/button-icon/button-icon.test.tsx`             |
| `Badge`                 | `packages/ui/src/atoms/badge/badge.test.tsx`                         |
| `BadgeCount`            | `packages/ui/src/atoms/badge-count/badge-count.test.tsx`             |
| `BadgeDot`              | `packages/ui/src/atoms/badge-dot/badge-dot.test.tsx`                 |
| `Breadcrumbs`           | `packages/ui/src/atoms/breadcrumbs/breadcrumbs.test.tsx`             |
| `Checkbox`              | `packages/ui/src/atoms/checkbox/checkbox.test.tsx`                   |
| `Radio`                 | `packages/ui/src/atoms/radio/radio.test.tsx`                         |
| `FeatherIcon`           | `packages/ui/src/atoms/icon/icon.test.tsx`                           |
| `Code`                  | `packages/ui/src/atoms/code/code.test.tsx`                           |
| `ImagePlaceholder`      | `packages/ui/src/atoms/image-placeholder/image-placeholder.test.tsx` |
| `TextField`             | `packages/ui/src/atoms/text-field/text-field.test.tsx`               |
| `ButtonGroup`           | `packages/ui/src/molecules/button-group/button-group.test.tsx`       |
| `CheckboxGroup`         | `packages/ui/src/molecules/checkbox-group/checkbox-group.test.tsx`   |
| `RadioGroup`            | `packages/ui/src/molecules/radio-group/radio-group.test.tsx`         |
| `ItemCard`              | `packages/ui/src/molecules/card/card.test.tsx`                       |

Add co-located `*.test.tsx` files when introducing components with non-trivial behavior.

## Storybook browser tests

Every story (except those tagged `!test`) is automatically converted into a browser smoke test. Stories with `play` functions run interaction checks in Chromium.

Interactive stories with `play` functions:

- `TextField` — `Clearable`, `WithError`
- `Button` — `Default`, `IconOnly`
- `ButtonIcon` — `Default`
- `Badge` — `Default`
- `BadgeCount` — `Default`
- `BadgeDot` — `Default`
- `Breadcrumbs` — `Default`, `Collapsed`, `InteractiveCollapse`
- `Checkbox` — `Default`
- `CheckboxGroup` — `Default`
- `Radio` — `Default`
- `RadioGroup` — `Default`
- `ButtonGroup` — `Default`
- `ItemCard` — `Clickable`

Exclude stories from automated browser tests with:

```tsx
export const VisualStates: Story = {
  tags: ["!test"],
  // ...
};
```

Use `!test` for design-review layouts or stories that load external network assets.

## CI

GitHub Actions runs three parallel jobs on push and pull requests:

| Job              | Command                                         |
| ---------------- | ----------------------------------------------- |
| `ci`             | lint, check-types, build                        |
| `test-unit`      | `pnpm test:unit`                                |
| `test-storybook` | `pnpm test:storybook` (Playwright Docker image) |

## Before opening a PR

```bash
pnpm lint
pnpm check-types
pnpm test
pnpm build
```

## Related

- [Scripts reference](./scripts)
- [Storybook](./storybook)
- [Adding components](./adding-components)
- [Linting and types](./linting-and-types)
