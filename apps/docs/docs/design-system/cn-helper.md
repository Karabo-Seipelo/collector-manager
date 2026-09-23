---
sidebar_position: 9
---

# Shared utilities

Reusable helpers in `packages/ui/src/lib/`. TypeScript modules (`.ts`) are importable via `@repo/ui/lib/*`. Shared field atoms (`FieldHeader`, `FieldError`) live under `packages/ui/src/atoms/` and are exported as `@repo/ui/atoms/field-header` and `@repo/ui/atoms/field-error`.

## cn

Merge Tailwind class names without conflicting utilities.

**Import:** `@repo/ui/lib/cn`

```tsx
import { cn } from "@repo/ui/lib/cn";

<div className={cn("px-4 py-2", isActive && "bg-primary", className)} />;
```

`cn` combines [clsx](https://github.com/lukeed/clsx) with [tailwind-merge](https://github.com/dcastil/tailwind-merge) so caller overrides win (e.g. `className="p-6"` replaces a default `p-4`).

Use `cn` in any component that accepts a `className` prop. Button, Card, ButtonGroup, and TextField all use it instead of ad-hoc class join helpers.

## button-types

Shared TypeScript types for [Button](./button), [ButtonIcon](./button-icon), and [ButtonGroup](./button-group).

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
| `ButtonSize` | `"small"` \| `"medium"` \| `"large"`                      |

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

Pass a custom separator as the second argument if needed.

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

## Field atoms and styles

Form controls reuse shared atoms and style helpers:

| Module / export | Role |
| --------------- | ---- |
| `@repo/ui/atoms/field-header` | Label, required/optional markers, hint text |
| `@repo/ui/atoms/field-error` | Error message with `FeatherIcon` |
| `@repo/ui/lib/text-field-styles` | Class builders for TextField box, control, and clear button |

When adding a new form control, reuse these rather than duplicating label/error markup.

## Related

- [TextField](./text-field)
- [Design system overview](./overview)
- [Tailwind setup](../development/tailwind)
