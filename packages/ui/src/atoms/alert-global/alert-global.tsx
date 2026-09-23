import * as React from "react";

import { type AlertTone } from "../alert/alert";
import { FeatherIcon, type FeatherIconName } from "../icon/icon";
import { cn } from "../../lib/cn";

export type { AlertTone };

export type AlertGlobalDevice = "desktop" | "mobile";

const tones: Record<
  AlertTone,
  { root: string; icon: string; text: string; close: string }
> = {
  error: {
    root: "border-stroke-error-weak bg-fill-error-weak",
    icon: "text-icon-error",
    text: "text-fg-strong",
    close: "text-icon-neutral",
  },
  warning: {
    root: "border-stroke-warning-weak bg-fill-warning-weak",
    icon: "text-icon-warning",
    text: "text-fg-strong",
    close: "text-icon-neutral",
  },
  success: {
    root: "border-stroke-success-weak bg-fill-success-weak",
    icon: "text-icon-success",
    text: "text-fg-strong",
    close: "text-icon-neutral",
  },
  information: {
    root: "border-stroke-information-weak bg-fill-information-weak",
    icon: "text-icon-information",
    text: "text-fg-strong",
    close: "text-icon-neutral",
  },
  neutral: {
    root: "border-stroke-weak bg-fill-weaker",
    icon: "text-icon-neutral",
    text: "text-fg-strong",
    close: "text-icon-neutral",
  },
  brand: {
    root: "border-stroke-brand-weak bg-fill-brand-weak",
    icon: "text-icon-brand",
    text: "text-fg-strong",
    close: "text-icon-neutral",
  },
  "inverse-neutral": {
    root: "border-transparent bg-fill-inverse-strong",
    icon: "text-icon-inverse",
    text: "text-text-inverse-strong",
    close: "text-icon-inverse",
  },
  "inverse-brand": {
    root: "border-transparent bg-primary",
    icon: "text-icon-inverse",
    text: "text-text-inverse-strong",
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

export interface AlertGlobalProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
  device?: AlertGlobalDevice;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
}

export function AlertGlobal({
  tone = "error",
  device = "desktop",
  icon,
  action,
  onClose,
  closeLabel = "Dismiss",
  className,
  children,
  ...rest
}: AlertGlobalProps) {
  const t = tones[tone];
  const mobile = device === "mobile";
  const urgent = tone === "error" || tone === "warning";

  const iconNode =
    icon === null ? null : (
      <span
        aria-hidden="true"
        className={cn("inline-flex size-6 shrink-0", t.icon)}
      >
        {icon ?? <FeatherIcon name={icons[tone]} size={24} />}
      </span>
    );

  const closeNode = onClose ? (
    <button
      type="button"
      aria-label={closeLabel}
      onClick={onClose}
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus",
        t.close,
      )}
    >
      <FeatherIcon name="x" size={24} />
    </button>
  ) : null;

  return (
    <div
      role={urgent ? "alert" : "status"}
      className={cn(
        "flex w-full border",
        mobile
          ? "min-h-[100px] items-start gap-3 px-8 py-4"
          : "min-h-14 items-center gap-6 px-6",
        t.root,
        className,
      )}
      {...rest}
    >
      {mobile ? iconNode : null}
      <div
        data-testid="alert-global-body"
        className={cn(
          "flex min-w-0 flex-1",
          mobile ? "flex-col gap-3" : "flex-row items-center gap-3",
        )}
      >
        {mobile ? null : iconNode}
        {children != null ? (
          <p className={`text-tiny ${t.text}`}>{children}</p>
        ) : null}
        {mobile ? action : null}
      </div>
      {mobile ? null : action}
      {closeNode}
    </div>
  );
}
