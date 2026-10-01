import "reflect-metadata";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module.js";
import { setupSwagger } from "./swagger.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  setupSwagger(app);
  const port = Number(process.env.PORT ?? 3002);
  await app.listen(port);
}

void bootstrap();
