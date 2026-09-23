"use client";

import * as React from "react";

import { FeatherIcon } from "../../atoms/icon/icon";
import { TextLink } from "../../atoms/text-link/text-link";
import {
  getProgressIndicatorClassName,
  getProgressIndicatorHeaderClassName,
  getProgressIndicatorLabelClassName,
  getProgressIndicatorStepClassName,
  getProgressIndicatorStepsClassName,
} from "./progress-indicator-styles";

export interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  backLabel?: string;
  showBack?: boolean;
  label?: string;
  className?: string;
}

function clampStep(value: number, totalSteps: number) {
  return Math.min(totalSteps, Math.max(1, value));
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  onBack,
  backLabel = "Back",
  showBack = true,
  label,
  className,
}: ProgressIndicatorProps) {
  const labelId = React.useId();
  const safeTotalSteps = Math.max(1, totalSteps);
  const safeCurrentStep = clampStep(currentStep, safeTotalSteps);
  const canGoBack = safeCurrentStep > 1;
  const stepLabel = label ?? `Step ${safeCurrentStep} of ${safeTotalSteps}`;

  return (
    <div className={getProgressIndicatorClassName(className)}>
      <div className={getProgressIndicatorHeaderClassName()}>
        <p id={labelId} className={getProgressIndicatorLabelClassName()}>
          {stepLabel}
        </p>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={safeTotalSteps}
          aria-valuenow={safeCurrentStep}
          aria-labelledby={labelId}
          className={getProgressIndicatorStepsClassName()}
        >
          {Array.from({ length: safeTotalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const complete = stepNumber <= safeCurrentStep;

            return (
              <div
                key={stepNumber}
                aria-hidden="true"
                className={getProgressIndicatorStepClassName(complete)}
              />
            );
          })}
        </div>
      </div>

      {showBack ? (
        <TextLink
          href="#back"
          size="small"
          tone="brand"
          weight="bold"
          disabled={!canGoBack}
          iconLeft={<FeatherIcon name="arrow-left" size={20} />}
          onClick={(event) => {
            event.preventDefault();
            if (canGoBack) {
              onBack?.();
            }
          }}
        >
          {backLabel}
        </TextLink>
      ) : null}
    </div>
  );
}
