"use client";

import * as React from "react";

import { Button } from "../../atoms/button/button";
import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon } from "../../atoms/icon/icon";
import { IconContainer } from "../../atoms/icon-container/icon-container";
import { Tag } from "../../atoms/tag/tag";
import { cn } from "../../lib/cn";
import { Card, CardContent, CardImage } from "../../molecules/card/card";
import { SearchInput } from "../../molecules/search-input/search-input";
import { Select } from "../../molecules/select/select";
import {
  collectionFilters,
  collectionItems,
  collectionSummary,
  type CollectionItem,
} from "./mock-collection-data";

function CollectionItemCard({ item }: { item: CollectionItem }) {
  return (
    <Card className="rounded-2xl shadow-raised hover:shadow-overlay active:shadow-sunken">
      <CardImage className="h-[204px] rounded-t-2xl border-b border-stroke-weak">
        <img src={item.imageSrc} alt={item.imageAlt} />
      </CardImage>
      <CardContent className="gap-4 p-8 pt-8">
        <div className="flex w-full flex-col gap-4">
          <IconContainer
            tone="brand"
            variant="filled"
            icon={<FeatherIcon name={item.icon} size={24} />}
            aria-hidden
          />
          <div className="flex w-full min-w-0 flex-col gap-1">
            <p className="text-small font-semibold leading-6 text-fg-strong">
              {item.price}
            </p>
            <h3 className="text-heading-4 font-semibold leading-7 text-fg-strong">
              {item.title}
            </h3>
            <p className="text-small leading-6 text-fg-weak">
              {item.category} · {item.detail}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type ViewMode = "grid" | "list";

function ViewToggle({
  value,
  onChange,
  className,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="View mode"
      className={cn(
        "inline-flex overflow-hidden rounded-lg border border-stroke-weak",
        className,
      )}
    >
      <ButtonIcon
        aria-label="Grid view"
        aria-pressed={value === "grid"}
        icon={<FeatherIcon name="grid" size={24} />}
        variant={value === "grid" ? "secondary" : "tertiary"}
        tone="neutral"
        className="rounded-none border-0"
        onClick={() => onChange("grid")}
      />
      <ButtonIcon
        aria-label="List view"
        aria-pressed={value === "list"}
        icon={<FeatherIcon name="list" size={24} />}
        variant={value === "list" ? "secondary" : "tertiary"}
        tone="neutral"
        className="rounded-none border-0"
        onClick={() => onChange("list")}
      />
    </div>
  );
}

export function CollectionTemplateContent() {
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");

  const summaryLine = `${collectionSummary.itemCount} items · ${collectionSummary.estimatedValue} estimated value · last added ${collectionSummary.lastAdded}`;

  return (
    <div className="relative mx-auto w-full px-4 py-6 md:px-8 md:py-8">
      <header className="mb-4 flex items-center gap-3 md:hidden">
        <h1 className="min-w-0 flex-1 truncate text-heading-4 font-semibold text-fg-strong">
          My collection
        </h1>
        <ButtonIcon
          aria-label="Filter"
          icon={<FeatherIcon name="sliders" size={24} />}
          variant="tertiary"
          tone="neutral"
        />
        <ButtonIcon
          aria-label="More options"
          icon={<FeatherIcon name="more-horizontal" size={24} />}
          variant="tertiary"
          tone="neutral"
        />
      </header>

      <div className="mb-4 md:hidden">
        <SearchInput
          aria-label="Search collection"
          placeholder="Search collection, tags, years…"
        />
      </div>

      <header className="mb-6 hidden md:block">
        <h1 className="text-heading-2 font-semibold text-fg-strong">
          My collection
        </h1>
        <p className="mt-1 text-small text-fg-weak">{summaryLine}</p>
      </header>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {collectionFilters.map((filter) => {
            const selected = activeFilter === filter.id;
            return (
              <Tag
                key={filter.id}
                size="medium"
                selected={selected}
                icon={
                  selected ? (
                    <FeatherIcon name="check" size={16} />
                  ) : undefined
                }
                onClick={() => setActiveFilter(filter.id)}
                className="shrink-0"
              >
                {filter.label}
              </Tag>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 md:justify-end">
          <p className="text-tiny text-fg-weak md:hidden">{summaryLine}</p>
          <div className="hidden w-56 md:block">
            <Select label="Sort by" defaultValue="value-desc">
              <option value="value-desc">Value: High to Low</option>
              <option value="value-asc">Value: Low to High</option>
              <option value="recent">Recently added</option>
              <option value="title">Title A–Z</option>
            </Select>
          </div>
          <ViewToggle value={viewMode} onChange={setViewMode} />
        </div>
      </div>

      <section
        aria-label="Collection items"
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5"
            : "flex flex-col gap-3",
        )}
      >
        {collectionItems.map((item) => (
          <CollectionItemCard key={item.id} item={item} />
        ))}
      </section>

      <div className="fixed right-4 bottom-[calc(72px+1rem+env(safe-area-inset-bottom))] z-20 md:hidden">
        <Button
          iconLeft={<FeatherIcon name="plus" size={20} />}
          className="shadow-overlay"
        >
          Add item
        </Button>
      </div>
    </div>
  );
}
