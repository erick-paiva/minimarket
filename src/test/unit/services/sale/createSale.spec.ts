import { config } from "dotenv";
import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../../..";
import { AppDataSource } from "../../../../data-source";
import { sign } from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import request from "supertest";
import { serializedCreateSaleSchema } from "../../../../schemas/sale/create.schema";
import { Client } from "../../../../entities/client.entity";
import clientsController from "../../../../controllers/clients.controller";

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

  // const userData = {
  //   name: faker.name.firstName(),
  //   email: faker.internet.email().toLocaleLowerCase(),
  //   password: faker.internet.password(),
  //   avatar: faker.image.avatar(),
  //   contact: faker.phone.phoneNumber(),
  // };

  const clientData = {
    name: faker.name.firstName(),
    avatar: faker.image.avatar(),
    contact: faker.phone.phoneNumber(),
    payDay: 25,
    isDeptor: false,
    isLate: false,
    isActivate: true,
    establishmentId: faker.company.companyName(),
  };

  // mocando cliente
  const createClient = async (data: any) => {
    const client = await request(app)
      .post("/api/client")
      .send(data)
      .set("Authorization", "Bearer " + token(true));
    return client.body.id;
  };

  // mocando pagamento
  const getPayment = async (type: number) => {
    const payments = await request(app)
      .get("/api/payment")
      .send()
      .set("Authorization", "Bearer " + token(true));
    return payments.body[type].id;
  };

  // mocando o produto
  const getProduct = async (product: number) => {
    const establishment = await supertest(app)
      .get("/api/establishment")
      .send()
      .set("Authorization", `Beare ${token(true)}`);

    const products = await request(app)
      .get(`/api/product/${establishment.body[0].id}`)
      .send()
      .set("Authorization", "Bearer " + token(true));
    return products.body[product].id;
  };

  // TESTAR A CRIAÇÃO DA VENDA
  test("Should be able to create a new sale", async () => {
    // montando o corpo da requisição
    const saleData = {
      clientId: createClient(clientData),
      paymentId: getPayment(1),
      products: [{ productId: getProduct(1), quantity: 1 }],
    };

    // Testando a criação da venda
    const response = await request(app)
      .post("/api/sale")
      .send(saleData)
      .set("Authorization", "Bearer " + token(true));

    expect(response.status).toBe(201);
    expect(response.body).toBe(
      serializedCreateSaleSchema.validate(saleData, { stripUnknown: true })
    );
  });

  // TESTAR CRIAÇÃO COM ERRO DE CLIENTE
  test("Should be able to create a new sale", async () => {
    // montando o corpo da requisição
    const saleData = {
      clientId: "gfhjhkhjkhtdfdf",
      paymentId: getPayment(1),
      products: [{ productId: getProduct(1), quantity: 1 }],
    };

    // Testando a criação da venda
    const response = await request(app)
      .post("/api/sale")
      .send(saleData)
      .set("Authorization", "Bearer " + token(true));

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Client not found");
  });
});

// passando cliente que nao existe
// passando tipo de pagamento que nao existe
// passando produto que nao existe
// passando quantidade errada
