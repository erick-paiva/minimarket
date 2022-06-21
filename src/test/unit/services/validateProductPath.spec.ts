import { config } from "dotenv";
import request from "supertest";
import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import app from "../../..";
import { AppDataSource } from "../../../data-source";
import { generateToken, createAnStablishment } from "../../utils/mainFunctions";
import { v4 as uuid } from "uuid";

config();

describe("Patch product test", () => {
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

  const productData = {
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    salePrice: faker.mersenne.rand(6, 15).toString(),
    costPrice: faker.mersenne.rand(1, 5).toString(),
    unitType: faker.lorem.word(),
    urlImg: faker.image.imageUrl(),
    establishmentId: "",
    categories: [],
  };

  test("Should be able to patch product", async () => {
    productData.establishmentId = (
      await createAnStablishment()
    ).establishment.id;

    const product = await request(app)
      .post("/api/product")
      .send(productData)
      .set("Authorization", "Bearer " + generateToken(true));

    const response = await request(app)
      .patch(`/api/product/${product.body.id}`)
      .send({ name: "test" })
      .set("Authorization", "Bearer " + generateToken(true));

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("test");
  });

  test("Should not be able to patch a invalid product", async () => {
    const response = await request(app)
      .patch(`/api/product/${uuid()}`)
      .send({ name: "test" })
      .set("Authorization", "Bearer " + generateToken(true));

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Product not found");
  });

  test("Should not be able to patch a product's categories", async () => {
    productData.establishmentId = (
      await createAnStablishment()
    ).establishment.id;

    const product = await request(app)
      .post("/api/product")
      .send(productData)
      .set("Authorization", "Bearer " + generateToken(true));

    const response = await request(app)
      .patch(`/api/product/${product.body.id}`)
      .send({ categories: ["Carnes"] })
      .set("Authorization", "Bearer " + generateToken(true));

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("You cannot change categories");
  });
});
