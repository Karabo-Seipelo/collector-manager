"use client";

import { cn } from "../../lib/cn";
import {
  typographyClassHint,
  typographyTokens,
  type TypographyToken,
} from "./typography-spec";

function MetricsCell({
  desktop,
  mobile,
}: {
  desktop: TypographyToken["desktop"];
  mobile: TypographyToken["mobile"];
}) {
  const same =
    desktop.size === mobile.size && desktop.lineHeight === mobile.lineHeight;

  if (same) {
    return (
      <span>
        {desktop.size} / {desktop.lineHeight}
      </span>
    );
  }

  return (
    <span className="flex flex-col gap-0.5">
      <span>
        <span className="text-fg-strong">md+</span> {desktop.size} /{" "}
        {desktop.lineHeight}
      </span>
      <span>
        <span className="text-fg-strong">default</span> {mobile.size} /{" "}
        {mobile.lineHeight}
      </span>
    </span>
  );
}

function TypographyRow({ token }: { token: TypographyToken }) {
  return (
    <tr className="border-b border-stroke-weak align-top">
      <td className="py-4 pr-4 text-tiny font-medium text-fg-weak">
        {token.name}
      </td>
      <td className="min-w-[12rem] py-4 pr-4">
        <p className={cn("font-body truncate", token.previewClassName)}>
          {token.name}
        </p>
      </td>
      <td className="py-4 pr-4 text-tiny text-fg-weak">
        <MetricsCell desktop={token.desktop} mobile={token.mobile} />
      </td>
      <td className="py-4">
        <code className="text-tiny text-fg-strong">{typographyClassHint(token)}</code>
      </td>
    </tr>
  );
}

export function TypographyPage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-10 font-body text-fg-strong">
      <header className="flex flex-col gap-2">
        <p className="text-tiny font-semibold uppercase tracking-[2px] text-fg-weak">
          Foundations
        </p>
        <h1 className="text-heading-2 font-semibold tracking-[-0.5px]">
          Typography
        </h1>
        <p className="max-w-prose text-small text-fg-weak">
          Inter (<code className="text-fg-strong">font-body</code>) with a
          modified 1.2 type scale. Size tokens live in{" "}
          <code className="text-fg-strong">packages/ui/src/styles.css</code> and
          map to Tailwind utilities such as{" "}
          <code className="text-fg-strong">text-heading-1</code>.
        </p>
      </header>

      <section className="flex flex-col gap-4 rounded-lg border border-stroke-weak bg-fill-weaker p-6">
        <h2 className="text-heading-4 font-semibold">Typeface</h2>
        <p
          className="text-[4rem] font-semibold leading-none tracking-[-0.5px] text-fg-strong"
          aria-hidden
        >
          Ag
        </p>
        <p className="text-tiny leading-5 text-fg-weak">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br />
          abcdefghijklmnopqrstuvwxyz
          <br />
          0123456789
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-heading-4 font-semibold">Type scale</h2>
        <p className="text-small text-fg-weak">
          Desktop values match the{" "}
          <code className="text-fg-strong">text-*</code> utilities. Where mobile
          differs, use responsive classes (for example{" "}
          <code className="text-fg-strong">
            text-[36px] leading-[44px] md:text-heading-1 md:leading-[48px]
          </code>
          ).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-y border-stroke-weak text-tiny font-semibold text-fg-weak">
                <th className="py-3 pr-4 font-semibold">Style</th>
                <th className="py-3 pr-4 font-semibold">Preview</th>
                <th className="py-3 pr-4 font-semibold">Size / line height</th>
                <th className="py-3 font-semibold">Tailwind</th>
              </tr>
            </thead>
            <tbody>
              {typographyTokens.map((token) => (
                <TypographyRow key={token.name} token={token} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
