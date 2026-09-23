---
sidebar_position: 7.6
---

# File upload

Drag-and-drop file upload field with label, hint, validation, and an optional file list showing upload progress or completed files.

**Import:** `@repo/ui/molecules/file-upload`

**Storybook:** Molecules/FileUpload

## Usage

```tsx
import {
  FileUpload,
  type FileUploadItemData,
} from "@repo/ui/molecules/file-upload";

const [files, setFiles] = useState<FileUploadItemData[]>([]);

<FileUpload
  label="Attachments"
  hint="Upload PDF or image files"
  required
  multiple
  accept=".pdf,image/*"
  dropzoneDescription="Maximum file size is 5MB"
  files={files}
  onFilesSelected={(fileList) => {
    // Start uploads and append items with status "uploading"
  }}
  onRemoveFile={(id) => {
    setFiles((current) => current.filter((file) => file.id !== id));
  }}
/>
```

Manage file state in the parent. Use `status: "uploading"` with `progress` (0–100) while uploading, then switch to `status: "uploaded"` with an optional `href` when complete.

## Props

| Prop                  | Type                              | Default                         | Description                                      |
| --------------------- | --------------------------------- | ------------------------------- | ------------------------------------------------ |
| `label`               | `string`                          | —                               | Field label (required)                           |
| `required`            | `boolean`                         | `false`                         | Shows required indicator                         |
| `optional`            | `boolean`                         | `false`                         | Shows optional indicator                         |
| `hint`                | `string`                          | —                               | Helper text below the label                      |
| `error`               | `string`                          | —                               | Validation message; styles drop zone as invalid  |
| `disabled`            | `boolean`                         | `false`                         | Disables browse, drop, and remove actions        |
| `accept`              | `string`                          | —                               | Native file input accept attribute               |
| `multiple`            | `boolean`                         | `false`                         | Allow selecting multiple files                   |
| `dropzoneTitle`       | `string`                          | `"Drag and drop files here"`    | Primary drop zone copy                           |
| `dropzoneDescription` | `string`                          | —                               | Secondary drop zone copy (e.g. max file size)    |
| `browseLabel`         | `string`                          | `"Browse files"`                | Browse button label                              |
| `files`               | `FileUploadItemData[]`            | —                               | Listed files below the drop zone                 |
| `onFilesSelected`     | `(files: FileList) => void`       | —                               | Called when files are dropped or browsed         |
| `onRemoveFile`        | `(id: string) => void`            | —                               | Called when a file row remove button is clicked  |
| `id`                  | `string`                          | auto-generated                  | Root field id for label association              |

### FileUploadItemData

| Prop         | Type                         | Description                                           |
| ------------ | ---------------------------- | ----------------------------------------------------- |
| `id`         | `string`                     | Stable key for the row                                |
| `name`       | `string`                     | Display filename                                      |
| `sizeLabel`  | `string`                     | Human-readable size (e.g. `"250KB"`)                  |
| `href`       | `string`                     | Link target when uploaded                             |
| `progress`   | `number`                     | Upload progress 0–100 when `status` is `"uploading"`  |
| `status`     | `"uploading"` \| `"uploaded"` | Row state                                          |

## Layout

- Field width: 364px (matches other form fields)
- Drop zone: dashed border, 16px radius, 32px padding, brand upload icon
- File list: connected below drop zone with row dividers and remove actions
- Uploading rows show an inline progress bar between metadata and remove button

## Accessibility

- Label is associated with the hidden file input via `htmlFor` / `id`
- Error message uses `role="alert"` via `FieldError`
- Invalid state sets `aria-invalid` on the input
- Hint and error text are linked with `aria-describedby`
- Progress bar exposes `role="progressbar"` with `aria-valuenow`
- Remove buttons include `aria-label` with the filename
