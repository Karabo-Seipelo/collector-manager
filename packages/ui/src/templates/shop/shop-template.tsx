"use client";

import { Button } from "../../atoms/button/button";
import { Tag } from "../../atoms/tag/tag";
import { Card, CardContent, CardHeader, CardImage } from "../../molecules/card/card";
import { templateHeroGradientSrc } from "../shared/mock-photo";
import { MarketingFooter } from "../shared/marketing-footer";
import { PracticalUiLogo } from "../shared/practical-ui-logo";

const products = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  price: `$${(index + 1) * 24}`,
}));

export function ShopTemplate() {
  return (
    <div className="flex min-h-svh flex-col bg-fill-weaker">
      <header className="flex items-center justify-between border-b border-stroke-weak bg-fill-inverse px-4 py-4 md:px-8">
        <PracticalUiLogo />
        <Button size="small">Cart (2)</Button>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-8">
        <h1 className="text-heading-2 font-semibold text-fg-strong">Shop</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {["All", "New", "Popular", "Sale"].map((label, index) => (
            <Tag key={label} size="small" selected={index === 0}>
              {label}
            </Tag>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <Card key={product.id} className="rounded-xl shadow-none hover:shadow-raised">
              <CardImage className="aspect-square h-auto">
                <img src={templateHeroGradientSrc} alt="" className="size-full object-cover" />
              </CardImage>
              <CardContent className="gap-1 p-4">
                <CardHeader heading={product.name} description={product.price} />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
