"use client";

import { Breadcrumbs } from "../../molecules/breadcrumbs/breadcrumbs";
import { MarketingFooter } from "../shared/marketing-footer";
import { BlogCardGrid } from "../shared/blog-card-grid";
import { PracticalUiLogo } from "../shared/practical-ui-logo";

export function BlogTemplate() {
  return (
    <div className="flex min-h-svh flex-col bg-fill-weaker">
      <header className="border-b border-stroke-weak bg-fill-inverse px-4 py-4 md:px-8">
        <PracticalUiLogo />
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "#home" },
            { label: "Blog" },
          ]}
        />
        <h1 className="mt-6 text-heading-2 font-semibold text-fg-strong">Blog</h1>
        <p className="mt-2 max-w-2xl text-small text-fg-weak">
          Insights, tutorials, and updates from the Practical UI team.
        </p>
        <div className="mt-10">
          <BlogCardGrid count={6} />
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
