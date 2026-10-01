import { type INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle("Collection Manager API")
    .setDescription("HTTP API for Collection Manager")
    .setVersion("0.1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
}
