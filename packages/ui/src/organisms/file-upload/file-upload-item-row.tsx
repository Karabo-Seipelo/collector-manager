"use client";

import * as React from "react";

import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon } from "../../atoms/icon/icon";
import { IconContainer } from "../../atoms/icon-container/icon-container";
import { cn } from "../../lib/cn";
import { FileUploadProgress } from "./file-upload-progress";

export interface FileUploadItemData {
  id: string;
  name: string;
  sizeLabel: string;
  href?: string;
  progress?: number;
  status: "uploading" | "uploaded";
}

export interface FileUploadItemRowProps {
  item: FileUploadItemData;
  onRemove?: (id: string) => void;
  disabled?: boolean;
}

export function FileUploadItemRow({
  item,
  onRemove,
  disabled = false,
}: FileUploadItemRowProps) {
  const uploaded = item.status === "uploaded";

  return (
    <div className="flex items-center gap-4 border-b border-stroke-weak py-4 last:border-b-0">
      <IconContainer
        icon={<FeatherIcon name="file" size={24} />}
        tone="neutral"
        variant="filled"
        className="size-12 p-3"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center text-tiny leading-5">
        {uploaded && item.href ? (
          <a
            href={item.href}
            className="truncate text-primary underline outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2"
          >
            {item.name}
          </a>
        ) : (
          <span className="truncate text-fg-strong">{item.name}</span>
        )}
        <span className="text-fg-weak">{item.sizeLabel}</span>
      </div>
      {!uploaded ? (
        <div className="flex min-w-0 flex-1 items-center pr-4">
          <FileUploadProgress value={item.progress ?? 0} />
        </div>
      ) : null}
      <ButtonIcon
        type="button"
        aria-label={`Remove ${item.name}`}
        icon={<FeatherIcon name="x" size={24} />}
        variant="tertiary"
        tone="neutral"
        disabled={disabled}
        onClick={() => onRemove?.(item.id)}
        className={cn(!uploaded && "shrink-0")}
      />
    </div>
  );
}
