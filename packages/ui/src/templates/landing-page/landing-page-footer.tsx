import { FeatherIcon } from "../../atoms/icon/icon";
import { Footer } from "../../organisms/footer/footer";
import { PracticalUiLogo } from "../shared/practical-ui-logo";

const navLinks = Array.from({ length: 5 }, (_, index) => ({
  label: "Label",
  href: `#footer-${index + 1}`,
}));

const socialLinks = [
  {
    label: "Instagram",
    href: "#instagram",
    icon: <FeatherIcon name="instagram" size={24} />,
  },
  {
    label: "Facebook",
    href: "#facebook",
    icon: <FeatherIcon name="facebook" size={24} />,
  },
  {
    label: "LinkedIn",
    href: "#linkedin",
    icon: <FeatherIcon name="linkedin" size={24} />,
  },
  {
    label: "X",
    href: "#x",
    icon: <FeatherIcon name="twitter" size={24} />,
  },
  {
    label: "YouTube",
    href: "#youtube",
    icon: <FeatherIcon name="youtube" size={24} />,
  },
];

export function LandingPageFooter() {
  return (
    <Footer
      logo={<PracticalUiLogo />}
      copyright="© 2024 Practical UI"
      navLinks={navLinks}
      socialLinks={socialLinks}
    />
  );
}
