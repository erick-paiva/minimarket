import { config } from "dotenv";
import request from "supertest";
import { faker } from "@faker-js/faker";
import { DataSource, Tree } from "typeorm";
import app from "../../../index";
import { AppDataSource } from "../../../data-source";
import { sign } from "jsonwebtoken";
import { v4 as uuid } from "uuid";

config();

describe(" Get establishment clients  test", () => {
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

  const establishmentData = {
    name: faker.company.companyName(),
    cnpj: faker.mersenne.rand().toString(),
    address: {
      street: faker.address.street(),
      number: faker.mersenne.rand(),
      zipCode: faker.address.zipCode(),
      district: faker.address.cityName(),
    },
    contact: "34534545645",
    urlLogo: faker.image.imageUrl(),
    userId: "",
  };

  const userData = {
    name: faker.name.firstName(),
    email: faker.internet.email().toLocaleLowerCase(),
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
    contact: faker.phone.phoneNumber(),
    isAdmin: true,
  };

  const clientData = {
    name: faker.name.firstName(),
    avatar: faker.image.avatar(),
    payDay: 8,
    isDeptor: false,
    isLate: false,
    isActivate: true,
    establishmentId: "",
    contact: faker.phone.phoneNumber(),
  };

  test("Should be able to get the clients of an establishment", async () => {
    const userResponse = await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Authorization", "Bearer " + token(true));

    establishmentData.userId = userResponse.body.id;
    const establishmentResponse = await request(app)
      .post("/api/establishment")
      .send(establishmentData)
      .set("Authorization", "Bearer " + token(true));

    clientData.establishmentId = establishmentResponse.body.id;
    const clientResponse = await request(app)
      .post("/api/client")
      .send(clientData)
      .set("Authorization", "Bearer " + token(true));

    const getClientResponse = await request(app)
      .get(`/api/client/${establishmentResponse.body.id}`)
      .set("Authorization", "Bearer " + token(true));
    expect(getClientResponse.status).toBe(200);
    expect(getClientResponse.body).toHaveProperty("map");
  });

  test("Should be return 400 if request don't have a token", async () => {
    const getClientResponse = await request(app).get(
      `/api/client/${establishmentData.userId}`
    );
    expect(getClientResponse.status).toBe(400);
  });

  test("Should be return 401 if user isn't the establishment owner", async () => {
    const EstablishmentDataRight = {
      name: faker.company.companyName(),
      cnpj: faker.mersenne.rand().toString(),
      address: {
        street: faker.address.street(),
        number: faker.mersenne.rand(),
        zipCode: faker.address.zipCode(),
        district: faker.address.cityName(),
      },
      contact: "345345145645",
      urlLogo: faker.image.imageUrl(),
      userId: "",
    };

    const userDataRight = {
      name: faker.name.firstName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      avatar: faker.image.avatar(),
      contact: faker.phone.phoneNumber(),
    };

    const userDataWrong = {
      name: faker.name.firstName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      avatar: faker.image.avatar(),
      contact: faker.phone.phoneNumber(),
    };

    const userResponseRight = await request(app)
      .post("/api/signup")
      .send(userDataRight)
      .set("Authorization", "Bearer " + token(true));

    await request(app)
      .post("/api/signup")
      .send(userDataWrong)
      .set("Authorization", "Bearer " + token(true));

    await request(app)
      .post("/api/signin")
      .send({ email: userDataRight.email, password: userDataRight.password });

    const loginResponseWrong = await request(app)
      .post("/api/signin")
      .send({ email: userDataWrong.email, password: userDataWrong.password });

    EstablishmentDataRight.userId = userResponseRight.body.id;
    const establishmentResponse = await request(app)
      .post("/api/establishment")
      .send(EstablishmentDataRight)
      .set("Authorization", "Bearer " + token(true));

    const getClientResponse = await request(app)
      .get(`/api/client/${establishmentResponse.body.id}`)
      .set("Authorization", "Bearer " + loginResponseWrong.body.token);
    expect(getClientResponse.status).toBe(401);
  });
});
