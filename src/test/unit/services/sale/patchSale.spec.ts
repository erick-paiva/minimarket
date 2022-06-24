import { config } from "dotenv";
import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../../..";
import { AppDataSource } from "../../../../data-source";
import { createAnSale } from "../../../utils/mainFunctions";

config();

describe("Update sale test", () => {
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

  it("Should return 404 if the sale does not exist", async () => {
    const { token } = await createAnSale();
    const invalidId = "9cc26733-4de1-4a60-88af-082a7a8fb0d1";
    const payment = { payment: 100 };

    const response = await supertest(app)
      .patch(`/api/sale/${invalidId}`)
      .send(payment)
      .set("Authorization", "Bearer " + token);

    expect(response.body.id).not.toBeDefined();
    expect(response.body).toStrictEqual({
      error: "Sale not found",
    });
    expect(response.status).toBe(404);
  });

  it("Should return 409 if the sale is already paid", async () => {
    const { sale, token } = await createAnSale();

    const payment = { payment: 100 };

    const response = await supertest(app)
      .patch(`/api/sale/${sale.id}`)
      .send(payment)
      .set("Authorization", "Bearer " + token);
    expect(response.body.id).not.toBeDefined();
    expect(response.body).toStrictEqual({
      message: "this sale is already paid",
    });
    expect(response.status).toBe(409);
  });

  it("Should return 200 ok if the payment goes through", async () => {
    const { sale, token } = await createAnSale(false);

    const expectResponse = {
      message: {
        isPaid: false,
        remainToPay: sale.saleTotal - 1,
        thing: 0,
      },
    };

    const payment = { payment: 1 };

    const response = await supertest(app)
      .patch(`/api/sale/${sale.id}`)
      .send(payment)
      .set("Authorization", "Bearer " + token);
    expect(response.body.message).toBeDefined();
    expect(response.body).toStrictEqual(expectResponse);
    expect(response.status).toBe(200);
  });

  it("It should return 200 ok if the payment is correct and it should return the paid with true", async () => {
    const { sale, token } = await createAnSale(false);

    const expectResponse = {
      message: {
        isPaid: true,
        remainToPay: 0,
        thing: 0,
      },
    };

    const payment = { payment: sale.saleTotal };

    const response = await supertest(app)
      .patch(`/api/sale/${sale.id}`)
      .send(payment)
      .set("Authorization", "Bearer " + token);
    expect(response.body.message).toBeDefined();
    expect(response.body).toStrictEqual(expectResponse);
    expect(response.status).toBe(200);
  });
});
