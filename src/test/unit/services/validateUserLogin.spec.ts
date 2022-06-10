import { config } from "dotenv";
import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../..";
import { AppDataSource } from "../../../data-source";

config();

describe("User login test", () => {
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

  it("Should return 404 user not found if user passes invalid information", async () => {
    const userLogin = {
      email: "invalidemail@email.com",
      password: "1234",
    };

    const response = await supertest(app).post("/api/signin").send(userLogin);
    expect(response.body.token).not.toBeDefined();
    expect(response.body.error).toBeDefined();
    expect(response.status).toBe(404);
  });

  it("Should return 200 ok and the user token if the user exists", async () => {
    const userLogin = {
      email: "validemail@email.com",
      password: "1234",
      avatar:
        "https://taverna42.files.wordpress.com/2018/09/maxresdefault-1.jpg",
      contact: "12345678",
      name: "Jhon Doe",
    };

    await supertest(app).post("/api/signup").send(userLogin);

    const response = await supertest(app).post("/api/signin").send(userLogin);

    expect(response.body.token).toBeDefined();
    expect(response.status).toBe(200);
  });
});
