---
sidebar_position: 7.5
---

# Empty state

Placeholder content for empty pages, lists, or search results. Supports an optional leading icon and a button group for primary actions.

**Import:** `@repo/ui/molecules/empty-state`

**Storybook:** Molecules/EmptyState

## Usage

```tsx
import { Button } from "@repo/ui/atoms/button";
import { FeatherIcon } from "@repo/ui/atoms/icon";
import { ButtonGroup } from "@repo/ui/molecules/button-group";
import { EmptyState } from "@repo/ui/molecules/empty-state";

<EmptyState
  title="No items yet"
  description="Create your first item to get started."
  icon={<FeatherIcon name="inbox" size={24} />}
  actions={
    <ButtonGroup aria-label="Empty state actions">
      <Button>Create item</Button>
      <Button>Learn more</Button>
      <Button>Import</Button>
    </ButtonGroup>
  }
/>
```

Omit `icon` for the basic variant (heading, description, and actions only).

## Props

| Prop           | Type                         | Default | Description                              |
| -------------- | ---------------------------- | ------- | ---------------------------------------- |
| `title`        | `string`                     | —       | Main heading (required)                  |
| `description`  | `ReactNode`                  | —       | Supporting body copy                     |
| `headingLevel` | `2` \| `3` \| `4` \| `5` \| `6` | `2`  | Semantic heading level                   |
| `icon`         | `ReactNode`                  | —       | Icon shown in a neutral IconContainer    |
| `actions`      | `ReactNode`                  | —       | Typically a `ButtonGroup` of actions     |

## Layout

- Max content width: 536px
- Vertical spacing: 24px between icon, text, and actions; 8px between heading and description
- Heading uses heading-3 typography with 48px right padding per spec

## Accessibility

- Renders a `section` landmark
- `title` is exposed as a semantic heading (`h2` by default)
- Pass `aria-label` on `ButtonGroup` when actions are present
