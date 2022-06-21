import { config } from "dotenv";
import request from "supertest";
import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import app from "../../..";
import { AppDataSource } from "../../../data-source";
import { sign } from "jsonwebtoken";
import { v4 as uuid } from "uuid";

config();

describe("User get test", () => {
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

  test("Should be able to get the specific user", async () => {
    const name = faker.name.firstName();
    const email = faker.internet.email().toLocaleLowerCase();
    const password = faker.internet.password();
    const avatar = faker.image.avatar();
    const contact = faker.phone.number();

    const userData = { name, email, password, avatar, contact };

    const user = await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Authorization", "Bearer " + token(true));

    const response = await request(app)
      .get(`/api/users/${user.body.id}`)
      .set("Authorization", "Bearer " + token(true));
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
  });

  test("Should not find any user", async () => {
    const response = await request(app)
      .get(`/api/users/${uuid()}`)
      .set("Authorization", "Bearer " + token(true));

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("User not found");
  });
});
