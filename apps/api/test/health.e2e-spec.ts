import { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../src/app.module.js";
import { setupSwagger } from "../src/swagger.js";

describe("HealthController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api");
    setupSwagger(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /api/health", async () => {
    const response = await request(app.getHttpServer())
      .get("/api/health")
      .expect(200);

    expect(response.body.status).toBe("ok");
    expect(typeof response.body.timestamp).toBe("string");
  });

  it("GET /api/docs", async () => {
    await request(app.getHttpServer()).get("/api/docs").expect(200);
  });

  it("GET /api/docs-json", async () => {
    const response = await request(app.getHttpServer())
      .get("/api/docs-json")
      .expect(200);

    expect(response.body.openapi).toBeDefined();
    expect(response.body.paths["/api/health"]).toBeDefined();
  });
});
