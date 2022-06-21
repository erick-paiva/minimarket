import { config } from "dotenv";
import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../../..";
import { AppDataSource } from "../../../../data-source";
import {
  createAnStablishment,
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

  it("Should return 404 if the establishment does not exist in the database", async () => {
    const adminToken = generateToken(true);
    const uuid = "9cc26733-4de1-4a60-88af-082a7a8fb0d1";

    const response = await supertest(app)
      .get(`/api/establishment/${uuid}`)
      .send()
      .set("Authorization", "Bearer " + adminToken);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toStrictEqual(
      `Establishment with id ${uuid} not found.`
    );
  });

  it("Should return 401 if the user does not own the establishment", async () => {
    const { establishment } = await createAnStablishment();
    const anotherUserToken = generateToken(false);

    const response = await supertest(app)
      .get(`/api/establishment/${establishment?.id}`)
      .send()
      .set("Authorization", "Bearer " + anotherUserToken);
    expect(response.status).toBe(401);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toStrictEqual("Unauthorized");
  });

  it("Should return 200 ok if the establishment exists", async () => {
    const { establishment, token } = await createAnStablishment();

    const response = await supertest(app)
      .get(`/api/establishment/${establishment?.id}`)
      .send()
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(establishment);
  });

  it("Should return 200 ok if the user is not the owner but is admin", async () => {
    const { establishment } = await createAnStablishment();
    const adminToken = generateToken(true);

    const response = await supertest(app)
      .get(`/api/establishment/${establishment?.id}`)
      .send()
      .set("Authorization", "Bearer " + adminToken);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(establishment);
  });
});
