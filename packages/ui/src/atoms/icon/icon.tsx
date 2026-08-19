import feather from "feather-icons";

export type FeatherIconName = keyof typeof feather.icons;

export interface FeatherIconProps {
  name: FeatherIconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function FeatherIcon({
  name,
  className,
  size = 24,
  strokeWidth = 2,
}: FeatherIconProps) {
  const icon = feather.icons[name];

  if (!icon) {
    return null;
  }

  return (
    <svg
      xmlns={icon.attrs.xmlns}
      width={size}
      height={size}
      viewBox={icon.attrs.viewBox}
      fill={icon.attrs.fill}
      stroke={icon.attrs.stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={icon.attrs["stroke-linecap"] as "round" | "butt" | "square" | "inherit"}
      strokeLinejoin={icon.attrs["stroke-linejoin"] as "round" | "bevel" | "miter" | "inherit"}
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icon.contents }}
    />
  );
}
