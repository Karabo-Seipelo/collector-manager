---
sidebar_position: 20
---

# Progress indicator

Multi-step progress with a segmented bar and optional back navigation — matching Practical UI Progress indicator.

**Import:** `@repo/ui/molecules/progress-indicator`

**Storybook:** Molecules/ProgressIndicator

## Usage

```tsx
import { ProgressIndicator } from "@repo/ui/molecules/progress-indicator";

<ProgressIndicator
  currentStep={2}
  totalSteps={5}
  onBack={() => setStep((step) => step - 1)}
/>
```

## Props

| Prop           | Type         | Default | Description                                      |
| -------------- | ------------ | ------- | ------------------------------------------------ |
| `currentStep`  | `number`     | —       | Active step (1-based)                            |
| `totalSteps`   | `number`     | —       | Total number of steps                            |
| `onBack`       | `() => void` | —       | Back link handler                                |
| `backLabel`    | `string`     | `"Back"`| Back link label                                  |
| `showBack`     | `boolean`    | `true`  | Show the back link                               |
| `label`        | `string`     | —       | Override the default `Step X of Y` label         |
| `className`    | `string`     | —       | Classes on the root wrapper                      |

## Layout

- Label: semibold small text (`Step X of Y`)
- Segmented bar: equal-width 8px-tall segments with 4px gaps
- Completed steps: solid primary fill
- Remaining steps: weak fill, weak border, sunken shadow
- Back link: brand bold text link with left arrow, 16px below the bar

## Accessibility

- Progress bar uses `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`
- Label is linked via `aria-labelledby`
- Back link is disabled on step 1 via `aria-disabled`

## Related

- [Loading bar](./loading-bar)
- [Text link](./text-link)
- [Stepper](./stepper)
