export type TypographyToken = {
  name: string;
  utilityClass: string;
  weight: "semibold" | "normal";
  tracking?: string;
  desktop: { size: string; lineHeight: string };
  mobile: { size: string; lineHeight: string };
  /** Desktop preview classes (includes size utilities). */
  previewClassName: string;
};

export const typographyTokens: TypographyToken[] = [
  {
    name: "Display",
    utilityClass: "text-display",
    weight: "semibold",
    tracking: "tracking-[-1px]",
    desktop: { size: "56px", lineHeight: "64px" },
    mobile: { size: "40px", lineHeight: "48px" },
    previewClassName:
      "text-display font-semibold tracking-[-1px] text-fg-strong",
  },
  {
    name: "Heading 1",
    utilityClass: "text-heading-1",
    weight: "semibold",
    tracking: "tracking-[-0.5px]",
    desktop: { size: "40px", lineHeight: "48px" },
    mobile: { size: "36px", lineHeight: "44px" },
    previewClassName:
      "text-heading-1 font-semibold tracking-[-0.5px] text-fg-strong",
  },
  {
    name: "Heading 2",
    utilityClass: "text-heading-2",
    weight: "semibold",
    tracking: "tracking-[-0.5px]",
    desktop: { size: "32px", lineHeight: "40px" },
    mobile: { size: "28px", lineHeight: "36px" },
    previewClassName:
      "text-heading-2 font-semibold tracking-[-0.5px] text-fg-strong",
  },
  {
    name: "Heading 3",
    utilityClass: "text-heading-3",
    weight: "semibold",
    desktop: { size: "24px", lineHeight: "32px" },
    mobile: { size: "24px", lineHeight: "32px" },
    previewClassName: "text-heading-3 font-semibold text-fg-strong",
  },
  {
    name: "Heading 4",
    utilityClass: "text-heading-4",
    weight: "semibold",
    desktop: { size: "20px", lineHeight: "28px" },
    mobile: { size: "20px", lineHeight: "28px" },
    previewClassName: "text-heading-4 font-semibold text-fg-strong",
  },
  {
    name: "Small",
    utilityClass: "text-small",
    weight: "normal",
    desktop: { size: "16px", lineHeight: "24px" },
    mobile: { size: "16px", lineHeight: "24px" },
    previewClassName: "text-small font-normal text-fg-strong",
  },
  {
    name: "Tiny",
    utilityClass: "text-tiny",
    weight: "normal",
    desktop: { size: "14px", lineHeight: "20px" },
    mobile: { size: "14px", lineHeight: "20px" },
    previewClassName: "text-tiny font-normal text-fg-strong",
  },
];

export function typographyClassHint(token: TypographyToken): string {
  const parts = [token.utilityClass, `font-${token.weight}`];
  if (token.tracking) {
    parts.push(token.tracking);
  }
  return parts.join(" ");
}
