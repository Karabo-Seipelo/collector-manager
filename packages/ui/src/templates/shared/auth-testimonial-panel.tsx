"use client";

import login4AvatarSrc from "./assets/login-4-avatar.png";
import { AvatarLabelled } from "../../molecules/avatar-labelled/avatar-labelled";

const AUTH_TESTIMONIAL_QUOTE = `\u201CI\u2019ve never found a single resource I can share with people to help them improve their design skills. That just changed.\u201D`;

export function AuthTestimonialPanel() {
  return (
    <div className="relative flex flex-1 flex-col gap-8">
      <blockquote className="text-[32px] font-normal leading-10 text-fg-weak [word-break:break-word]">
        {AUTH_TESTIMONIAL_QUOTE}
      </blockquote>
      <AvatarLabelled
        name="John Smith"
        description="Product designer"
        src={login4AvatarSrc}
        alt=""
        size="large"
        className="gap-3"
      />
    </div>
  );
}
