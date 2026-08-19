---
sidebar_position: 8
---

# cn Helper

Utility for merging Tailwind class names without conflicting utilities.

**Import:** `@repo/ui/lib/cn`

## Usage

```tsx
import { cn } from "@repo/ui/lib/cn";

<div className={cn("px-4 py-2", isActive && "bg-primary", className)} />
```

## How it works

`cn` combines [clsx](https://github.com/lukeed/clsx) (conditional classes) with [tailwind-merge](https://github.com/dcastil/tailwind-merge) (resolves conflicting Tailwind utilities):

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## When to use

Use `cn` in components that accept a `className` prop and need to merge caller overrides with default styles:

```tsx
className={cn("rounded-lg bg-white p-4", className)}
```

This ensures a passed `className="p-6"` overrides the default `p-4` instead of applying both.

## Related

- [Design system overview](./overview)
- [Tailwind setup](../development/tailwind)
