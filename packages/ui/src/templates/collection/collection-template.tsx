"use client";

import * as React from "react";

import { CollectionTemplateBottomNav } from "./collection-template-bottom-nav";
import { CollectionTemplateContent } from "./collection-template-content";
import { CollectionTemplateSidebar } from "./collection-template-sidebar";
import { CollectionTemplateTopBar } from "./collection-template-top-bar";

export interface CollectionTemplateProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export function CollectionTemplate({
  sidebarOpen,
  defaultSidebarOpen = false,
  onSidebarOpenChange,
}: CollectionTemplateProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultSidebarOpen);
  const currentOpen = sidebarOpen ?? internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (sidebarOpen === undefined) {
        setInternalOpen(next);
      }
      onSidebarOpenChange?.(next);
    },
    [onSidebarOpenChange, sidebarOpen],
  );

  return (
    <div className="flex min-h-svh flex-col bg-fill-weaker md:flex-row">
      <CollectionTemplateSidebar open={currentOpen} onOpenChange={setOpen} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <CollectionTemplateTopBar />
        <main className="flex-1 pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-0">
          <CollectionTemplateContent />
        </main>
      </div>

      <CollectionTemplateBottomNav onProfileClick={() => setOpen(true)} />
    </div>
  );
}
