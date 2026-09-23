import { cn } from "../../lib/cn";

export interface FileUploadProgressProps {
  value: number;
  className?: string;
}

export function FileUploadProgress({
  value,
  className,
}: FileUploadProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full border border-stroke-weak bg-fill-weak shadow-sunken",
        className,
      )}
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-primary"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
