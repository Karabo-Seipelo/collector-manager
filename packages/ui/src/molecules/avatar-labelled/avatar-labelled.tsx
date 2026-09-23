import {
  Avatar,
  type AvatarSize,
  type AvatarType,
} from "../../atoms/avatar/avatar";
import { cn } from "../../lib/cn";

const layout: Record<AvatarSize, { gap: string; name: string }> = {
  small: {
    gap: "gap-2",
    name: "text-tiny leading-5",
  },
  medium: {
    gap: "gap-3",
    name: "text-small leading-6",
  },
  large: {
    gap: "gap-3",
    name: "text-small leading-6",
  },
};

export interface AvatarLabelledProps {
  name: string;
  description?: string;
  src?: string;
  alt?: string;
  type?: AvatarType;
  size?: AvatarSize;
  className?: string;
}

export function AvatarLabelled({
  name,
  description,
  src,
  alt,
  type,
  size = "medium",
  className,
}: AvatarLabelledProps) {
  const l = layout[size];

  return (
    <div className={cn("inline-flex items-center font-body", l.gap, className)}>
      <Avatar
        name={name}
        src={src}
        alt={alt}
        type={type}
        size={size}
        aria-hidden="true"
      />
      <div className="flex min-w-0 flex-col items-start">
        <span className={cn("w-full font-normal text-fg-strong", l.name)}>
          {name}
        </span>
        {description ? (
          <span className="w-full text-tiny font-normal leading-5 text-fg-weak">
            {description}
          </span>
        ) : null}
      </div>
    </div>
  );
}
