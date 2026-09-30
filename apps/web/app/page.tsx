import { Button } from "@repo/ui/atoms/button";
import { Code } from "@repo/ui/atoms/code";
import { FeatherIcon } from "@repo/ui/atoms/icon";

import { SiteHeader } from "./components/site-header";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col bg-fill-weaker font-body text-fg-strong">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12 md:px-8">
        <header className="flex flex-col gap-3">
          <p className="text-tiny font-semibold uppercase tracking-[2px] text-fg-weak">
            apps/web
          </p>
          <h1 className="text-heading-2 font-semibold tracking-[-0.5px]">
            Next.js app shell
          </h1>
          <p className="text-small text-fg-weak">
            This route consumes shared components from{" "}
            <Code>@repo/ui</Code>. Page-level Storybook demos under{" "}
            <Code>packages/ui/src/pages</Code> are reference screens—copy patterns
            from there as you build product features.
          </p>
        </header>

        <section
          id="design-system"
          className="grid gap-4 md:grid-cols-2"
          aria-labelledby="ds-heading"
        >
          <h2 id="ds-heading" className="sr-only">
            Design system links
          </h2>
          <article className="flex flex-col gap-2 rounded-xl border border-stroke-weak bg-fill-inverse p-6">
            <h3 className="text-heading-4 font-semibold text-fg-strong">Storybook</h3>
            <p className="text-small text-fg-weak">
              Run <Code>pnpm storybook</Code> (port 6006) for the full component
              catalog and interaction tests.
            </p>
          </article>
          <article className="flex flex-col gap-2 rounded-xl border border-stroke-weak bg-fill-inverse p-6">
            <h3 className="text-heading-4 font-semibold text-fg-strong">
              Documentation
            </h3>
            <p className="text-small text-fg-weak">
              Run <Code>pnpm --filter docs dev</Code> (port 3001) for architecture
              and design-system guides.
            </p>
          </article>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button iconLeft={<FeatherIcon name="layers" size={20} />}>
            Primary action
          </Button>
          <Button variant="secondary" tone="neutral">
            Secondary
          </Button>
        </div>
      </main>
    </div>
  );
}
