"use client";

import * as React from "react";

import { Button } from "../../atoms/button/button";
import { Divider } from "../../atoms/divider/divider";
import { ImagePlaceholder } from "../../atoms/image-placeholder/image-placeholder";
import { TextLink } from "../../atoms/text-link/text-link";
import { Select } from "../../molecules/select/select";
import { TextArea } from "../../molecules/text-area/text-area";
import { TextField } from "../../molecules/text-field/text-field";
import { FileUpload } from "../../organisms/file-upload/file-upload";

const categoryOptions = [
  { value: "", label: "Select category" },
  { value: "vinyl", label: "Vinyl" },
  { value: "books", label: "Books" },
  { value: "cards", label: "Trading cards" },
  { value: "sneakers", label: "Sneakers" },
  { value: "cameras", label: "Cameras" },
  { value: "watches", label: "Watches" },
];

const conditionOptions = [
  { value: "", label: "Select condition" },
  { value: "nm", label: "Near mint (NM)" },
  { value: "vg-plus", label: "Very good plus (VG+)" },
  { value: "vg", label: "Very good (VG)" },
  { value: "good", label: "Good" },
];

function FormRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
  );
}

function AddItemPreview({
  name,
  categoryLabel,
  year,
  conditionLabel,
  photoUrl,
}: {
  name: string;
  categoryLabel: string;
  year: string;
  conditionLabel: string;
  photoUrl?: string;
}) {
  const title = name.trim() || "Untitled item";
  const metaParts = [
    categoryLabel || "Category",
    year.trim() || "year",
    conditionLabel || "condition",
  ];

  return (
    <aside className="flex w-full flex-col gap-3 rounded-xl bg-fill-weaker p-5 xl:w-[340px] xl:shrink-0">
      <p className="text-tiny font-semibold uppercase tracking-[2px] text-fg-weak">
        Preview
      </p>
      <div className="flex h-[200px] items-center justify-center overflow-hidden rounded-lg bg-fill-weak">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt=""
            className="size-full object-cover"
          />
        ) : (
          <ImagePlaceholder size={32} />
        )}
      </div>
      <p className="text-heading-4 font-semibold text-fg-strong">{title}</p>
      <p className="text-small text-fg-weak">{metaParts.join(" · ")}</p>
      <Divider />
      <p className="text-tiny leading-5 text-fg-weak">
        Tip: scanning a barcode fills in the title, year and catalogue number
        automatically.
      </p>
    </aside>
  );
}

export interface CollectionAddItemContentProps {
  onCancel?: () => void;
  onSave?: () => void;
  onSaveAndAddAnother?: () => void;
}

export function CollectionAddItemContent({
  onCancel,
  onSave,
  onSaveAndAddAnother,
}: CollectionAddItemContentProps) {
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [year, setYear] = React.useState("");
  const [catalogue, setCatalogue] = React.useState("");
  const [purchasePrice, setPurchasePrice] = React.useState("");
  const [dateAcquired, setDateAcquired] = React.useState("");
  const [storageLocation, setStorageLocation] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [previewPhotoUrl, setPreviewPhotoUrl] = React.useState<string>();

  React.useEffect(() => {
    return () => {
      if (previewPhotoUrl) {
        URL.revokeObjectURL(previewPhotoUrl);
      }
    };
  }, [previewPhotoUrl]);

  const categoryLabel =
    categoryOptions.find((option) => option.value === category)?.label ?? "";
  const conditionLabel =
    conditionOptions.find((option) => option.value === condition)?.label ?? "";

  const handleFilesSelected = (files: FileList) => {
    const file = files[0];
    if (!file) {
      return;
    }
    setPreviewPhotoUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return URL.createObjectURL(file);
    });
  };

  return (
    <div className="mx-auto w-full px-4 py-6 md:px-8 md:py-7">
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-heading-2 font-semibold text-fg-strong">Add item</h1>
        <p className="text-small text-fg-weak">
          Scan a barcode, drop in photos, or fill it in by hand
        </p>
      </header>

      <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
        <form
          className="flex min-w-0 flex-1 flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSave?.();
          }}
        >
          <FileUpload
            label="Photos"
            optional
            className="w-full max-w-none [&>div]:w-full"
            accept="image/png,image/jpeg"
            multiple
            dropzoneTitle="Drop photos here, or scan a barcode"
            dropzoneDescription="PNG or JPG up to 10 MB · we autofill what we can"
            browseLabel="Browse photos"
            onFilesSelected={handleFilesSelected}
          />

          <TextField
            label="Item name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="off"
          />

          <FormRow>
            <Select
              label="Category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Select
              label="Condition"
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
            >
              {conditionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormRow>

          <FormRow>
            <TextField
              label="Year"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              inputMode="numeric"
            />
            <TextField
              label="Catalogue / serial no."
              value={catalogue}
              onChange={(event) => setCatalogue(event.target.value)}
            />
          </FormRow>

          <FormRow>
            <TextField
              label="Purchase price"
              value={purchasePrice}
              onChange={(event) => setPurchasePrice(event.target.value)}
            />
            <TextField
              label="Date acquired"
              value={dateAcquired}
              onChange={(event) => setDateAcquired(event.target.value)}
              placeholder="DD / MM / YYYY"
            />
          </FormRow>

          <TextField
            label="Storage location"
            value={storageLocation}
            onChange={(event) => setStorageLocation(event.target.value)}
          />

          <TextArea
            label="Notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={6}
            className="w-full max-w-none"
          />

          <Divider className="mt-2" />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <TextLink
              href="#cancel"
              size="small"
              tone="neutral-weak"
              weight="bold"
              className="text-center sm:mr-auto sm:text-left"
              onClick={(event) => {
                event.preventDefault();
                onCancel?.();
              }}
            >
              Cancel
            </TextLink>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                tone="neutral"
                onClick={onSaveAndAddAnother}
              >
                Save & add another
              </Button>
              <Button type="submit">Save item</Button>
            </div>
          </div>
        </form>

        <AddItemPreview
          name={name}
          categoryLabel={categoryLabel}
          year={year}
          conditionLabel={conditionLabel}
          photoUrl={previewPhotoUrl}
        />
      </div>
    </div>
  );
}
