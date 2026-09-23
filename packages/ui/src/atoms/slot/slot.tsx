import * as React from "react";

import { cn } from "../../lib/cn";

export interface SlotProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function Slot({
  label = "Swap with another component",
  children,
  className,
  ...rest
}: SlotProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center overflow-hidden rounded-lg border border-dashed border-stroke-strong bg-fill-weaker px-8 py-6",
        className,
      )}
      {...rest}
    >
      {children ?? (
        <p
          aria-hidden="true"
          className="w-full break-words text-center font-mono text-[length:var(--text-tiny)] leading-normal text-fg-weak"
        >
          {label}
        </p>
      )}
    </div>
  );
}
