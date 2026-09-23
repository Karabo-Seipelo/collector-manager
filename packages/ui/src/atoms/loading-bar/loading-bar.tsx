"use client";

import * as React from "react";

import {
  getLoadingBarClassName,
  getLoadingBarFillClassName,
  getLoadingBarLabelClassName,
  getLoadingBarTrackClassName,
} from "./loading-bar-styles";

function clampValue(value: number) {
  return Math.min(100, Math.max(0, value));
}

function defaultFormatLabel(value: number) {
  return `${Math.round(value)}%`;
}

export interface LoadingBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  showLabel?: boolean;
  formatLabel?: (value: number) => string;
}

export function LoadingBar({
  value,
  showLabel = true,
  formatLabel = defaultFormatLabel,
  className,
  ...rest
}: LoadingBarProps) {
  const clamped = clampValue(value);
  const label = formatLabel(clamped);
  const labelId = React.useId();

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-valuetext={label}
      aria-labelledby={showLabel ? labelId : undefined}
      className={getLoadingBarClassName({ showLabel, className })}
      {...rest}
    >
      <div className={getLoadingBarTrackClassName()}>
        <div
          className={getLoadingBarFillClassName()}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel ? (
        <p id={labelId} className={getLoadingBarLabelClassName()}>
          {label}
        </p>
      ) : null}
    </div>
  );
}
