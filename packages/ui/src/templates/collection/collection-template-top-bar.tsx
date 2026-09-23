"use client";

import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { TextLink } from "../../atoms/text-link/text-link";
import { SearchInput } from "../../molecules/search-input/search-input";

export function CollectionTemplateTopBar() {
  return (
    <header className="hidden h-[72px] shrink-0 items-center gap-6 border-b border-stroke-weak bg-fill-inverse px-8 md:flex">
      <SearchInput
        aria-label="Search collection"
        placeholder="Search items, tags, notes…"
        className="w-full max-w-[420px]"
      />
      <div className="ml-auto flex items-center gap-6">
        <TextLink
          href="#import"
          size="small"
          tone="neutral-strong"
          iconLeft={<FeatherIcon name="upload" size={20} />}
        >
          Import
        </TextLink>
        <Button iconLeft={<FeatherIcon name="plus" size={20} />}>Add item</Button>
      </div>
    </header>
  );
}
