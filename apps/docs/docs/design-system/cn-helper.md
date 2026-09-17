---
sidebar_position: 9
---

# Shared utilities

Reusable helpers in `packages/ui/src/lib/`. TypeScript modules (`.ts`) are importable via `@repo/ui/lib/*`. React building blocks in `.tsx` files are internal — used by components such as TextField, not listed in package exports.

## cn

Merge Tailwind class names without conflicting utilities.

**Import:** `@repo/ui/lib/cn`

```tsx
import { cn } from "@repo/ui/lib/cn";

<div className={cn("px-4 py-2", isActive && "bg-primary", className)} />;
```

`cn` combines [clsx](https://github.com/lukeed/clsx) with [tailwind-merge](https://github.com/dcastil/tailwind-merge) so caller overrides win (e.g. `className="p-6"` replaces a default `p-4`).

Use `cn` in any component that accepts a `className` prop. Button, ItemCard, ButtonGroup, and TextField all use it instead of ad-hoc class join helpers.

## button-types

Shared TypeScript types for [Button](./button) and [ButtonGroup](./button-group).

**Import:** `@repo/ui/lib/button-types`

```ts
import type {
  ButtonType,
  ButtonTone,
  ButtonSize,
} from "@repo/ui/lib/button-types";
```

| Type         | Values                                                     |
| ------------ | ---------------------------------------------------------- |
| `ButtonType` | `"primary"` \| `"secondary"` \| `"tertiary"`               |
| `ButtonTone` | `"brand"` \| `"neutral"` \| `"destructive"` \| `"inverse"` |
| `ButtonSize` | `"xsmall"` \| `"small"` \| `"medium"` \| `"large"`         |

[Button](./button) re-exports these types for convenience.

## formatDotList

Format comma-separated strings or string arrays into a dot-separated label.

**Import:** `@repo/ui/lib/format-dot-list`

```ts
import { formatDotList } from "@repo/ui/lib/format-dot-list";

formatDotList(["Vinyl", "1959", "NM"]); // "Vinyl · 1959 · NM"
formatDotList("Vinyl, 1959, NM"); // "Vinyl · 1959 · NM"
formatDotList(undefined); // null
```

Used by [ItemCard](./card) for the `meta` prop. Pass a custom separator as the second argument if needed.

## useControllableString

Hook for controlled/uncontrolled string state — the same pattern TextField uses for `value` / `defaultValue`.

**Import:** `@repo/ui/lib/use-controllable-string`

```tsx
"use client";

import { useControllableString } from "@repo/ui/lib/use-controllable-string";

const { isControlled, currentValue, setCurrentValue } = useControllableString(
  value,
  defaultValue,
);
```

| Return            | Description                                   |
| ----------------- | --------------------------------------------- |
| `isControlled`    | `true` when `value` is passed                 |
| `currentValue`    | Active string value                           |
| `setCurrentValue` | Updates internal state only when uncontrolled |

## useFieldIds

Generates stable field IDs and `aria-describedby` wiring for labelled inputs.

**Import:** `@repo/ui/lib/use-field-ids`

```tsx
"use client";

import { useFieldIds } from "@repo/ui/lib/use-field-ids";

const { fieldId, hintId, errorId, describedBy } = useFieldIds(id, {
  hint,
  error,
});
```

## Internal field modules

These live in `lib/` but are not package exports. They keep form-field markup consistent inside `@repo/ui`:

| Module                 | Role                                                        |
| ---------------------- | ----------------------------------------------------------- |
| `field-header.tsx`     | Label, required/optional markers, hint text                 |
| `field-error.tsx`      | Error message with `FeatherIcon`                            |
| `text-field-styles.ts` | Class builders for TextField box, control, and clear button |

When adding a new form control, reuse these modules rather than duplicating label/error markup.

## Related

- [TextField](./text-field)
- [Design system overview](./overview)
- [Tailwind setup](../development/tailwind)
