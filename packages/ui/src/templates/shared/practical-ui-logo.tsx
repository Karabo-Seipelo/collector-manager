import practicalUiLogoSrc from "./assets/practical-ui-logo.svg";

export function PracticalUiLogo() {
  return (
    <img
      src={practicalUiLogoSrc}
      alt="Practical UI"
      width={146}
      height={42}
      className="block h-[42px] w-[146px] shrink-0"
    />
  );
}
