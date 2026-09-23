import { cn } from "../../lib/cn";

export type TestimonialAlign = "left" | "center";

export function getTestimonialClassName({
  align,
  className,
}: {
  align: TestimonialAlign;
  className?: string;
}) {
  return cn(
    "flex w-full max-w-[364px] flex-col gap-6 font-body",
    align === "center" ? "items-center" : "items-start",
    className,
  );
}

export function getTestimonialQuoteClassName(align: TestimonialAlign) {
  return cn(
    "w-full text-small font-normal leading-6 text-fg-weak [word-break:break-word]",
    align === "center" && "text-center",
  );
}

export function getTestimonialRatingClassName(align: TestimonialAlign) {
  return cn(align === "center" && "self-center");
}
