"use client";

import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon } from "../../atoms/icon/icon";
import { Slider } from "../../atoms/slider/slider";
import { ImagePlaceholder } from "../../atoms/image-placeholder/image-placeholder";
import { templateHeroGradientSrc } from "../shared/mock-photo";

export function MusicPlayerTemplate() {
  return (
    <div className="flex min-h-svh flex-col bg-fill-inverse md:flex-row">
      <div className="relative flex flex-1 flex-col items-center justify-center gap-6 p-8 md:p-12">
        <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl shadow-overlay">
          <img src={templateHeroGradientSrc} alt="" className="size-full object-cover" />
        </div>
        <div className="text-center">
          <h1 className="text-heading-3 font-semibold text-fg-strong">Midnight City</h1>
          <p className="text-small text-fg-weak">M83 · Hurry Up, We&apos;re Dreaming</p>
        </div>
      </div>
      <aside className="flex w-full flex-col gap-6 border-t border-stroke-weak p-6 md:w-[420px] md:border-t-0 md:border-l md:p-8">
        <div className="flex items-center justify-center gap-4">
          <ButtonIcon
            aria-label="Shuffle"
            icon={<FeatherIcon name="shuffle" size={24} />}
            variant="tertiary"
            tone="neutral"
          />
          <ButtonIcon
            aria-label="Previous"
            icon={<FeatherIcon name="skip-back" size={24} />}
            variant="tertiary"
            tone="neutral"
          />
          <ButtonIcon
            aria-label="Play"
            icon={<FeatherIcon name="play" size={24} />}
            variant="primary"
            tone="brand"
            shape="circle"
          />
          <ButtonIcon
            aria-label="Next"
            icon={<FeatherIcon name="skip-forward" size={24} />}
            variant="tertiary"
            tone="neutral"
          />
          <ButtonIcon
            aria-label="Repeat"
            icon={<FeatherIcon name="repeat" size={24} />}
            variant="tertiary"
            tone="neutral"
          />
        </div>
        <Slider label="Progress" value={42} showValue={false} />
        <Slider label="Volume" value={70} />
        <div className="mt-auto flex items-center gap-3 rounded-xl bg-fill-weaker p-4">
          <ImagePlaceholder size={24} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-small font-semibold text-fg-strong">Up next</p>
            <p className="truncate text-tiny text-fg-weak">Wait · M83</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
