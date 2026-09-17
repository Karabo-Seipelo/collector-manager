---
sidebar_position: 8
---

# ButtonGroup

A compound component for single-select button groups with radio-group semantics and keyboard navigation.

**Import:** `@repo/ui/molecules/button-group`

**Storybook:** Molecules/ButtonGroup

## Usage

```tsx
import { ButtonGroup } from "@repo/ui/molecules/button-group";

function ViewToggle() {
  const [view, setView] = React.useState("grid");

  return (
    <ButtonGroup value={view} onChange={setView} aria-label="View mode">
      <ButtonGroup.Item value="grid">Grid</ButtonGroup.Item>
      <ButtonGroup.Item value="list">List</ButtonGroup.Item>
    </ButtonGroup>
  );
}
```

With icons:

```tsx
import { FeatherIcon } from "@repo/ui/atoms/icon";

<ButtonGroup defaultValue="grid" aria-label="View mode">
  <ButtonGroup.Item
    value="grid"
    iconOnly={<FeatherIcon name="grid" />}
    aria-label="Grid view"
  />
  <ButtonGroup.Item
    value="list"
    iconOnly={<FeatherIcon name="list" />}
    aria-label="List view"
  />
</ButtonGroup>;
```

## ButtonGroup props

| Prop              | Type                      | Default    | Description                                               |
| ----------------- | ------------------------- | ---------- | --------------------------------------------------------- |
| `value`           | `string`                  | —          | Controlled selected value                                 |
| `defaultValue`    | `string`                  | —          | Initial value (uncontrolled)                              |
| `onChange`        | `(value: string) => void` | —          | Called when selection changes                             |
| `size`            | `ButtonSize`              | `"medium"` | Passed to all items — see [Shared utilities](./cn-helper) |
| `tone`            | `ButtonTone`              | `"brand"`  | Passed to all items — see [Shared utilities](./cn-helper) |
| `disabled`        | `boolean`                 | `false`    | Disables the entire group                                 |
| `aria-label`      | `string`                  | —          | Accessible name for the group                             |
| `aria-labelledby` | `string`                  | —          | ID of labelling element                                   |
| `className`       | `string`                  | —          | Wrapper class                                             |

## ButtonGroup.Item props

| Prop        | Type        | Default  | Description            |
| ----------- | ----------- | -------- | ---------------------- |
| `value`     | `string`    | required | Unique item identifier |
| `disabled`  | `boolean`   | `false`  | Disable this item      |
| `iconLeft`  | `ReactNode` | —        | Icon before label      |
| `iconRight` | `ReactNode` | —        | Icon after label       |
| `iconOnly`  | `ReactNode` | —        | Icon-only item         |
| `children`  | `ReactNode` | —        | Item label             |

Also accepts standard button HTML attributes except `value`.

## Selection behavior

- Selected item renders as `variant="primary"`; others as `variant="secondary"`
- Container uses `role="radiogroup"`; items use `role="radio"` and `aria-checked`
- Only the selected item is in the tab order (`tabIndex={0}`)

## Keyboard navigation

When focused inside the group:

| Key                        | Action                       |
| -------------------------- | ---------------------------- |
| `ArrowRight` / `ArrowDown` | Select next enabled item     |
| `ArrowLeft` / `ArrowUp`    | Select previous enabled item |

## Accessibility

Always provide `aria-label` or `aria-labelledby` on `ButtonGroup`. For icon-only items, add `aria-label` on each `ButtonGroup.Item`.

## Related

- [Button](./button)
- [Shared utilities](./cn-helper)
