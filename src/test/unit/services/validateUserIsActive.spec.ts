import { config } from "dotenv";
import request from "supertest";
import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import app from "../../..";
import { AppDataSource } from "../../../data-source";
import { sign } from "jsonwebtoken";
import { v4 as uuid } from "uuid";

config();

describe("User isActive test", () => {
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

  test("Should be able to disable the specified user", async () => {
    const name = faker.name.firstName();
    const email = faker.internet.email().toLocaleLowerCase();
    const password = faker.internet.password();
    const avatar = faker.image.avatar();
    const contact = faker.phone.number();
    const isActive = false;

    const userData = { name, email, password, avatar, contact, isActive };

    const user = await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Authorization", "Bearer " + token(true));

    const response = await request(app)
      .patch(`/api/users/isActive/${user.body.id}`)
      .set("Authorization", "Bearer " + token(true));

    expect(response.status).toBe(200);
    expect(response.body.isActive).toBe(true);
  });

  test("Should not be able to find the specified user", async () => {
    const response = await request(app)
      .patch(`/api/users/isActive/${uuid()}`)
      .set("Authorization", "Bearer " + token(true));

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("User not found");
  });
});
