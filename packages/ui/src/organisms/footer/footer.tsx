"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { FooterLinkAnchor, type FooterLinkItem } from "./footer-link";
import { FooterSocialLinks, type FooterSocialLink } from "./footer-social";

export type { FooterLinkItem, FooterSocialLink };

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

interface FooterBaseProps {
  logo: React.ReactNode;
  copyright: string;
  socialLinks: FooterSocialLink[];
  className?: string;
}

interface FooterSmallProps extends FooterBaseProps {
  size?: "small";
  navLinks: FooterLinkItem[];
  description?: never;
  columns?: never;
}

interface FooterLargeProps extends FooterBaseProps {
  size: "large";
  description: string;
  columns: FooterColumn[];
  navLinks?: never;
}

export type FooterProps = FooterSmallProps | FooterLargeProps;

function FooterLogo({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 shrink-0 items-center">{children}</div>
  );
}

function FooterCopyright({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-tiny leading-5 text-fg-weak whitespace-nowrap">
      {children}
    </p>
  );
}

function FooterNavLinks({
  links,
  className,
}: {
  links: FooterLinkItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Footer">
      <ul
        className={cn(
          "flex list-none flex-wrap gap-x-6 gap-y-2 p-0 m-0",
          className,
        )}
      >
        {links.map((link) => (
          <li key={link.label}>
            <FooterLinkAnchor link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterColumnBlock({
  title,
  links,
  className,
}: FooterColumn & { className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-1 flex-col gap-4", className)}>
      <h3 className="text-heading-4 font-semibold leading-7 text-fg-strong">
        {title}
      </h3>
      <ul className="flex list-none flex-col gap-3 p-0 m-0">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLinkAnchor link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterSmall({
  logo,
  copyright,
  navLinks,
  socialLinks,
  className,
}: FooterSmallProps) {
  return (
    <footer
      className={cn(
        "w-full border-t border-stroke-weak bg-fill-inverse px-8 py-12 md:px-[120px]",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 md:gap-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <FooterLogo>{logo}</FooterLogo>
          <FooterSocialLinks links={socialLinks} />
        </div>
        <div className="flex flex-col gap-8">
          <FooterNavLinks links={navLinks} />
          <FooterCopyright>{copyright}</FooterCopyright>
        </div>
      </div>
    </footer>
  );
}

function FooterLarge({
  logo,
  description,
  copyright,
  columns,
  socialLinks,
  className,
}: FooterLargeProps) {
  return (
    <footer
      className={cn(
        "w-full border-t border-stroke-weak bg-fill-inverse px-8 py-12 md:px-[120px]",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
          <div className="flex w-full max-w-[400px] flex-col gap-6">
            <FooterLogo>{logo}</FooterLogo>
            <p className="text-small leading-6 text-fg-weak [word-break:break-word]">
              {description}
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:flex lg:justify-between lg:gap-6">
            {columns.map((column, index) => (
              <FooterColumnBlock
                key={column.title}
                {...column}
                className={cn(
                  index === columns.length - 1 &&
                    columns.length % 2 === 1 &&
                    "col-span-2 md:col-span-1",
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col-reverse gap-6 border-t border-stroke-weak pt-12 md:flex-row md:items-end md:justify-between">
          <FooterCopyright>{copyright}</FooterCopyright>
          <FooterSocialLinks links={socialLinks} />
        </div>
      </div>
    </footer>
  );
}

export function Footer(props: FooterProps) {
  if (props.size === "large") {
    return <FooterLarge {...props} />;
  }
  return <FooterSmall {...props} />;
}
