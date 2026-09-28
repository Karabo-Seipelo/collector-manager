import { Card, CardContent, CardHeader, CardImage } from "../../molecules/card/card";
import { templateHeroGradientSrc } from "./mock-photo";

export function BlogCardGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <Card key={index}>
          <CardImage className="h-44">
            <img src={templateHeroGradientSrc} alt="" className="size-full object-cover" />
          </CardImage>
          <CardContent className="p-6">
            <CardHeader
              label="Category"
              heading={`Article title ${index + 1}`}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
