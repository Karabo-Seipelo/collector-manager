import * as React from "react";

import { FeatherIcon, type FeatherIconName } from "../icon/icon";
import { cn } from "../../lib/cn";

export type AlertTone =
  | "error"
  | "warning"
  | "success"
  | "information"
  | "neutral"
  | "brand"
  | "inverse-neutral"
  | "inverse-brand";

export type AlertSize = "large" | "small";
export type AlertLayout = "horizontal" | "vertical";

const tones: Record<
  AlertTone,
  {
    root: string;
    bar: string;
    icon: string;
    heading: string;
    body: string;
    close: string;
  }
> = {
  error: {
    root: "border-stroke-error-weak bg-fill-error-weak",
    bar: "bg-stroke-error-strong",
    icon: "text-icon-error",
    heading: "text-fg-strong",
    body: "text-fg-weak",
    close: "text-icon-neutral",
  },
  warning: {
    root: "border-stroke-warning-weak bg-fill-warning-weak",
    bar: "bg-stroke-warning-strong",
    icon: "text-icon-warning",
    heading: "text-fg-strong",
    body: "text-fg-weak",
    close: "text-icon-neutral",
  },
  success: {
    root: "border-stroke-success-weak bg-fill-success-weak",
    bar: "bg-stroke-success-strong",
    icon: "text-icon-success",
    heading: "text-fg-strong",
    body: "text-fg-weak",
    close: "text-icon-neutral",
  },
  information: {
    root: "border-stroke-information-weak bg-fill-information-weak",
    bar: "bg-stroke-information-strong",
    icon: "text-icon-information",
    heading: "text-fg-strong",
    body: "text-fg-weak",
    close: "text-icon-neutral",
  },
  neutral: {
    root: "border-stroke-weak bg-fill-weaker",
    bar: "bg-stroke-strong",
    icon: "text-icon-neutral",
    heading: "text-fg-strong",
    body: "text-fg-weak",
    close: "text-icon-neutral",
  },
  brand: {
    root: "border-stroke-brand-weak bg-fill-brand-weak",
    bar: "bg-stroke-brand-strong",
    icon: "text-icon-brand",
    heading: "text-fg-strong",
    body: "text-fg-weak",
    close: "text-icon-neutral",
  },
  "inverse-neutral": {
    root: "border-transparent bg-fill-inverse-strong",
    bar: "bg-stroke-inverse-strong",
    icon: "text-icon-inverse",
    heading: "text-text-inverse-strong",
    body: "text-text-inverse-weak",
    close: "text-icon-inverse",
  },
  "inverse-brand": {
    root: "border-transparent bg-primary",
    bar: "bg-stroke-inverse-strong",
    icon: "text-icon-inverse",
    heading: "text-text-inverse-strong",
    body: "text-text-inverse-weak",
    close: "text-icon-inverse",
  },
};

const icons: Record<AlertTone, FeatherIconName> = {
  error: "x-circle",
  warning: "alert-triangle",
  success: "check-circle",
  information: "info",
  neutral: "circle",
  brand: "circle",
  "inverse-neutral": "circle",
  "inverse-brand": "circle",
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
  size?: AlertSize;
  layout?: AlertLayout;
  heading?: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Alert({
  tone = "error",
  size = "large",
  layout = "horizontal",
  heading,
  icon,
  onClose,
  closeLabel = "Dismiss",
  aside,
  footer,
  className,
  children,
  ...rest
}: AlertProps) {
  const t = tones[tone];
  const large = size === "large";
  const vertical = layout === "vertical";
  const urgent = tone === "error" || tone === "warning";

  return (
    <div
      role={urgent ? "alert" : "status"}
      className={cn(
        "relative overflow-hidden rounded-card border",
        large ? "p-6 pl-7" : "p-4 pl-5",
        t.root,
        className,
      )}
      {...rest}
    >
      <span
        data-testid="alert-bar"
        aria-hidden="true"
        className={cn("absolute inset-y-0 left-0 w-1 rounded-l-card", t.bar)}
      />
      <div
        data-testid="alert-body"
        className={cn("flex", vertical ? "flex-col gap-3" : "flex-row gap-3")}
      >
        {vertical ? (
          <div className="flex items-start gap-3">
            {icon !== null ? (
              <span
                aria-hidden="true"
                className={cn("inline-flex size-6 shrink-0", t.icon)}
              >
                {icon ?? <FeatherIcon name={icons[tone]} size={24} />}
              </span>
            ) : null}
            <span className="min-w-0 flex-1" />
            {aside}
            {onClose ? (
              <CloseButton
                label={closeLabel}
                className={t.close}
                onClose={onClose}
              />
            ) : null}
          </div>
        ) : icon !== null ? (
          <span
            aria-hidden="true"
            className={cn("inline-flex size-6 shrink-0", t.icon)}
          >
            {icon ?? <FeatherIcon name={icons[tone]} size={24} />}
          </span>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "min-w-0 flex-1",
                large ? "space-y-0.5" : "space-y-1",
              )}
            >
              {heading != null ? (
                <p
                  className={`font-semibold ${
                    large ? "text-heading-4" : "text-tiny"
                  } ${t.heading}`}
                >
                  {heading}
                </p>
              ) : null}
              {children != null ? (
                <div
                  className={`${large ? "text-small" : "text-tiny"} ${t.body}`}
                >
                  {children}
                </div>
              ) : null}
            </div>
            {vertical ? null : aside}
            {!vertical && onClose ? (
              <CloseButton
                label={closeLabel}
                className={t.close}
                onClose={onClose}
              />
            ) : null}
          </div>
          {footer != null ? (
            <div className={cn("mt-4", t.body)}>{footer}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CloseButton({
  label,
  className,
  onClose,
}: {
  label: string;
  className: string;
  onClose: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClose}
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus",
        className,
      )}
    >
      <FeatherIcon name="x" size={24} />
    </button>
  );
}
