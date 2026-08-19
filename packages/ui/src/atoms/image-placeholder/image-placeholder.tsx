import { cn } from "../../lib/cn";

const IMAGE_PLACEHOLDER_ICON =
  "https://www.figma.com/api/mcp/asset/80070997-6063-411d-a411-ca83dccfe555.svg";

export interface ImagePlaceholderProps {
  className?: string;
  size?: number;
}

export function ImagePlaceholder({
  className,
  size = 30,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn("relative shrink-0 overflow-hidden", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <img
        src={IMAGE_PLACEHOLDER_ICON}
        alt=""
        className="block h-full w-full max-w-none object-contain"
      />
    </div>
  );
}
