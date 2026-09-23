import { cn } from "../../lib/cn";

export interface TooltipCaretProps {
  className?: string;
  /** Flip to point upward (for top placements). */
  flip?: boolean;
}

/** Down-pointing caret matching Figma `_Tooltip arrow` (32×16). */
export function TooltipCaret({ className, flip = false }: TooltipCaretProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block h-4 w-8 shrink-0 text-fill-inverse-strong",
        flip && "rotate-180",
        className,
      )}
    >
      <svg
        viewBox="0 0 32 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="block size-full"
      >
        <path d="M31 0H1L16 14L31 0Z" />
      </svg>
    </span>
  );
}
