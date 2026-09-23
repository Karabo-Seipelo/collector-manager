import { LoadingBar } from "../../atoms/loading-bar/loading-bar";

export interface FileUploadProgressProps {
  value: number;
  className?: string;
}

export function FileUploadProgress({
  value,
  className,
}: FileUploadProgressProps) {
  return <LoadingBar value={value} showLabel={false} className={className} />;
}
