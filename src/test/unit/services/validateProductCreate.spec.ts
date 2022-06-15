import { config } from "dotenv";
import request from "supertest";
import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import app from "../../..";
import { AppDataSource } from "../../../data-source";
import { sign } from "jsonwebtoken";
import supertest from "supertest";

config();

describe("Create product test", () => {
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

  test("Should be able to create a new product", async () => {
    const createUserResponse = await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Authorization", "Bearer " + token(true));

    establishmentData.userId = createUserResponse.body.id;
    const establishmentResponse = await request(app)
      .post("/api/establishment")
      .send(establishmentData)
      .set("Authorization", `Bearer ${token(true)}`);

    productData.establishmentId = establishmentResponse.body.id;
    const response = await request(app)
      .post("/api/product")
      .send(productData)
      .set("Authorization", "Bearer " + token(true));

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("salePrice");
    expect(response.body).toHaveProperty("costPrice");
    expect(response.body).toHaveProperty("unitType");
    expect(response.body).toHaveProperty("urlImg");
    expect(response.body).toHaveProperty("categories");
  });

  test("Should be return status code 409 if product name already exists", async () => {
    await request(app)
      .post("/api/product")
      .send(productData)
      .set("Authorization", "Bearer " + token(true));

    const response = await request(app)
      .post("/api/product")
      .send(productData)
      .set("Authorization", "Bearer " + token(true));
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
  });

  test("Should be return status code 400 if request do not have token", async () => {
    productData.name = faker.name.firstName();
    const productResponse = await request(app)
      .post("/api/product")
      .send(productData);

    expect(productResponse.status).toBe(400);
    expect(productResponse.body).toHaveProperty("error");
  });

  test("Should be return 400 if request do not have product name", async () => {
    const productDataWithoutName = {
      description: faker.lorem.paragraph(),
      salePrice: faker.mersenne.rand(6, 15).toString(),
      costPrice: faker.mersenne.rand(1, 5).toString(),
      unitType: faker.lorem.word(),
      urlImg: faker.image.imageUrl(),
      establishmentId: "",
    };
    const productResponse = await request(app)
      .post("/api/product")
      .send(productDataWithoutName)
      .set("Authorization", "Bearer " + token(true));
    expect(productResponse.status).toBe(400);
    expect(productResponse.body).toHaveProperty("message");
  });

  test("Should be return status 404 if body request establishmentId do not exists", async () => {
    productData.establishmentId = "************************************";
    const productResponse = await request(app)
      .post("/api/product")
      .send(productData)
      .set("Authorization", "Bearer " + token(true));
    expect(productResponse.status).toBe(404);
    expect(productResponse.body).toHaveProperty("error");
  });
});
