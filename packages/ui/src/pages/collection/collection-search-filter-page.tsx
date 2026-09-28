"use client";

import { CollectionLayoutTemplate } from "../../templates/collection/collection-layout-template";
import { CollectionSearchFilterContent } from "../../templates/collection/collection-search-filter-content";
import { searchFilterMeta } from "../../templates/collection/collection-search-filter-data";

export interface CollectionSearchFilterPageProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  onResetFilters?: () => void;
}

export function CollectionSearchFilterPage({
  onResetFilters,
  ...layoutProps
}: CollectionSearchFilterPageProps) {
  return (
    <CollectionLayoutTemplate
      activeNav="search"
      searchDefaultValue={searchFilterMeta.query}
      {...layoutProps}
    >
      <CollectionSearchFilterContent onResetFilters={onResetFilters} />
    </CollectionLayoutTemplate>
  );
}
