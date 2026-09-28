"use client";

import { Breadcrumbs } from "../../molecules/breadcrumbs/breadcrumbs";
import { AvatarLabelled } from "../../molecules/avatar-labelled/avatar-labelled";
import { templateHeroGradientSrc, templatePhotoSrc } from "../shared/mock-photo";
import { MarketingFooter } from "../shared/marketing-footer";
import { PracticalUiLogo } from "../shared/practical-ui-logo";

export function BlogArticleTemplate() {
  return (
    <div className="flex min-h-svh flex-col bg-fill-weaker">
      <header className="border-b border-stroke-weak bg-fill-inverse px-4 py-4 md:px-8">
        <PracticalUiLogo />
      </header>
      <article className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 md:px-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "#home" },
            { label: "Blog", href: "#blog" },
            { label: "Article" },
          ]}
        />
        <h1 className="mt-6 text-heading-1 font-semibold text-fg-strong">
          Building accessible components at scale
        </h1>
        <div className="mt-6">
          <AvatarLabelled
            name="John Smith"
            description="Published 12 Jan 2026 · 8 min read"
            src={templatePhotoSrc}
          />
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl">
          <img
            src={templateHeroGradientSrc}
            alt=""
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
        <div className="prose prose-neutral mt-8 max-w-none space-y-4 text-small text-fg-strong">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum tellus sed
            fringilla rhoncus. Integer posuere lorem euismod, volutpat nisl sed, bibendum
            lectus.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam.
          </p>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti.
          </p>
        </div>
      </article>
      <MarketingFooter />
    </div>
  );
}
