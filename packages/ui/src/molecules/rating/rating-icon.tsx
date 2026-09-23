import { cn } from "../../lib/cn";

export type RatingIconState = "empty" | "half" | "full";
export type RatingIconType = "star" | "heart";

export interface RatingIconProps {
  type?: RatingIconType;
  state?: RatingIconState;
  className?: string;
}

const STAR_PATH =
  "M12 1.5C12.1902 1.5 12.3639 1.60786 12.4482 1.77832L15.4209 7.80273L22.0723 8.77539C22.2605 8.80291 22.4169 8.93521 22.4756 9.11621C22.5341 9.29711 22.4848 9.49526 22.3486 9.62793L17.5371 14.3135L18.6729 20.9355C18.705 21.1231 18.6276 21.313 18.4736 21.4248C18.3197 21.5364 18.1156 21.5513 17.9473 21.4629L12 18.335L6.05273 21.4629C5.88441 21.5513 5.68028 21.5364 5.52637 21.4248C5.3724 21.313 5.29501 21.1231 5.32715 20.9355L6.46191 14.3135L1.65137 9.62793C1.51516 9.49526 1.46592 9.29711 1.52441 9.11621C1.5831 8.93521 1.73945 8.80291 1.92773 8.77539L8.57812 7.80273L11.5518 1.77832L11.5869 1.71777C11.6792 1.58264 11.8334 1.5 12 1.5Z";

const STAR_HALF_FILL =
  "M5.82 21.02L12 17.77V2L8.91 8.26L2 9.27L7 14.14L5.82 21.02Z";

const HEART_PATH =
  "M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L12.0001 21.2299L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987Z";

const HEART_HALF_FILL =
  "M10.9401 4.60987L12.0001 5.66987V21.2299L3.16012 12.3899C2.12843 11.3582 1.54883 9.9589 1.54883 8.49987C1.54883 7.04084 2.12843 5.64156 3.16012 4.60987C4.19181 3.57818 5.59109 2.99858 7.05012 2.99858C8.50915 2.99858 9.90843 3.57818 10.9401 4.60987Z";

export function RatingIcon({
  type = "star",
  state = "empty",
  className,
}: RatingIconProps) {
  if (type === "heart") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn("size-6 shrink-0", className)}
      >
        {state === "full" ? (
          <path
            d={HEART_PATH}
            fill="#C73A3A"
            stroke="#C73A3A"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <>
            <path
              d={HEART_PATH}
              stroke="#C73A3A"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {state === "half" ? (
              <path d={HEART_HALF_FILL} fill="#C73A3A" />
            ) : null}
          </>
        )}
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-6 shrink-0", className)}
    >
      {state === "full" ? (
        <>
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FEC62E" />
          <path
            d={STAR_PATH}
            stroke="#8F6C1A"
            strokeOpacity={0.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          {state === "half" ? (
            <path d={STAR_HALF_FILL} fill="#FEC62E" />
          ) : null}
          <path
            d={STAR_PATH}
            stroke="#8F6C1A"
            strokeOpacity={0.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}
