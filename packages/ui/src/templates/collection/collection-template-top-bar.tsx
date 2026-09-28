"use client";

import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { SearchInput } from "../../molecules/search-input/search-input";

export interface CollectionTemplateTopBarProps {
  searchDefaultValue?: string;
}

export function CollectionTemplateTopBar({
  searchDefaultValue,
}: CollectionTemplateTopBarProps = {}) {
  return (
    <header className="hidden h-[72px] shrink-0 items-center gap-3 border-b border-stroke-weak bg-fill-inverse px-8 md:flex">
      <SearchInput
        aria-label="Search collection"
        placeholder="Search collection, tags, years…"
        defaultValue={searchDefaultValue}
        className="min-w-0 flex-1"
      />
      <div className="flex shrink-0 items-center gap-3">
        <Button variant="secondary" tone="neutral">
          Import
        </Button>
        <Button iconLeft={<FeatherIcon name="plus" size={20} />}>
          Add item
        </Button>
      </div>
    </header>
  );
}
