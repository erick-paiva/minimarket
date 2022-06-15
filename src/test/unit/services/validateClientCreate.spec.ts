import { config } from "dotenv";
import request from "supertest";
import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import app from "../../..";
import { AppDataSource } from "../../../data-source";
import { sign } from "jsonwebtoken";

config();

describe("Client Create test", () => {
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

  const email = faker.internet.email().toLocaleLowerCase();
  const password = faker.internet.password();
  const avatar = faker.image.avatar();

  const userData = {
    name: faker.name.firstName(),
    email,
    password,
    avatar,
    contact: faker.phone.phoneNumber(),
  };

  const establishmentData = {
    name: "Via c",
    cnpj: "30.0155138.77/0008-24",
    address: {
      street: "Rua c",
      number: 14011,
      zipCode: "25090-29",
      district: "Gova",
    },
    contact: "02299999999",
    urlLogo:
      "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_960_7230.png",
    userId: "",
  };

  const clientData = {
    name: "robson",
    avatar: "url",
    contact: "robson 8",
    payDay: 3,
    isDeptor: false,
    isLate: false,
    isActivate: true,
    establishmentId: "",
  };

  test("Should be able to create a new client", async () => {
    const user = await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Authorization", "Bearer " + token(true));
    establishmentData.userId = user.body.id;

    const establishment = await request(app)
      .post("/api/establishment")
      .send(establishmentData)
      .set("Authorization", "Bearer " + token(true));
    clientData.establishmentId = establishment.body.id;

    const response = await request(app)
      .post("/api/client")
      .send(clientData)
      .set("Authorization", "Bearer " + token(true));

    expect(response.status).toBe(201);
    expect(response.body.contact).toBe(clientData.contact);
  }),
    test("Shouldn't be able to create a new client", async () => {
      const response = await request(app)
        .post("/api/client")
        .send(clientData)
        .set("Authorization", "Bearer " + token(true));

      expect(response.status).toBe(409);
      expect(response.body.error).toBe("Client already exists");
    });
});
