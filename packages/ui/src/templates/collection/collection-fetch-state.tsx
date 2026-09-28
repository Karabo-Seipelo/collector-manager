"use client";

import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { EmptyState } from "../../molecules/empty-state/empty-state";

export function CollectionLoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <p className="px-4 py-12 text-center text-small text-fg-weak md:px-8">{label}</p>
  );
}

export function CollectionErrorState({
  message = "Something went wrong loading your collection.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="px-4 py-8 md:px-8">
      <EmptyState
        headingLevel={2}
        title="Could not load data"
        description={message}
        icon={<FeatherIcon name="alert-circle" size={24} />}
        actions={
          onRetry ? (
            <Button variant="secondary" tone="neutral" onClick={onRetry}>
              Try again
            </Button>
          ) : undefined
        }
      />
    </div>
  );
}
