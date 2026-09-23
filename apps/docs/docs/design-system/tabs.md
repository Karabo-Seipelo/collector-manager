---
sidebar_position: 8.1
---

# Tabs

Tabbed navigation with text or icon labels, optional badge counts, and associated panels — matching Practical UI Tabs.

**Import:** `@repo/ui/molecules/tabs`

**Storybook:** Molecules/Tabs

## Usage

```tsx
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
} from "@repo/ui/molecules/tabs";

<Tabs defaultValue="overview">
  <TabsList aria-label="Project sections">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity" badge={8}>
      Activity
    </TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsPanel value="overview">Overview content</TabsPanel>
  <TabsPanel value="activity">Activity feed</TabsPanel>
  <TabsPanel value="settings">Settings form</TabsPanel>
</Tabs>
```

Icon tabs with wrapping:

```tsx
<Tabs defaultValue="design">
  <TabsList wrap aria-label="Design tools">
    <TabsTrigger
      value="design"
      icon={<FeatherIcon name="layers" size={20} />}
    >
      Design
    </TabsTrigger>
  </TabsList>
  <TabsPanel value="design">Design content</TabsPanel>
</Tabs>
```

## Props

### Tabs

| Prop             | Type                     | Default | Description                    |
| ---------------- | ------------------------ | ------- | ------------------------------ |
| `value`          | `string`                 | —       | Controlled selected tab value  |
| `defaultValue`   | `string`                 | `""`    | Initial selected tab value     |
| `onValueChange`  | `(value: string) => void`| —       | Selection change handler       |
| `disabled`       | `boolean`                | `false` | Disables all tab triggers      |

### TabsList

| Prop         | Type      | Default | Description                          |
| ------------ | --------- | ------- | ------------------------------------ |
| `wrap`       | `boolean` | `false` | Allow tab triggers to wrap to new rows |
| `aria-label` | `string`  | —       | Accessible name for the tab list     |

### TabsTrigger

| Prop       | Type          | Description                              |
| ---------- | ------------- | ---------------------------------------- |
| `value`    | `string`      | Unique tab identifier (required)         |
| `icon`     | `ReactNode`   | Optional 20px leading icon               |
| `badge`    | `ReactNode`   | Optional count rendered as `BadgeCount`  |
| `disabled` | `boolean`     | Disables this tab                        |

### TabsPanel

| Prop    | Type     | Description                           |
| ------- | -------- | ------------------------------------- |
| `value` | `string` | Matches the associated trigger value  |

## Layout

- Tab list: 4px weak bottom border with 48px-tall triggers
- Selected tab: 4px primary bottom border overlapping the list border, semibold primary text
- Unselected tab: regular weak text with hover/press fill states
- Optional `BadgeCount` with weak emphasis beside the label
- Panels render below the list with 24px top padding

## Accessibility

- Uses the tabs pattern: `tablist`, `tab`, and `tabpanel` roles
- Selected tab exposes `aria-selected`; panels use `aria-labelledby`
- Arrow keys, Home, and End move focus and activate tabs
- Provide `aria-label` on `TabsList` when the tab group needs a name

## Related

- [Segmented control](./segmented-control)
- [Badge count](./badge-count)
- [Icon](./icon)
