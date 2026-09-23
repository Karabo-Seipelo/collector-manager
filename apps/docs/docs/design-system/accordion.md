---
sidebar_position: 6.7
---

# Accordion

Stacked headings that toggle further information, matching Practical UI Accordion.

**Import:** `@repo/ui/molecules/accordion`

**Storybook:** Molecules/Accordion

## Usage

```tsx
import { Accordion, AccordionItem } from "@repo/ui/molecules/accordion";

<Accordion>
  <AccordionItem value="shipping" heading="Shipping">
    Ships in 2–3 days.
  </AccordionItem>
  <AccordionItem value="returns" heading="Returns">
    30-day returns.
  </AccordionItem>
</Accordion>

<Accordion type="single" defaultValue="shipping">
  <AccordionItem value="shipping" heading="Shipping">
    Ships in 2–3 days.
  </AccordionItem>
</Accordion>
```

## Props

### Accordion

| Prop            | Type                         | Default      | Description                                      |
| --------------- | ---------------------------- | ------------ | ------------------------------------------------ |
| `type`          | `"multiple"` \| `"single"`   | `"multiple"` | Allow several open panels, or only one           |
| `value`         | `string[]` or `string`       | —            | Controlled open item(s)                          |
| `defaultValue`  | `string[]` or `string`       | none open    | Uncontrolled initial open item(s)                |
| `onValueChange` | `(value) => void`            | —            | `string[]` when multiple, `string` when single   |
| `headingLevel`  | `2` \| `3` \| `4` \| `5` \| `6` | `3`       | HTML heading wrapping each trigger               |

`value` / `defaultValue` / `onValueChange` follow `type`: a string for `single`, an array for `multiple`. An empty string means all panels closed in single mode.

### AccordionItem

| Prop       | Type        | Default | Description                |
| ---------- | ----------- | ------- | -------------------------- |
| `value`    | `string`    | —       | Stable id for open state   |
| `heading`  | `ReactNode` | —       | Trigger label              |
| `disabled` | `boolean`   | `false` | Prevents expand/collapse   |
| `children` | `ReactNode` | —       | Panel content              |

## Visual states

- Closed row is 56px with a weak top stroke, semibold heading, and chevron down
- Open row shows the panel in weak text with 8px gap under the header and chevron up
- Hover: weak fill and underlined heading; press: stronger fill
- Focus: 2px focus ring around the item
- Disabled: disabled text and icon, no hover

## Accessibility

- Follows the [WAI-ARIA accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/): each header is a `button` inside a heading, with `aria-expanded` and `aria-controls`
- Enter and Space toggle natively on the button
- Tab moves through headers and any focusable content inside open panels
- When omitting visible text in `heading`, provide an accessible name on the item

## Related

- [Divider](./divider)
- [Design tokens](./tokens)
