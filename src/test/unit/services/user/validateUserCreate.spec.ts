import { config } from "dotenv";
import request from "supertest";
import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../../../data-source";
import app from "../../../..";

config();

describe("User Create test", () => {
  let connection: DataSource;

  const token = (isAdm: boolean) => {
    return sign(
      { email: "test@mail.com", isAdmin: isAdm },
      process.env.SECRET_KEY as string,
      {
        expiresIn: process.env.EXPIRES_IN as string,
      }
    );
  };

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

  test("Should be able to create a new user", async () => {
    const name = faker.name.firstName();
    const email = faker.internet.email().toLocaleLowerCase();
    const password = faker.internet.password();
    const avatar = faker.image.avatar();
    const contact = faker.phone.number();

    const userData = { name, email, password, avatar, contact };

    const response = await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Authorization", "Bearer " + token(true));

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });

  test("Return: Body error, Email already exists | Status code: 409", async () => {
    const name = faker.name.firstName();
    const email = faker.internet.email().toLocaleLowerCase();
    const password = faker.internet.password();
    const avatar = faker.image.avatar();
    const contact = faker.phone.number();

    const userData = { name, email, password, avatar, contact };

    await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Authorization", "Bearer " + token(true));

    const response = await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Authorization", "Bearer " + token(true));

    expect(response.status).toBe(409);
    expect(response.body.error).toBeDefined();
  });

  test("Return: Body error, Missing authorization token | Status code: 400", async () => {
    const name = faker.name.firstName();
    const email = faker.internet.email().toLocaleLowerCase();
    const password = faker.internet.password();
    const avatar = faker.image.avatar();
    const contact = faker.phone.number();

    const userData = { name, email, password, avatar, contact };

    const response = await request(app).post("/api/signup").send(userData);

    expect(response.status).toBe(400);
    expect(response.body.error).toStrictEqual("Missing authorization token.");
  });

  test("Return: Body error, Missing admin permision | Status code: 400", async () => {
    const name = faker.name.firstName();
    const email = faker.internet.email().toLocaleLowerCase();
    const password = faker.internet.password();
    const avatar = faker.image.avatar();
    const contact = "(19)329532980";

    const userData = { name, email, password, avatar, contact };

    const response = await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Authorization", "Bearer " + token(false));

    expect(response.status).toBe(401);
    expect(response.body.error).toStrictEqual("Missing admin permision.");
  });

  test("Return: Body message, Email is a required field | Status code: 400", async () => {
    const name = faker.name.firstName();
    const password = faker.internet.password();
    const avatar = faker.image.avatar();
    const contact = faker.phone.number();

    const userData = { name, password, avatar, contact };

    await request(app).post("/api/signup").send(userData);

    const response = await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Authorization", "Bearer " + token(true));

    expect(response.status).toBe(400);
    expect(response.body.message).toStrictEqual(["email is a required field"]);
  });

  test("Return: Body message, password must be a `string` | Status code: 400", async () => {
    const name = faker.name.firstName();
    const email = faker.internet.email().toLocaleLowerCase();
    const password = 1234;
    const avatar = faker.image.avatar();
    const contact = faker.phone.number();

    const userData = { name, password, avatar, contact, email };

    await request(app).post("/api/signup").send(userData);

    const response = await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Authorization", "Bearer " + token(true));

    expect(response.status).toBe(400);
    expect(response.body.message).toStrictEqual([
      "password must be a `string` type, but the final value was: `1234`.",
    ]);
  });
});
