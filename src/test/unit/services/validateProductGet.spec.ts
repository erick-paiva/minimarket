import { config } from "dotenv";
import request from "supertest";
import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import app from "../../..";
import { AppDataSource } from "../../../data-source";
import { sign } from "jsonwebtoken";

config();

describe("Get products test", () => {
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

  const productData = {
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    salePrice: faker.mersenne.rand(6, 15).toString(),
    costPrice: faker.mersenne.rand(1, 5).toString(),
    unitType: faker.lorem.word(),
    urlImg: faker.image.imageUrl(),
    establishmentId: "",
  };

  const establishmentData = {
    name: faker.company.companyName(),
    cnpj: faker.mersenne.rand().toString(),
    address: {
      street: faker.address.street(),
      number: faker.mersenne.rand(),
      zipCode: faker.address.zipCode(),
      district: faker.address.cityName(),
    },
    contact: faker.phone.imei(),
    urlLogo: faker.image.imageUrl(),
    userId: "",
  };

  const userData = {
    name: faker.name.firstName(),
    email: faker.internet.email().toLocaleLowerCase(),
    contact: faker.phone.imei(),
    password: faker.mersenne.rand().toString(),
    avatar: faker.image.avatar(),
  };

  let establishmentId = "";
  test("Should be able to get all establishments products", async () => {
    const createUserResponse = await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Authorization", "Bearer " + token(true));

    establishmentData.userId = createUserResponse.body.id;
    const establishmentResponse = await request(app)
      .post("/api/establishment")
      .send(establishmentData)
      .set("Authorization", `Bearer ${token(true)}`);
    establishmentId = establishmentResponse.body.id;
    productData.establishmentId = establishmentId;
    await request(app)
      .post("/api/product")
      .send(productData)
      .set("Authorization", "Bearer " + token(true));

    const getProductsResponse = await request(app)
      .get(`/api/product/${establishmentId}`)
      .send(productData)
      .set("Authorization", "Bearer " + token(true));
    expect(getProductsResponse.status).toBe(200);
    expect(getProductsResponse.body).toHaveProperty("map");
  });

  test("Should be return status code 400 if request do not have token", async () => {
    const productResponse = await request(app).get(
      `/api/product/${establishmentId}`
    );

    expect(productResponse.status).toBe(400);
    expect(productResponse.body).toHaveProperty("error");
  });

  test("Should be return status 404 if body request establishmentId do not exists", async () => {
    establishmentId = "************************************";
    const productResponse = await request(app)
      .get(`/api/product/${establishmentId}`)
      .send(productData)
      .set("Authorization", "Bearer " + token(true));
    expect(productResponse.status).toBe(404);
    expect(productResponse.body).toHaveProperty("error");
  });
});
