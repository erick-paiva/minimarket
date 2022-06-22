import { config } from "dotenv";
import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../../..";
import { AppDataSource } from "../../../../data-source";
import {
  createAnStablishment,
  generateUserWithToken,
} from "../../../utils/mainFunctions";

config();

describe("Post Establishment test", () => {
  let connection: DataSource;

  beforeEach(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test("Return: Establishment updated as JSON response | Status code: 200", async () => {
    const { user } = await generateUserWithToken();

    let { establishment, token } = await createAnStablishment();

    establishment = Object.assign({
      ...establishment,
      name: "Bar do Jhoe",
      cnpj: "33.333666.33/0033-33",
      contact: "02111999999",
      address: Object.assign(establishment.address, {
        street: "Rua Arlindo Bonfin",
        number: 17471,
      }),
      userId: user.id,
    });

    const response = await supertest(app)
      .patch(`/api/establishment/${establishment.id}`)
      .send(establishment)
      .set("Authorization", `Beare ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  test("Return: Body error, User not found | Status code: 404", async () => {
    const { user } = await generateUserWithToken();

    let { establishment, token } = await createAnStablishment();

    establishment = Object.assign({
      ...establishment,
      name: "Bar do Jhoe",
      cnpj: "33.333666.33/0033-33",
      contact: "02111999999",
      address: Object.assign(establishment.address, {
        street: "Rua Arlindo Bonfin",
        number: 17471,
      }),
      userId: "xxxxxxxxxxxxxxxx",
    });

    const response = await supertest(app)
      .patch(`/api/establishment/${establishment.id}`)
      .send(establishment)
      .set("Authorization", `Beare ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toStrictEqual({
      error: "User not found",
    });
  });

  test("Return: Body error, Establishment with cnpj ${body.cnpj} already registered | Status code: 409", async () => {
    const { user } = await generateUserWithToken();

    let { establishment, token } = await createAnStablishment();

    establishment = Object.assign({
      ...establishment,
      name: "Bar do Jhoe",
      contact: "02111999999",
      address: Object.assign(establishment.address, {
        number: 17471,
      }),
      userId: user.id,
    });

    const response = await supertest(app)
      .patch(`/api/establishment/${establishment.id}`)
      .send(establishment)
      .set("Authorization", `Beare ${token}`);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toStrictEqual({
      error: `Establishment with cnpj ${establishment.cnpj} already registered.`,
    });
  });

  test("Return: Body error, Address number ${body.address.number} already registered | Status code: 409", async () => {
    const { user } = await generateUserWithToken();

    let { establishment, token } = await createAnStablishment();

    establishment = Object.assign({
      ...establishment,
      name: "Bar do Jhoe",
      cnpj: "33.33366.32/0033-33",
      contact: "02111999998",
      userId: user.id,
    });

    const response = await supertest(app)
      .patch(`/api/establishment/${establishment.id}`)
      .send(establishment)
      .set("Authorization", `Beare ${token}`);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toStrictEqual({
      error: `Address number ${establishment.address.number} already registered`,
    });
  });

  test("Return: Body error, Establishment with contact ${body.contact} already registered | Status code: 409", async () => {
    const { user } = await generateUserWithToken();

    let { establishment, token } = await createAnStablishment();

    establishment = Object.assign({
      ...establishment,
      name: "Bar do Jhoe",
      cnpj: "33.333666.33/0033-33",
      address: Object.assign(establishment.address, {
        street: "Rua Arlindo Bonfin",
        number: 17471,
      }),
      userId: user.id,
    });

    const response = await supertest(app)
      .patch(`/api/establishment/${establishment.id}`)
      .send(establishment)
      .set("Authorization", `Beare ${token}`);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toStrictEqual({
      error: `Establishment with contact ${establishment.contact} already registered`,
    });
  });
});
