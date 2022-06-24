import { config } from "dotenv";
import request from "supertest";
import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../../../data-source";
import app from "../../../..";
import {
  createAnClient,
  createAnStablishment,
  generateToken,
} from "../../../utils/mainFunctions";

config();

describe("Client Create test", () => {
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

  test("Should be able to create a new client", async () => {
    await createAnClient();

    const { establishment } = await createAnStablishment();

    const clientData = {
      name: "robson",
      avatar: "url",
      contact: "robson 8",
      payDay: 3,
      isDeptor: false,
      isLate: false,
      isActivate: true,
      establishment: establishment.id,
    };
    const response = await request(app)
      .post("/api/client")
      .send(clientData)
      .set("Authorization", "Bearer " + generateToken(true));

    expect(response.status).toBe(201);
    expect(response.body.contact).toBe(clientData.contact);
  }),
    test("Shouldn't be able to create a new client", async () => {
      const { establishment } = await createAnStablishment();
      const clientData = {
        name: "robson",
        avatar: "url",
        contact: "robson 8",
        payDay: 3,
        isDeptor: false,
        isLate: false,
        isActivate: true,
        establishment: establishment.id,
      };

      await request(app)
        .post("/api/client")
        .send(clientData)
        .set("Authorization", "Bearer " + generateToken(true));

      const response = await request(app)
        .post("/api/client")
        .send(clientData)
        .set("Authorization", "Bearer " + generateToken(true));

      expect(response.status).toBe(409);
      expect(response.body.error).toBe("Client already exists");
    });
});
