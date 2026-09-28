import { FeatherIcon } from "../../atoms/icon/icon";
import { Footer } from "../../organisms/footer/footer";
import { PracticalUiLogo } from "./practical-ui-logo";

const socialLinks = [
  {
    label: "Instagram",
    href: "#instagram",
    icon: <FeatherIcon name="instagram" size={24} />,
  },
  {
    label: "LinkedIn",
    href: "#linkedin",
    icon: <FeatherIcon name="linkedin" size={24} />,
  },
];

const columns = Array.from({ length: 4 }, (_, index) => ({
  title: "Topic",
  links: Array.from({ length: 4 }, (_, linkIndex) => ({
    label: "Label",
    href: `#topic-${index + 1}-${linkIndex + 1}`,
  })),
}));

export function MarketingFooter() {
  return (
    <Footer
      size="large"
      logo={<PracticalUiLogo />}
      copyright="© Practical UI"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      socialLinks={socialLinks}
      columns={columns}
    />
  );
}
