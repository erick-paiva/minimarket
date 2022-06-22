import { config } from "dotenv";
import request from "supertest";
import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import app from "../../../index";
import { AppDataSource } from "../../../data-source";
import { sign } from "jsonwebtoken";
import { createAnStablishment } from "../../utils/mainFunctions";
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

  const clientData = {
    name: faker.name.firstName(),
    avatar: faker.image.avatar(),
    payDay: 8,
    isDeptor: false,
    isLate: false,
    isActivate: true,
    establishmentId: "",
    contact: faker.phone.number(),
  };

  test("Should be able to get the clients of an establishment", async () => {
    const { establishment, token } = await createAnStablishment();
    clientData.establishmentId = establishment.id;

    await request(app)
      .post("/api/client")
      .send(clientData)
      .set("Authorization", "Bearer " + token);

    const getClientResponse = await request(app)
      .get(`/api/client/${establishment.id}`)
      .set("Authorization", "Bearer " + token);
    expect(getClientResponse.status).toBe(200);
    expect(getClientResponse.body).toHaveProperty("map");
  });

  test("Should be return 400 if request don't have a token", async () => {
    const { establishment } = await createAnStablishment();

    const getClientResponse = await request(app).get(
      `/api/client/${establishment.userId}`
    );
    expect(getClientResponse.status).toBe(400);
  });

  test("Should be return 401 if user isn't the establishment owner", async () => {
    const userDataWrong = {
      name: faker.name.firstName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
      avatar: faker.image.avatar(),
      contact: "(11)459348765",
    };

    await request(app)
      .post("/api/signup")
      .send(userDataWrong)
      .set("Authorization", "Bearer " + token(true));

    const loginResponseWrong = await request(app)
      .post("/api/signin")
      .send({ email: userDataWrong.email, password: userDataWrong.password });

    const { establishment } = await createAnStablishment();

    const getClientResponse = await request(app)
      .get(`/api/client/${establishment.id}`)
      .set("Authorization", "Bearer " + loginResponseWrong.body.token);
    expect(getClientResponse.status).toBe(401);
  });
});
