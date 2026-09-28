"use client";

import * as React from "react";

import { Badge } from "../../atoms/badge/badge";
import { Button } from "../../atoms/button/button";
import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon } from "../../atoms/icon/icon";
import { cn } from "../../lib/cn";
import { Accordion, AccordionItem } from "../../molecules/accordion/accordion";
import { Breadcrumbs } from "../../molecules/breadcrumbs/breadcrumbs";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import { Rating } from "../../molecules/rating/rating";
import { SearchInput } from "../../molecules/search-input/search-input";
import { SegmentedControl } from "../../molecules/segmented-control/segmented-control";
import { Footer } from "../../organisms/footer/footer";
import {
  NavigationHeader,
  NavigationHeaderActions,
  NavigationHeaderBar,
  NavigationHeaderItem,
  NavigationHeaderLeft,
  NavigationHeaderLogo,
  NavigationHeaderMobileDrawer,
  NavigationHeaderMobileHeader,
  NavigationHeaderMobileItem,
  NavigationHeaderMobileNav,
  NavigationHeaderMobileSearch,
  NavigationHeaderNav,
  NavigationHeaderRight,
} from "../../organisms/navigation-header/navigation-header";
import { ShopLayoutTemplate } from "../../templates/shop/shop-layout-template";
import blouseSrc from "../../templates/shop/assets/blouse.jpg";
import handbagSrc from "../../templates/shop/assets/handbag.jpg";
import sneakerSrc from "../../templates/shop/assets/sneaker.jpg";
import watchSrc from "../../templates/shop/assets/watch.jpg";

export interface ShopPageProps {
  /** Called with the selected size when "Add to bag" is pressed. */
  onAddToBag?: (size: string) => void;
  /** Called when "Add to wishlist" is pressed. */
  onAddToWishlist?: () => void;
}

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#shop", label: "Shop" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const headerActions = [
  { label: "Search", icon: "search" },
  { label: "Wishlist", icon: "heart" },
  { label: "Account", icon: "user" },
] as const;

const breadcrumbs = [
  { label: "Home", href: "#home" },
  { label: "Women", href: "#women" },
  { label: "Clothing", href: "#clothing" },
  { label: "Tops" },
];

const product = {
  name: "White textured linen button-up blouse",
  price: "$39.95",
  rating: 5,
  reviewCount: 23,
  description:
    "This versatile piece combines classic elegance with modern style, featuring a lightweight, breathable linen fabric that offers both comfort and sophistication.",
  imageSrc: blouseSrc,
  imageCount: 6,
};

const sizes = ["XS", "S", "M", "L", "XL"].map((size) => ({
  value: size.toLowerCase(),
  label: size,
}));

const perks = ["Free and fast delivery", "100% secure payment", "Free returns"];

const details = [
  {
    value: "size-and-fit",
    heading: "Size and fit",
    body: "Relaxed fit through the body with a slightly dropped shoulder. The model is 178cm and wears a size S.",
  },
  {
    value: "material",
    heading: "Material",
    body: "100% European linen. Naturally breathable, softens with every wash.",
  },
  {
    value: "care",
    heading: "Care instructions",
    body: "Machine wash cold on a gentle cycle. Line dry and iron on a warm setting while slightly damp.",
  },
  {
    value: "delivery",
    heading: "Delivery",
    body: "Free standard delivery on all orders. Express delivery available at checkout.",
  },
];

const wearItWith = [
  {
    id: "sneaker",
    name: "White sneaker",
    price: "$89.95",
    imageSrc: sneakerSrc,
  },
  {
    id: "watch",
    name: "Helm grey watch",
    price: "$149.95",
    imageSrc: watchSrc,
  },
  {
    id: "handbag",
    name: "Tan leather handbag",
    price: "$129.95",
    imageSrc: handbagSrc,
  },
];

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Terms", href: "#terms" },
  { label: "Privacy", href: "#privacy" },
];

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
  { label: "X", href: "#x", icon: <FeatherIcon name="twitter" size={24} /> },
  {
    label: "YouTube",
    href: "#youtube",
    icon: <FeatherIcon name="youtube" size={24} />,
  },
];

function PracticalShopLogo() {
  return (
    <span
      aria-label="Practical Shop"
      className="flex h-12 items-center text-[30px] leading-7 tracking-[-0.3px] text-fg-strong"
    >
      <span className="font-normal">Practical</span>
      <span className="font-extralight">Shop</span>
    </span>
  );
}

function ShopNavigation() {
  const [open, setOpen] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState("#shop");

  return (
    <NavigationHeader open={open} onOpenChange={setOpen}>
      <NavigationHeaderBar className="md:px-[120px]">
        <NavigationHeaderLeft>
          <NavigationHeaderLogo>
            <PracticalShopLogo />
          </NavigationHeaderLogo>
          <NavigationHeaderNav>
            {navItems.map((item) => (
              <NavigationHeaderItem
                key={item.href}
                href={item.href}
                selected={activeHref === item.href}
                onClick={() => setActiveHref(item.href)}
              >
                {item.label}
              </NavigationHeaderItem>
            ))}
          </NavigationHeaderNav>
        </NavigationHeaderLeft>
        <NavigationHeaderRight>
          <NavigationHeaderActions>
            {headerActions.map((action) => (
              <ButtonIcon
                key={action.label}
                aria-label={action.label}
                icon={<FeatherIcon name={action.icon} size={24} />}
                variant="tertiary"
                tone="neutral"
              />
            ))}
          </NavigationHeaderActions>
          <ButtonIcon
            aria-label="Shopping bag, 1 item"
            icon={<FeatherIcon name="shopping-bag" size={24} />}
            variant="tertiary"
            tone="neutral"
            badge="dot"
          />
        </NavigationHeaderRight>
      </NavigationHeaderBar>
      <NavigationHeaderMobileDrawer>
        <NavigationHeaderMobileHeader />
        <NavigationHeaderMobileSearch>
          <SearchInput aria-label="Search" />
        </NavigationHeaderMobileSearch>
        <NavigationHeaderMobileNav>
          {navItems.map((item) => (
            <NavigationHeaderMobileItem
              key={item.href}
              href={item.href}
              selected={activeHref === item.href}
              onClick={() => setActiveHref(item.href)}
            >
              {item.label}
            </NavigationHeaderMobileItem>
          ))}
        </NavigationHeaderMobileNav>
      </NavigationHeaderMobileDrawer>
    </NavigationHeader>
  );
}

