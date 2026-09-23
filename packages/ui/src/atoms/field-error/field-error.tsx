import { FeatherIcon } from "../icon/icon";
import { cn } from "../../lib/cn";

export interface FieldErrorProps {
  id?: string;
  message: string;
  className?: string;
}

export function FieldError({ id, message, className }: FieldErrorProps) {
  return (
    <p
      id={id}
      role="alert"
      className={cn(
        "flex items-center gap-2 py-1 text-sm font-semibold leading-5 text-text-error",
        className,
      )}
    >
      <span className="text-icon-error">
        <FeatherIcon name="alert-octagon" size={24} />
      </span>
      {message}
    </p>
  );
}
