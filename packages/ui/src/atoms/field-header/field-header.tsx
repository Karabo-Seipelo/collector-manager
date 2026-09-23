import { cn } from "../../lib/cn";

export interface FieldHeaderProps {
  fieldId: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  hintId?: string;
  disabled?: boolean;
}

export function FieldHeader({
  fieldId,
  label,
  required = false,
  optional = false,
  hint,
  hintId,
  disabled = false,
}: FieldHeaderProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-1">
        <label
          htmlFor={fieldId}
          className={cn(
            "text-base leading-6",
            disabled ? "text-text-disabled" : "text-fg-strong",
          )}
        >
          {label}
        </label>
        {required ? (
          <span
            aria-hidden="true"
            className={cn(
              "text-base leading-6",
              disabled ? "text-text-disabled" : "text-fg-weak",
            )}
          >
            *
          </span>
        ) : null}
        {optional ? (
          <span className="text-sm leading-5 text-fg-weak">(optional)</span>
        ) : null}
      </div>
      {hint ? (
        <p id={hintId} className="text-sm leading-5 text-fg-weak">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
