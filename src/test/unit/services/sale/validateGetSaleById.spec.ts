import { config } from "dotenv";
import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../../..";
import { AppDataSource } from "../../../../data-source";
import { createAnSale, generateToken } from "../../../utils/mainFunctions";

config();

describe("Get establishment test", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  const mockUuid = "558549b9-fc69-446e-90cc-9646279c3498";
  let mockSale: { id: any };

  test("Sale as JSON response | Status code: 200", async () => {
    const { sale, token } = await createAnSale();
    mockSale = sale;

    const output = await supertest(app)
      .get(`/api/sale/${sale.id}`)
      .send()
      .set("Authorization", `Beare ${token}`);
    expect(output.status).toBe(200);
    expect(output.body).toHaveProperty("id");
    expect(output.body.client).toHaveProperty("id");
    expect(output.body.payment).toHaveProperty("id");
  });

  test("Invalid uuid in request params | Status code: 400", async () => {
    const { token } = await createAnSale();

    const output = await supertest(app)
      .get(`/api/sale/999`)
      .send()
      .set("Authorization", `Beare ${token}`);
    expect(output.status).toBe(400);
    expect(output.body.message).toBeDefined();
    expect(output.body.message).toStrictEqual(["this must be a valid UUID"]);
  });

  test("Sale id not found | Status code: 400", async () => {
    const { token } = await createAnSale();

    const output = await supertest(app)
      .get(`/api/sale/${mockUuid}`)
      .send()
      .set("Authorization", `Beare ${token}`);
    expect(output.status).toBe(404);
    expect(output.body.error).toBeDefined();
    expect(output.body.error).toStrictEqual(
      `Sale with id ${mockUuid} not found.`
    );
  });

  test("Return unauthorzed if not establishment owner or admin | Status code: 403", async () => {
    const token = generateToken(false);

    const output = await supertest(app)
      .get(`/api/sale/${mockSale.id}`)
      .send()
      .set("Authorization", `Beare ${token}`);
    expect(output.status).toBe(403);
    expect(output.body.error).toBeDefined();
    expect(output.body.error).toStrictEqual(
      "You are not authorized to perform this action."
    );
  });
});
