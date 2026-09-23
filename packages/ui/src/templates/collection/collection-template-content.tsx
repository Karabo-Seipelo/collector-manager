"use client";

import * as React from "react";

import { Button } from "../../atoms/button/button";
import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { ImagePlaceholder } from "../../atoms/image-placeholder/image-placeholder";
import { FeatherIcon } from "../../atoms/icon/icon";
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
    <Card className="rounded-xl shadow-none hover:shadow-raised active:shadow-raised focus-within:outline-offset-0">
      <CardImage className="flex aspect-[173/150] h-auto items-center justify-center border-b-0 md:aspect-[204/190]">
        <ImagePlaceholder size={28} className="md:hidden" />
        <ImagePlaceholder size={30} className="hidden md:block" />
      </CardImage>
      <CardContent className="gap-0.5 p-0 pt-2 md:gap-1 md:pt-2.5">
        <h3 className="truncate text-small font-semibold leading-6 text-fg-strong">
          {item.title}
        </h3>
        <p className="truncate text-tiny leading-5 text-fg-weak">
          {item.category} · {item.detail}
        </p>
        {item.price ? (
          <p className="hidden truncate text-tiny leading-5 text-fg-strong md:block">
            {item.price}
          </p>
        ) : null}
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

  return (
    <div className="relative mx-auto w-full max-w-[1180px] px-4 py-4 md:px-8 md:py-8">
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
        <SearchInput aria-label="Search collection" placeholder="Search items…" />
      </div>

      <header className="mb-6 hidden md:block">
        <h1 className="text-heading-2 font-semibold text-fg-strong">My collection</h1>
        <p className="mt-1 text-small text-fg-weak">
          {collectionSummary.itemCount} items · {collectionSummary.estimatedValue} est. · Last
          added {collectionSummary.lastAdded}
        </p>
      </header>

      <div className="mb-4 flex flex-col gap-4 md:mb-6 md:flex-row md:items-end md:justify-between">
        <div className="hidden md:block md:w-56">
          <Select label="Sort by" defaultValue="recent">
            <option value="recent">Recently added</option>
            <option value="title">Title A–Z</option>
            <option value="value">Estimated value</option>
            <option value="category">Category</option>
          </Select>
        </div>

        <div className="flex items-center justify-between gap-4 md:justify-end">
          <p className="text-tiny text-fg-weak md:hidden">
            {collectionSummary.itemCount} items · {collectionSummary.estimatedValue} est.
          </p>
          <ViewToggle value={viewMode} onChange={setViewMode} />
        </div>
      </div>

      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden">
          <span className="hidden shrink-0 text-tiny font-semibold text-fg-weak md:inline">
            Tags:
          </span>
          {collectionFilters.map((filter) => (
            <Tag
              key={filter.id}
              size="small"
              selected={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className="shrink-0"
            >
              {filter.label}
            </Tag>
          ))}
        </div>
      </div>

      <section
        aria-label="Collection items"
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5"
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
