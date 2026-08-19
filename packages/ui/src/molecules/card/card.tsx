import { type JSX } from "react";

import { cn } from "../../lib/cn";

export function Card({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}): JSX.Element {
  return (
    <a
      className={cn(
        "block rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600",
        className,
      )}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2 className="mb-2 text-xl font-semibold">
        {title} <span className="text-zinc-400">-&gt;</span>
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400">{children}</p>
    </a>
  );
}
