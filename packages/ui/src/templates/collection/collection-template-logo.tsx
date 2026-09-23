export function CollectionTemplateLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-small font-semibold text-primary-foreground"
      >
        C
      </span>
      {!compact ? (
        <span className="text-heading-4 font-semibold text-fg-strong">Collector</span>
      ) : null}
    </div>
  );
}
