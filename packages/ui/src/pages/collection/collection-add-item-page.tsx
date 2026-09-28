"use client";

import { CollectionAddItemContent } from "../../templates/collection/collection-add-item-content";
import { CollectionLayoutTemplate } from "../../templates/collection/collection-layout-template";

export interface CollectionAddItemPageProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
  onSave?: () => void;
  onSaveAndAddAnother?: () => void;
}

export function CollectionAddItemPage({
  onCancel,
  onSave,
  onSaveAndAddAnother,
  ...layoutProps
}: CollectionAddItemPageProps) {
  return (
    <CollectionLayoutTemplate {...layoutProps}>
      <CollectionAddItemContent
        onCancel={onCancel}
        onSave={onSave}
        onSaveAndAddAnother={onSaveAndAddAnother}
      />
    </CollectionLayoutTemplate>
  );
}
