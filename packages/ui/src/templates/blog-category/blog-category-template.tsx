"use client";

import { Tag } from "../../atoms/tag/tag";
import { Breadcrumbs } from "../../molecules/breadcrumbs/breadcrumbs";
import { BlogCardGrid } from "../shared/blog-card-grid";
import { MarketingFooter } from "../shared/marketing-footer";
import { PracticalUiLogo } from "../shared/practical-ui-logo";

export function BlogCategoryTemplate() {
  return (
    <div className="flex min-h-svh flex-col bg-fill-weaker">
      <header className="border-b border-stroke-weak bg-fill-inverse px-4 py-4 md:px-8">
        <PracticalUiLogo />
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "#home" },
            { label: "Blog", href: "#blog" },
            { label: "Design systems" },
          ]}
        />
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <h1 className="text-heading-2 font-semibold text-fg-strong">Design systems</h1>
          <Tag size="small" selected>
            12 articles
          </Tag>
        </div>
        <div className="mt-10">
          <BlogCardGrid count={9} />
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
