"use client";

import * as React from "react";

import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { Checkbox } from "../../atoms/checkbox/checkbox";
import { Divider } from "../../atoms/divider/divider";
import { FeatherIcon } from "../../atoms/icon/icon";
import { IconContainer } from "../../atoms/icon-container/icon-container";
import { Slider } from "../../atoms/slider/slider";
import { TextLink } from "../../atoms/text-link/text-link";
import { cn } from "../../lib/cn";
import { Card, CardContent, CardImage } from "../../molecules/card/card";
import { Select } from "../../molecules/select/select";
import {
  Table,
  TableBody,
  TableCell,
  TableCellSecondaryText,
  TableCellText,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "../../organisms/table/table";
import {
  searchCategoryFilters,
  searchConditionFilters,
  searchFilterMeta,
  searchResultRows,
} from "./collection-search-filter-data";

type ViewMode = "grid" | "list";

function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <div
      role="group"
      aria-label="View mode"
      className="inline-flex overflow-hidden rounded-lg border border-stroke-weak"
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

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-tiny font-semibold uppercase tracking-[2px] text-fg-weak">
        {title}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function ResultThumbnail({
  imageSrc,
  imageAlt,
  icon,
}: {
  imageSrc?: string;
  imageAlt?: string;
  icon: (typeof searchResultRows)[number]["icon"];
}) {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-fill-weak">
      {imageSrc ? (
        <img src={imageSrc} alt={imageAlt ?? ""} className="size-full object-cover" />
      ) : (
        <IconContainer
          tone="neutral"
          variant="stroked"
          className="size-8 rounded-md"
          icon={<FeatherIcon name={icon} size={16} />}
          aria-hidden
        />
      )}
    </div>
  );
}

