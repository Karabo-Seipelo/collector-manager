import type { ReactNode } from "react";

import { ImagePlaceholder } from "../../atoms/image-placeholder/image-placeholder";
import { cn } from "../../lib/cn";
import { formatDotList } from "../../lib/format-dot-list";

export interface ItemCardProps {
  title: string;
  meta?: string | string[];
  price?: string;
  imageSrc?: string;
  imageAlt?: string;
  overlay?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ItemCard({
  title,
  meta,
  price,
  imageSrc,
  imageAlt = "",
  overlay,
  onClick,
  className,
}: ItemCardProps) {
  const Root = onClick ? "button" : "div";
  const metaLabel = formatDotList(meta);

  return (
    <Root
      className={cn(
        "flex w-full flex-col items-stretch gap-[10px] pb-1 text-left font-body",
        onClick &&
          "cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-strong",
        className,
      )}
      {...(onClick ? { type: "button" as const, onClick } : {})}
    >
      <div className="relative flex h-[190px] w-full shrink-0 items-center justify-center overflow-hidden rounded-card bg-fill-weak">
        {imageSrc ? (
          <img
            className="block h-full w-full object-cover"
            src={imageSrc}
            alt={imageAlt}
          />
        ) : (
          <ImagePlaceholder />
        )}
        {overlay}
      </div>
      <div className="flex w-full flex-col items-start gap-0.5 overflow-hidden [word-break:break-word]">
        <p className="w-full text-small font-semibold text-fg-strong">
          {title}
        </p>
        {metaLabel ? (
          <p className="w-full text-tiny font-normal text-fg-weak">
            {metaLabel}
          </p>
        ) : null}
        {price ? (
          <p className="w-full text-tiny font-semibold text-fg-strong">
            {price}
          </p>
        ) : null}
      </div>
    </Root>
  );
}

export default ItemCard;
