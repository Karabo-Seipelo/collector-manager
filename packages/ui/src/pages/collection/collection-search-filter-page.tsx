"use client";

import { CollectionLayoutTemplate } from "../../templates/collection/collection-layout-template";
import { CollectionSearchFilterContent } from "../../templates/collection/collection-search-filter-content";
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
      searchDefaultValue="blue"
      {...layoutProps}
    >
      <CollectionSearchFilterContent onResetFilters={onResetFilters} />
    </CollectionLayoutTemplate>
  );
}
