import * as React from "react";

import { cn } from "../../lib/cn";

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterSocialLinksProps {
  links: FooterSocialLink[];
  className?: string;
}

export function FooterSocialLinks({ links, className }: FooterSocialLinksProps) {
  return (
    <ul className={cn("flex list-none gap-6 p-0 m-0", className)}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            aria-label={link.label}
            className={cn(
              "inline-grid size-6 place-items-center text-icon-neutral outline-none",
              "hover:text-fg-strong",
              "focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2",
              "[&>svg]:size-full",
            )}
          >
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
