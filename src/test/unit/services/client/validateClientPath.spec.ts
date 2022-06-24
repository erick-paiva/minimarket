import { config } from "dotenv";
import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../..";
import { AppDataSource } from "../../../../data-source";
import { v4 as uuid } from "uuid";
import { createAnClient, generateToken } from "../../../utils/mainFunctions";

config();

describe("User update test", () => {
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

  test("Should be able to update the specified client", async () => {
    const { client } = await createAnClient();

    const response = await request(app)
      .patch(`/api/client/${client.id}`)
      .send({ name: "Varíola" })
      .set("Authorization", "Bearer " + generateToken(true));

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Varíola");
  });

  test("Should not be able to find the specified client", async () => {
    const response = await request(app)
      .patch(`/api/client/${uuid()}`)
      .set("Authorization", "Bearer " + generateToken(true));

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Client not found");
  });
});
