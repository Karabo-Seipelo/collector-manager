"use client";

/** Bottom-half decorative grid from Practical UI login templates (Figma `_Grid`). */
export function AuthPageGridDecoration({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={
        className ??
        "pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rotate-180 opacity-70 [mask-image:linear-gradient(to_top,black,transparent)]"
      }
      style={{
        backgroundImage: `
          linear-gradient(to right, var(--color-stroke-weak) 1px, transparent 1px),
          linear-gradient(to bottom, var(--color-stroke-weak) 1px, transparent 1px)
        `,
        backgroundSize: "16px 16px",
      }}
    />
  );
}
