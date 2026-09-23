import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, userEvent, within } from "storybook/test";

import { withWidth } from "../../../.storybook/decorators";
import {
  FileUpload,
  type FileUploadItemData,
} from "./file-upload";

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes}B`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)}KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function useFileUploadState(initial: FileUploadItemData[] = []) {
  const [files, setFiles] = React.useState(initial);

  const handleFilesSelected = (fileList: FileList) => {
    const next = Array.from(fileList).map((file, index) => ({
      id: `${file.name}-${Date.now()}-${index}`,
      name: file.name,
      sizeLabel: formatFileSize(file.size),
      progress: 35,
      status: "uploading" as const,
    }));

    setFiles((current) => [...current, ...next]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((current) => current.filter((file) => file.id !== id));
  };

  return { files, handleFilesSelected, handleRemoveFile, setFiles };
}

function FileUploadWithFilesExample() {
  const { files, handleFilesSelected, handleRemoveFile } = useFileUploadState([
    {
      id: "uploaded-1",
      name: "File.pdf",
      sizeLabel: "250KB",
      href: "#file-1",
      status: "uploaded",
    },
    {
      id: "uploading-1",
      name: "File.pdf",
      sizeLabel: "250KB",
      progress: 75,
      status: "uploading",
    },
  ]);

  return (
    <FileUpload
      label="Label"
      hint="Hint text"
      required
      multiple
      dropzoneDescription="Maximum file size is 5MB"
      files={files}
      onFilesSelected={handleFilesSelected}
      onRemoveFile={handleRemoveFile}
    />
  );
}

function InteractiveFileUploadExample() {
  const { files, handleFilesSelected, handleRemoveFile } = useFileUploadState();

  return (
    <FileUpload
      label="Attachments"
      hint="Upload PDF or image files"
      optional
      multiple
      accept=".pdf,image/*"
      dropzoneDescription="Maximum file size is 5MB"
      files={files}
      onFilesSelected={handleFilesSelected}
      onRemoveFile={handleRemoveFile}
    />
  );
}

const meta = {
  title: "Organisms/FileUpload",
  component: FileUpload,
  decorators: [withWidth("364px")],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Drag-and-drop file upload field with optional file list, upload progress, and validation states.",
      },
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    hint: "Hint text",
    required: true,
    dropzoneDescription: "Maximum file size is 5MB",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Drag and drop files here")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Browse files" })).toBeVisible();
  },
};

export const Invalid: Story = {
  args: {
    label: "Label",
    hint: "Hint text",
    required: true,
    error: "Error message",
    dropzoneDescription: "Maximum file size is 5MB",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toHaveTextContent("Error message");
  },
};

export const WithFiles: Story = {
  args: {
    label: "Label",
    hint: "Hint text",
    required: true,
    dropzoneDescription: "Maximum file size is 5MB",
  },
  render: () => <FileUploadWithFilesExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("link", { name: "File.pdf" })).toBeVisible();
    await expect(canvas.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "75",
    );
  },
};

export const Interactive: Story = {
  args: {
    label: "Attachments",
    hint: "Upload PDF or image files",
    optional: true,
    dropzoneDescription: "Maximum file size is 5MB",
  },
  render: () => <InteractiveFileUploadExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const browseButton = canvas.getByRole("button", { name: "Browse files" });
    await userEvent.click(browseButton);
  },
};
