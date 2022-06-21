import { config } from "dotenv";
import supertest from "supertest";
import { DataSource } from "typeorm";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../../../data-source";
import app from "../../../..";

config();

describe("Post Establishment test", () => {
  let connection: DataSource;

  let token = (isAdm: boolean) => {
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

  test("Return: Body stablishments | Status code: 200", async () => {
    const user = {
      name: "jhon Doe",
      email: "jhondoe@mail.com",
      contact: "044999999999",
      password: "12345",
      avatar: "https://images.uncyc.org/pt/1/18/Dobby_HarryPotter.jpg",
    };

    const createUserResponse = await supertest(app)
      .post("/api/signup")
      .send(user)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createUserResponse.status).toBe(201);

    const loginResponse = await supertest(app)
      .post("/api/signin")
      .send({ email: user.email, password: user.password });
    expect(loginResponse.status).toBe(200);

    const response = await supertest(app)
      .get("/api/establishment")
      .send()
      .set("Authorization", `Beare ${token(true)}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });
});
