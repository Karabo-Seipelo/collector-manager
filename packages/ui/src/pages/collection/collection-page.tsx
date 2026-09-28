"use client";

import { CollectionLayoutTemplate } from "../../templates/collection/collection-layout-template";
import { CollectionTemplateContent } from "../../templates/collection/collection-template-content";

export interface CollectionPageProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export function CollectionPage(props: CollectionPageProps) {
  return (
    <CollectionLayoutTemplate {...props}>
      <CollectionTemplateContent />
    </CollectionLayoutTemplate>
  );
}
