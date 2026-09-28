"use client";

import * as React from "react";

import { CollectionTemplateBottomNav } from "./collection-template-bottom-nav";
import {
  CollectionTemplateSidebar,
  type CollectionActiveNav,
} from "./collection-template-sidebar";
import { CollectionTemplateTopBar } from "./collection-template-top-bar";

export type { CollectionActiveNav };

export interface CollectionLayoutTemplateProps {
  children: React.ReactNode;
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  activeNav?: CollectionActiveNav;
  searchDefaultValue?: string;
}

export function CollectionLayoutTemplate({
  children,
  sidebarOpen,
  defaultSidebarOpen = false,
  onSidebarOpenChange,
  activeNav = "collection",
  searchDefaultValue,
}: CollectionLayoutTemplateProps) {
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
      <CollectionTemplateSidebar
        open={currentOpen}
        onOpenChange={setOpen}
        activeNav={activeNav}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <CollectionTemplateTopBar searchDefaultValue={searchDefaultValue} />
        <main className="flex-1 pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-0">
          {children}
        </main>
      </div>

      <CollectionTemplateBottomNav
        activeNav={activeNav}
        onProfileClick={() => setOpen(true)}
      />
    </div>
  );
}
