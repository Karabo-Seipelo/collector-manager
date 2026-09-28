"use client";

import { FeatherIcon } from "../../atoms/icon/icon";
import { TextLink } from "../../atoms/text-link/text-link";
import { getCategoryBarPercent } from "../../api/collection/fixtures/insights";
import { useCollectionInsights } from "../../api/collection/hooks/use-collection-insights";
import {
  CollectionErrorState,
  CollectionLoadingState,
} from "./collection-fetch-state";

function StatTile({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-stroke-weak bg-fill-inverse px-5 py-[18px]">
      <p className="text-tiny text-fg-weak">{label}</p>
      <p className="text-heading-3 font-semibold text-fg-strong">{value}</p>
      <p className="min-h-5 text-tiny text-fg-weak">{detail ?? "\u00a0"}</p>
    </div>
  );
}

function CategoryValueRow({
  label,
  value,
  amount,
  categoryValues,
}: {
  label: string;
  value: string;
  amount: number;
  categoryValues: { amount: number }[];
}) {
  const percent = getCategoryBarPercent(amount, categoryValues);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex items-start justify-between gap-3 text-tiny">
        <span className="text-fg-strong">{label}</span>
        <span className="shrink-0 font-semibold text-fg-strong">{value}</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded bg-fill-weak"
        role="img"
        aria-label={`${label} ${percent}% of top category value`}
      >
        <div
          className="h-full rounded bg-fill-brand-strong"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function RecentItemCard({
  title,
  meta,
  imageSrc,
  imageAlt,
}: {
  title: string;
  meta: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <article className="flex min-w-[200px] flex-1 items-center gap-3 rounded-xl border border-stroke-weak bg-fill-inverse p-3">
      <div className="size-11 shrink-0 overflow-hidden rounded-lg bg-fill-weak">
        <img src={imageSrc} alt={imageAlt} className="size-full object-cover" />
      </div>
      <div className="min-w-0 flex flex-col gap-0.5">
        <p className="truncate text-tiny font-semibold text-fg-strong">{title}</p>
        <p className="truncate text-tiny text-fg-weak">{meta}</p>
      </div>
    </article>
  );
}

export function CollectionInsightsContent() {
  const { data, error, isLoading, refetch } = useCollectionInsights();

  if (isLoading) {
    return <CollectionLoadingState label="Loading insights…" />;
  }

  if (error || !data) {
    return (
      <CollectionErrorState
        message={error?.message}
        onRetry={() => void refetch()}
      />
    );
  }

  const subtitle = `Across ${data.summary.itemCount} items in ${data.summary.collectionCount} collections`;

  return (
    <div className="relative mx-auto w-full px-4 py-6 md:px-8 md:py-7">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-heading-2 font-semibold text-fg-strong md:text-heading-2">
            Insights
          </h1>
          <p className="mt-1 text-small text-fg-weak">{subtitle}</p>
        </div>
        <TextLink
          href="#period"
          size="small"
          iconRight={<FeatherIcon name="chevron-down" size={20} />}
          className="shrink-0 whitespace-nowrap"
        >
          Last 12 months
        </TextLink>
      </header>

      <section
        aria-label="Collection summary"
        className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
      >
        {data.statTiles.map((tile) => (
          <StatTile
            key={tile.id}
            label={tile.label}
            value={tile.value}
            detail={tile.detail}
          />
        ))}
      </section>

      <section
        aria-label="Charts"
        className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-start"
      >
        <div className="min-w-0 flex-1 rounded-xl border border-stroke-weak bg-fill-inverse p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-heading-4 font-semibold text-fg-strong">
              Collection value over time
            </h2>
            <span className="text-tiny text-fg-weak">Monthly</span>
          </div>
          <div className="flex h-[280px] flex-col items-center justify-center gap-2 rounded-lg bg-fill-weak">
            <FeatherIcon name="trending-up" size={36} className="text-icon-neutral" />
            <p className="text-tiny text-fg-weak">Line chart — value by month</p>
          </div>
        </div>

        <div className="w-full shrink-0 rounded-xl border border-stroke-weak bg-fill-inverse p-5 xl:w-[360px]">
          <h2 className="mb-4 text-heading-4 font-semibold text-fg-strong">
            Value by category
          </h2>
          <div className="flex flex-col gap-4">
            {data.categoryValues.map((row) => (
              <CategoryValueRow
                key={row.id}
                label={row.label}
                value={row.value}
                amount={row.amount}
                categoryValues={data.categoryValues}
              />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Recently added">
        <h2 className="mb-3 text-heading-4 font-semibold text-fg-strong">
          Recently added
        </h2>
        <div className="flex gap-5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] xl:grid xl:grid-cols-5 xl:overflow-visible [&::-webkit-scrollbar]:hidden">
          {data.recentItems.map((item) => (
            <RecentItemCard
              key={item.id}
              title={item.title}
              meta={item.meta}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
