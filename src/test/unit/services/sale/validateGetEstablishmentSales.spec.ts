import { config } from "dotenv";
import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../../..";
import { AppDataSource } from "../../../../data-source";
import {
  createAnSaleWithParams,
  generateToken,
} from "../../../utils/mainFunctions";

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

  let mockEstablishment: { id: any };

  test("Sale as JSON response | Status code: 200", async () => {
    const { response, establishment, token } = await createAnSaleWithParams();
    mockEstablishment = establishment;

    const output = await supertest(app)
      .get(`/api/sale/establishment/${establishment.id}`)
      .send()
      .set("Authorization", `Beare ${token}`);
    expect(output.status).toBe(200);
    expect(output.body).toHaveProperty("map");
    expect(output.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: response.body.id }),
      ])
    );
  });

  test("Invalid uuid in request params | Status code: 400", async () => {
    const { token } = await createAnSaleWithParams();

    const output = await supertest(app)
      .get(`/api/sale/establishment/999`)
      .send()
      .set("Authorization", `Beare ${token}`);
    expect(output.status).toBe(400);
    expect(output.body.message).toBeDefined();
    expect(output.body.message).toStrictEqual(["this must be a valid UUID"]);
  });

  test("Return unauthorzed if not establishment owner or admin | Status code: 403", async () => {
    const token = generateToken(false);

    const output = await supertest(app)
      .get(`/api/sale/establishment/${mockEstablishment.id}`)
      .send()
      .set("Authorization", `Beare ${token}`);
    expect(output.status).toBe(403);
    expect(output.body.error).toBeDefined();
    expect(output.body.error).toStrictEqual(
      "You are not authorized to perform this action."
    );
  });
});
