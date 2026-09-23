import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FileUpload, type FileUploadItemData } from "./file-upload";

const sampleFiles: FileUploadItemData[] = [
  {
    id: "1",
    name: "File.pdf",
    sizeLabel: "250KB",
    href: "#file-1",
    status: "uploaded",
  },
  {
    id: "2",
    name: "File.pdf",
    sizeLabel: "250KB",
    progress: 75,
    status: "uploading",
  },
];

describe("FileUpload", () => {
  it("renders the drop zone with label, hint, and browse control", () => {
    render(
      <FileUpload
        label="Attachments"
        hint="Hint text"
        dropzoneDescription="Maximum file size is 5MB"
      />,
    );

    expect(screen.getByText("Attachments")).toBeVisible();
    expect(screen.getByText("Hint text")).toBeVisible();
    expect(screen.getByText("Drag and drop files here")).toBeVisible();
    expect(screen.getByRole("button", { name: "Browse files" })).toBeVisible();
  });

  it("shows an error message and invalid drop zone styling", () => {
    render(
      <FileUpload
        label="Attachments"
        error="Error message"
        dropzoneDescription="Maximum file size is 5MB"
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Error message");
    expect(screen.getByLabelText("Attachments")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("renders uploaded and uploading file rows", () => {
    render(
      <FileUpload
        label="Attachments"
        files={sampleFiles}
        onRemoveFile={vi.fn()}
      />,
    );

    expect(screen.getByRole("link", { name: "File.pdf" })).toBeVisible();
    expect(screen.getAllByText("250KB")).toHaveLength(2);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75");
  });

  it("opens the hidden file input from the browse button", async () => {
    const user = userEvent.setup();
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, "click");

    render(<FileUpload label="Attachments" />);
    await user.click(screen.getByRole("button", { name: "Browse files" }));

    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it("calls onFilesSelected when files are dropped", () => {
    const onFilesSelected = vi.fn();
    render(
      <FileUpload label="Attachments" onFilesSelected={onFilesSelected} />,
    );

    const input = screen.getByLabelText("Attachments");
    const file = new File(["hello"], "hello.pdf", { type: "application/pdf" });
    fireEvent.drop(input, {
      dataTransfer: { files: [file], types: ["Files"] },
    });

    expect(onFilesSelected).toHaveBeenCalled();
  });

  it("calls onRemoveFile when removing a listed file", async () => {
    const user = userEvent.setup();
    const onRemoveFile = vi.fn();

    render(
      <FileUpload
        label="Attachments"
        files={sampleFiles}
        onRemoveFile={onRemoveFile}
      />,
    );

    await user.click(
      screen.getAllByRole("button", { name: "Remove File.pdf" })[0]!,
    );
    expect(onRemoveFile).toHaveBeenCalledWith("1");
  });
});
