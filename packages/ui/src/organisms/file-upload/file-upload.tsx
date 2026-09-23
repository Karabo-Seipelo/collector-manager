"use client";

import * as React from "react";

import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { IconContainer } from "../../atoms/icon-container/icon-container";
import { cn } from "../../lib/cn";
import { FieldError } from "../../atoms/field-error/field-error";
import { FieldHeader } from "../../atoms/field-header/field-header";
import { useFieldIds } from "../../lib/use-field-ids";
import {
  FileUploadItemRow,
  type FileUploadItemData,
} from "./file-upload-item-row";

export type { FileUploadItemData };

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  dropzoneTitle?: string;
  dropzoneDescription?: string;
  browseLabel?: string;
  files?: FileUploadItemData[];
  onFilesSelected?: (files: FileList) => void;
  onRemoveFile?: (id: string) => void;
  id?: string;
}

export function FileUpload({
  label,
  required = false,
  optional = false,
  hint,
  error,
  disabled = false,
  accept,
  multiple = false,
  dropzoneTitle = "Drag and drop files here",
  dropzoneDescription,
  browseLabel = "Browse files",
  files,
  onFilesSelected,
  onRemoveFile,
  id,
  className,
  ...rest
}: FileUploadProps) {
  const invalid = Boolean(error) && !disabled;
  const { fieldId, hintId, errorId, describedBy } = useFieldIds(id, {
    hint,
    error: invalid ? error : undefined,
  });

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const hasFiles = Boolean(files?.length);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0 || disabled) {
      return;
    }

    onFilesSelected?.(fileList);
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }

    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragOver(false);

    if (disabled) {
      return;
    }

    handleFiles(event.dataTransfer.files);
  };

  const dropzoneClassName = cn(
    "relative flex w-full flex-col items-center gap-6 rounded-2xl border border-dashed p-8",
    invalid
      ? "border-stroke-error-strong bg-fill-error-weak"
      : dragOver
        ? "border-stroke-brand-strong bg-fill-brand-weak"
        : "border-stroke-strong bg-fill-weaker",
    hasFiles && "rounded-b-none border-b-0",
  );

  return (
    <div
      className={cn("flex w-[364px] flex-col items-start gap-0", className)}
      {...rest}
    >
      <FieldHeader
        fieldId={fieldId}
        label={label}
        required={required}
        optional={optional}
        hint={hint}
        hintId={hintId}
        disabled={disabled}
      />
      {invalid && error ? <FieldError id={errorId} message={error} /> : null}
      <div className="flex w-full flex-col pt-6">
        <div
          className={dropzoneClassName}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            id={fieldId}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className="sr-only"
            onChange={(event) => {
              handleFiles(event.target.files);
              event.target.value = "";
            }}
            onDrop={handleDrop}
          />
          <IconContainer
            icon={<FeatherIcon name="upload" size={24} />}
            tone={invalid ? "destructive" : "brand"}
            variant="filled"
          />
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-small font-semibold leading-6 text-fg-strong">
              {dropzoneTitle}
            </p>
            {dropzoneDescription ? (
              <p className="text-tiny leading-5 text-fg-weak">
                {dropzoneDescription}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="secondary"
            tone={invalid ? "neutral" : "brand"}
            size="small"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            {browseLabel}
          </Button>
        </div>
        {hasFiles ? (
          <div
            className={cn(
              "w-full rounded-b-2xl border border-t-0 border-dashed px-8 pb-2",
              invalid
                ? "border-stroke-error-strong bg-fill-error-weak"
                : "border-stroke-strong bg-fill-weaker",
            )}
          >
            {files?.map((item) => (
              <FileUploadItemRow
                key={item.id}
                item={item}
                onRemove={onRemoveFile}
                disabled={disabled}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