function SearchResultsGrid() {
  return (
    <section
      aria-label="Search results grid"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
    >
      {searchResultRows.map((row) => (
        <Card key={row.id} className="rounded-2xl shadow-raised">
          {row.imageSrc ? (
            <CardImage className="h-40 rounded-t-2xl border-b border-stroke-weak">
              <img src={row.imageSrc} alt={row.imageAlt ?? row.title} />
            </CardImage>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-t-2xl border-b border-stroke-weak bg-fill-weaker">
              <IconContainer
                tone="brand"
                variant="filled"
                icon={<FeatherIcon name={row.icon} size={24} />}
                aria-hidden
              />
            </div>
          )}
          <CardContent className="gap-2 p-6">
            <p className="text-small font-semibold text-fg-strong">{row.value}</p>
            <h3 className="text-heading-4 font-semibold text-fg-strong">{row.title}</h3>
            <p className="text-small text-fg-weak">
              {row.category} · {row.condition} · {row.year}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

const searchResultsPaginationClassName =
  "flex-row-reverse gap-3 [&>div:first-child]:!flex-none [&>div:first-child]:gap-3 [&>div:first-child>div:first-child]:md:pr-0 [&>div:first-child>div:last-child]:md:pl-0";

function SearchResultsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-stroke-weak bg-fill-inverse">
      <Table
        aria-label="Search results"
        className="[&_tbody_tr:last-child_td]:border-b-0"
      >
        <TableHeader>
          <TableRow className="bg-fill-weaker">
            <TableHead className="w-14" aria-hidden />
            <TableHead>Item</TableHead>
            <TableHead className="hidden w-[150px] lg:table-cell">Category</TableHead>
            <TableHead className="hidden w-[120px] md:table-cell">Condition</TableHead>
            <TableHead className="hidden w-[70px] sm:table-cell">Year</TableHead>
            <TableHead align="right" className="w-[120px]">
              Est. value
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchResultRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <ResultThumbnail
                  imageSrc={row.imageSrc}
                  imageAlt={row.imageAlt}
                  icon={row.icon}
                />
              </TableCell>
              <TableCell>
                <div className="flex min-w-0 flex-col">
                  <TableCellText bold>{row.title}</TableCellText>
                  <TableCellSecondaryText>{row.subtitle}</TableCellSecondaryText>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <span className="text-small text-fg-weak">{row.category}</span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <span className="text-small text-fg-weak">{row.condition}</span>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <span className="text-small text-fg-weak">{row.year}</span>
              </TableCell>
              <TableCell align="right">
                <TableCellText bold>{row.value}</TableCellText>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t border-stroke-weak px-4 py-3">
        <TablePagination
          className={searchResultsPaginationClassName}
          currentPage={1}
          totalPages={searchFilterMeta.totalPages}
          totalItems={searchFilterMeta.matchCount}
          pageSize={searchFilterMeta.pageSize}
        />
      </div>
    </div>
  );
}

export interface CollectionSearchFilterContentProps {
  onResetFilters?: () => void;
}

export function CollectionSearchFilterContent({
  onResetFilters,
}: CollectionSearchFilterContentProps) {
  const [viewMode, setViewMode] = React.useState<ViewMode>("list");
  const [filterKey, setFilterKey] = React.useState(0);

  const subtitle = `${searchFilterMeta.matchCount} items match “${searchFilterMeta.query}” across ${searchFilterMeta.collectionCount} collections`;

  const handleReset = () => {
    setFilterKey((key) => key + 1);
    onResetFilters?.();
  };

  return (
    <div className="relative mx-auto w-full px-4 py-6 md:px-8 md:py-7">
      <header className="mb-6">
        <h1 className="text-heading-2 font-semibold text-fg-strong">Search results</h1>
        <p className="mt-1 text-small text-fg-weak">{subtitle}</p>
      </header>

      <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
        <aside
          key={filterKey}
          className="w-full shrink-0 rounded-xl bg-fill-weaker p-4 xl:w-[252px]"
          aria-label="Filters"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-heading-4 font-semibold text-fg-strong">Filters</h2>
            <TextLink
              href="#reset"
              size="tiny"
              onClick={(event) => {
                event.preventDefault();
                handleReset();
              }}
            >
              Reset
            </TextLink>
          </div>

          <div className="flex flex-col gap-4">
            <FilterSection title="Category">
              {searchCategoryFilters.map((filter) => (
                <Checkbox
                  key={filter.id}
                  size="large"
                  label={filter.label}
                  defaultChecked={filter.defaultChecked}
                />
              ))}
            </FilterSection>

            <Divider />

            <FilterSection title="Condition">
              {searchConditionFilters.map((filter) => (
                <Checkbox
                  key={filter.id}
                  size="large"
                  label={filter.label}
                  defaultChecked={filter.defaultChecked}
                />
              ))}
            </FilterSection>

            <Divider />

            <FilterSection title="Value range">
              <Slider
                aria-label="Maximum estimated value"
                showValue={false}
                min={0}
                max={30000}
                step={500}
                defaultValue={30000}
                className="w-full"
              />
              <div className="flex justify-between text-tiny text-fg-weak">
                <span>R 0</span>
                <span>R 30 000+</span>
              </div>
            </FilterSection>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-small font-semibold text-fg-strong">
              {searchFilterMeta.matchCount} items
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-full min-w-[200px] sm:w-52">
                <Select label="Sort" defaultValue="value-desc">
                  <option value="value-desc">Value, high to low</option>
                  <option value="value-asc">Value, low to high</option>
                  <option value="recent">Recently added</option>
                  <option value="title">Title A–Z</option>
                </Select>
              </div>
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </div>
          </div>

          <div
            className={cn(viewMode === "list" ? "block" : "hidden")}
            aria-hidden={viewMode !== "list"}
          >
            <SearchResultsTable />
          </div>
          <div
            className={cn(viewMode === "grid" ? "block" : "hidden")}
            aria-hidden={viewMode !== "grid"}
          >
            <SearchResultsGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
