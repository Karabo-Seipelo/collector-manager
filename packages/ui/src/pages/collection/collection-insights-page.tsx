"use client";

import { CollectionInsightsContent } from "../../templates/collection/collection-insights-content";
import { CollectionLayoutTemplate } from "../../templates/collection/collection-layout-template";

export interface CollectionInsightsPageProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export function CollectionInsightsPage(props: CollectionInsightsPageProps) {
  return (
    <CollectionLayoutTemplate activeNav="insights" {...props}>
      <CollectionInsightsContent />
    </CollectionLayoutTemplate>
  );
}
