---
sidebar_position: 5
---

# Code

Inline code styling for UI text and documentation-style snippets.

**Import:** `@repo/ui/atoms/code`

**Storybook:** UI/Code

## Usage

```tsx
import { Code } from "@repo/ui/atoms/code";

<p>
  Edit <Code>apps/web/app/page.tsx</Code> to get started.
</p>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | required | Code content |
| `className` | `string` | — | Additional CSS classes |

## Styling

Renders a `<code>` element with monospace font, rounded background, and light/dark mode support via Tailwind utilities.

Use for **short inline snippets** in UI copy. For multi-line code blocks in documentation, use Docusaurus fenced code blocks instead.

## Related

- [Design system overview](./overview)
