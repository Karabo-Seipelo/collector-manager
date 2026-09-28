"use client";

import * as React from "react";

import { Badge } from "../../atoms/badge/badge";
import { Button } from "../../atoms/button/button";
import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { Divider } from "../../atoms/divider/divider";
import { FeatherIcon } from "../../atoms/icon/icon";
import { ImagePlaceholder } from "../../atoms/image-placeholder/image-placeholder";
import { cn } from "../../lib/cn";
import { TextLink } from "../../atoms/text-link/text-link";
import { Breadcrumbs } from "../../molecules/breadcrumbs/breadcrumbs";
import type { CollectionItemDetail } from "../../api/collection/types";
import { useCollectionItem } from "../../api/collection/hooks/use-collection-item";
import {
  CollectionErrorState,
  CollectionLoadingState,
} from "./collection-fetch-state";

function ItemGallery({
  gallery,
}: {
  gallery: CollectionItemDetail["gallery"];
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const active = gallery[activeIndex];

  return (
    <div className="flex w-full max-w-[620px] flex-col gap-3">
      <div className="flex h-[280px] items-center justify-center overflow-hidden rounded-xl bg-fill-weak md:h-[420px]">
        {active?.src ? (
          <img
            src={active.src}
            alt={active.alt}
            className="size-full object-cover"
          />
        ) : (
          <ImagePlaceholder size={44} />
        )}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {gallery.map((thumb, index) => (
          <button
            key={thumb.id}
            type="button"
            aria-label={thumb.alt}
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "flex h-[72px] items-center justify-center overflow-hidden rounded-lg bg-fill-weak md:h-[88px]",
              activeIndex === index &&
                "ring-2 ring-primary ring-offset-2 ring-offset-fill-inverse",
            )}
          >
            {thumb.src ? (
              <img
                src={thumb.src}
                alt=""
                className="size-full object-cover"
              />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

function ValueStats({
  paid,
  estimatedValue,
  change,
}: Pick<
  CollectionItemDetail,
  "paid" | "estimatedValue" | "change"
>) {
  return (
    <dl className="grid w-full grid-cols-3 gap-6 rounded-xl bg-fill-weaker px-5 py-4">
      <div className="flex flex-col gap-0.5">
        <dt className="text-tiny text-fg-weak">Paid</dt>
        <dd className="text-heading-4 font-semibold text-fg-strong">{paid}</dd>
      </div>
      <div className="flex flex-col gap-0.5">
        <dt className="text-tiny text-fg-weak">Est. value</dt>
        <dd className="text-heading-4 font-semibold text-fg-strong">
          {estimatedValue}
        </dd>
      </div>
      <div className="flex flex-col gap-0.5">
        <dt className="text-tiny text-fg-weak">Change</dt>
        <dd className="text-heading-4 font-semibold text-fg-strong">{change}</dd>
      </div>
    </dl>
  );
}

function SpecList({ specs }: { specs: CollectionItemDetail["specs"] }) {
  return (
    <dl className="flex w-full flex-col gap-3 text-small">
      {specs.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between gap-4"
        >
          <dt className="text-fg-weak">{row.label}</dt>
          <dd className="font-semibold text-fg-strong">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export interface CollectionItemDetailContentProps {
  itemId?: string;
  onEdit?: () => void;
  onMove?: () => void;
  onMoreActions?: () => void;
}

export function CollectionItemDetailContent({
  itemId = "kind-of-blue",
  onEdit,
  onMove,
  onMoreActions,
}: CollectionItemDetailContentProps) {
  const { data: item, error, isLoading, refetch } = useCollectionItem(itemId);

  if (isLoading) {
    return <CollectionLoadingState label="Loading item…" />;
  }

  if (error || !item) {
    return (
      <CollectionErrorState
        message={error?.message}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div className="mx-auto w-full px-4 py-6 md:px-8 md:py-7">
      <div className="mb-6 flex items-center gap-2">
        <TextLink
          href={item.breadcrumbs[0]?.href ?? "#collection"}
          size="tiny"
          tone="neutral-weak"
          iconLeft={<FeatherIcon name="arrow-left" size={16} />}
          className="md:hidden"
          aria-label="Back to collection"
        >
          <span className="sr-only">Back</span>
        </TextLink>
        <Breadcrumbs
          items={item.breadcrumbs}
          className="min-w-0 flex-1"
          aria-label="Item location"
        />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <ItemGallery gallery={item.gallery} />

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            <Badge size="small" tone="neutral">
              {item.categoryLabel}
            </Badge>
            <span className="inline-flex h-6 items-center gap-1 rounded-2xl bg-primary px-2 text-tiny text-primary-foreground">
              <FeatherIcon name="check" size={14} aria-hidden />
              Owned
            </span>
            <Badge size="small" tone="neutral">
              Insured
            </Badge>
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="text-heading-2 font-semibold text-fg-strong">
              {item.title}
            </h1>
            <p className="text-small text-fg-weak">{item.subtitle}</p>
          </div>

          <ValueStats
            paid={item.paid}
            estimatedValue={item.estimatedValue}
            change={item.change}
          />

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={onEdit}>Edit item</Button>
            <Button
              variant="secondary"
              tone="neutral"
              iconRight={<FeatherIcon name="chevron-down" size={20} />}
              onClick={onMove}
            >
              Move to…
            </Button>
            <ButtonIcon
              aria-label="More actions"
              variant="secondary"
              tone="neutral"
              icon={<FeatherIcon name="more-vertical" size={24} />}
              onClick={onMoreActions}
            />
          </div>

          <Divider />

          <SpecList specs={item.specs} />

          <Divider />

          <section className="flex flex-col gap-1.5">
            <h2 className="text-heading-4 font-semibold text-fg-strong">
              Notes
            </h2>
            <p className="text-small leading-6 text-fg-weak">{item.notes}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
