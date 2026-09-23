import * as React from "react";

import { cn } from "../../lib/cn";

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterLinkAnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  link: FooterLinkItem;
}

export function FooterLinkAnchor({
  link,
  className,
  ...rest
}: FooterLinkAnchorProps) {
  return (
    <a
      href={link.href}
      className={cn(
        "inline-flex text-small leading-6 text-fg-weak outline-none",
        "hover:text-fg-strong",
        "focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2",
        className,
      )}
      {...rest}
    >
      {link.label}
    </a>
  );
}
