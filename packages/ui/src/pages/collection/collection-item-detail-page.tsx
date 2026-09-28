"use client";

import { CollectionItemDetailContent } from "../../templates/collection/collection-item-detail-content";
import { CollectionLayoutTemplate } from "../../templates/collection/collection-layout-template";

export interface CollectionItemDetailPageProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  onEdit?: () => void;
  onMove?: () => void;
  onMoreActions?: () => void;
}

export function CollectionItemDetailPage({
  onEdit,
  onMove,
  onMoreActions,
  ...layoutProps
}: CollectionItemDetailPageProps) {
  return (
    <CollectionLayoutTemplate {...layoutProps}>
      <CollectionItemDetailContent
        onEdit={onEdit}
        onMove={onMove}
        onMoreActions={onMoreActions}
      />
    </CollectionLayoutTemplate>
  );
}