function ProductGallery({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <img
        src={product.imageSrc}
        alt={product.name}
        className="aspect-[428/466] w-full object-cover object-bottom md:aspect-[687/747] md:rounded-lg"
      />
      <Badge
        size="small"
        className="absolute bottom-4 left-8 bg-fill-inverse shadow-raised md:left-4"
      >
        1 / {product.imageCount}
      </Badge>
      <div className="absolute right-4 bottom-4">
        <ButtonIcon
          aria-label="Zoom in"
          icon={<FeatherIcon name="zoom-in" size={24} />}
          variant="secondary"
          tone="neutral"
          shape="circle"
          className="bg-fill-inverse shadow-raised"
        />
      </div>
    </div>
  );
}

function WearItWith({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="wear-it-with-heading"
      className={cn("flex flex-col gap-4", className)}
    >
      <h2
        id="wear-it-with-heading"
        className="text-heading-3 font-semibold text-fg-strong"
      >
        Wear it with
      </h2>
      <ul className="-mx-8 flex list-none gap-4 overflow-x-auto px-8 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {wearItWith.map((item) => (
          <li
            key={item.id}
            className="flex w-[218px] shrink-0 flex-col gap-2 md:w-auto"
          >
            <a href={`#${item.id}`} className="block">
              <img
                src={item.imageSrc}
                alt={item.name}
                className="aspect-[218/237] w-full rounded-lg bg-fill-weak object-cover"
              />
            </a>
            <div className="text-small">
              <p className="text-fg-strong">{item.name}</p>
              <p className="text-fg-weak">{item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductDetails({ onAddToBag, onAddToWishlist }: ShopPageProps) {
  const [size, setSize] = React.useState("xs");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[36px] leading-[44px] font-semibold text-fg-strong md:text-heading-1 md:leading-[48px]">
            {product.name}
          </h1>
          <p className="text-heading-3 font-normal text-fg-weak">
            {product.price}
          </p>
        </div>
        <Rating
          value={product.rating}
          layout="vertical"
          reviewCount={product.reviewCount}
          reviewsHref="#reviews"
        />
        <p className="text-small text-fg-weak">{product.description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-small text-fg-strong">Size</span>
        <SegmentedControl
          aria-label="Size"
          options={sizes}
          value={size}
          onValueChange={setSize}
        />
      </div>

      <ButtonGroup
        aria-label="Product actions"
        layout="responsive"
        size="large"
        tone="neutral"
      >
        <Button
          iconLeft={<FeatherIcon name="shopping-bag" size={24} />}
          onClick={() => onAddToBag?.(size)}
        >
          Add to bag
        </Button>
        <Button
          iconLeft={<FeatherIcon name="heart" size={24} />}
          onClick={onAddToWishlist}
        >
          Add to wishlist
        </Button>
      </ButtonGroup>

      <ul className="flex list-none flex-col gap-2 p-0">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 text-tiny text-fg-weak"
          >
            <FeatherIcon
              name="check"
              size={20}
              className="shrink-0 text-icon-neutral"
            />
            {perk}
          </li>
        ))}
      </ul>

      <Accordion
        type="single"
        headingLevel={2}
        className="border-b border-stroke-weak pt-4"
      >
        {details.map((detail) => (
          <AccordionItem
            key={detail.value}
            value={detail.value}
            heading={detail.heading}
          >
            <p className="text-small text-fg-weak">{detail.body}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function ShopPage({ onAddToBag, onAddToWishlist }: ShopPageProps) {
  return (
    <ShopLayoutTemplate
      navigation={<ShopNavigation />}
      footer={
        <Footer
          logo={<PracticalShopLogo />}
          copyright="© 2024 Practical Shop"
          navLinks={footerLinks}
          socialLinks={socialLinks}
        />
      }
    >
      <main className="flex flex-1 flex-col pb-16 md:gap-8 md:px-[120px] md:pt-8">
        <div className="px-8 py-4 md:p-0">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-[687px_minmax(0,1fr)] lg:items-start lg:gap-x-8 lg:gap-y-12">
          <ProductGallery className="lg:col-start-1 lg:row-start-1" />
          <div className="px-8 pt-8 md:px-0 lg:row-span-2 lg:col-start-2 lg:row-start-1 lg:pt-0 lg:pl-8">
            <ProductDetails
              onAddToBag={onAddToBag}
              onAddToWishlist={onAddToWishlist}
            />
          </div>
          <WearItWith className="px-8 pt-12 md:px-0 lg:col-start-1 lg:row-start-2 lg:pt-0" />
        </div>
      </main>
    </ShopLayoutTemplate>
  );
}
