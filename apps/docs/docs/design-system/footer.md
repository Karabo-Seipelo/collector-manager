---
sidebar_position: 7.6
---

# Footer

Site footer for navigation, brand, social links, and copyright. Supports small and large layouts with responsive stacking across desktop, tablet, and mobile.

**Import:** `@repo/ui/molecules/footer`

**Storybook:** Molecules/Footer

## Usage

### Small

```tsx
import { FeatherIcon } from "@repo/ui/atoms/icon";
import { Footer } from "@repo/ui/molecules/footer";

<Footer
  size="small"
  logo={<img src="/logo.svg" alt="Practical UI" />}
  copyright="© 2024 Practical UI"
  navLinks={[
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]}
  socialLinks={[
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: <FeatherIcon name="instagram" size={24} />,
    },
  ]}
/>
```

### Large

```tsx
<Footer
  size="large"
  logo={<img src="/logo.svg" alt="Practical UI" />}
  description="Short product description."
  copyright="© 2024 Practical UI"
  columns={[
    {
      title: "Product",
      links: [{ label: "Features", href: "/features" }],
    },
  ]}
  socialLinks={socialLinks}
/>
```

## Props

| Prop          | Type                 | Default   | Description                                      |
| ------------- | -------------------- | --------- | ------------------------------------------------ |
| `size`        | `"small"` \| `"large"` | `"small"` | Layout variant                                   |
| `logo`        | `ReactNode`          | —         | Brand mark slot                                  |
| `copyright`   | `string`             | —         | Legal line (e.g. `© 2024 Practical UI`)         |
| `socialLinks` | `FooterSocialLink[]` | —         | Icon links with accessible labels                |
| `navLinks`    | `FooterLinkItem[]`   | —         | Small footer horizontal navigation               |
| `description` | `string`             | —         | Large footer intro copy                          |
| `columns`     | `FooterColumn[]`     | —         | Large footer topic groups with titled link lists |

## Responsive behavior

| Size   | Desktop | Tablet | Mobile |
| ------ | ------- | ------ | ------ |
| Small  | Logo and social on one row; links below | Same with wrapped links | Logo, social, links, and copyright stack |
| Large  | About column + link columns; copyright and social on one row | About stacks above columns | Two-column link grid; bottom social above copyright |

Horizontal padding is 120px on desktop and 32px on mobile/tablet.

## Accessibility

- Root uses `<footer role="contentinfo">` implicitly via the footer element
- Navigation uses `nav` with an `aria-label`
- Social links require `label` for `aria-label`
- Topic headings in the large footer render as `h3`
