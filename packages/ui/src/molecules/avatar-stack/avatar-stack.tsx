import { Avatar, type AvatarSize, type AvatarType } from "../../atoms/avatar/avatar";
import { cn } from "../../lib/cn";

export interface AvatarStackPerson {
  name: string;
  src?: string;
  alt?: string;
  type?: AvatarType;
}

export interface AvatarStackProps {
  people: AvatarStackPerson[];
  size?: AvatarSize;
  max?: number;
  className?: string;
}

const overlap: Record<AvatarSize, string> = {
  small: "-ml-2",
  medium: "-ml-3",
  large: "-ml-4",
};

function formatOverflow(count: number): string {
  if (count >= 99) {
    return "99+";
  }
  return `${count}+`;
}

function stackLabel(people: AvatarStackPerson[]): string {
  const first = people[0];
  if (!first) {
    return "No people";
  }
  if (people.length === 1) {
    return first.name;
  }
  return `${first.name} and ${people.length - 1} others`;
}

export function AvatarStack({
  people,
  size = "medium",
  max = 5,
  className,
}: AvatarStackProps) {
  const visible = people.slice(0, max);
  const remaining = people.length - visible.length;

  return (
    <div
      role="group"
      aria-label={stackLabel(people)}
      className={cn("inline-flex items-center", className)}
    >
      {visible.map((person, index) => (
        <span
          key={`${person.name}-${index}`}
          className={cn(
            "relative rounded-full border-2 border-fill-inverse bg-fill-inverse",
            index > 0 && overlap[size],
          )}
          style={{ zIndex: index }}
        >
          <Avatar {...person} size={size} aria-hidden="true" />
        </span>
      ))}
      {remaining > 0 ? (
        <span
          className={cn(
            "relative rounded-full border-2 border-fill-inverse bg-fill-inverse",
            visible.length > 0 && overlap[size],
          )}
          style={{ zIndex: visible.length }}
        >
          <Avatar
            name={formatOverflow(remaining)}
            initials={formatOverflow(remaining)}
            size={size}
            aria-hidden="true"
          />
        </span>
      ) : null}
    </div>
  );
}
