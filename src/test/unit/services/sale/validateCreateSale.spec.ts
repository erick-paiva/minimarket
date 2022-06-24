import { config } from "dotenv";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { createAnSaleWithParams } from "../../../utils/mainFunctions";

config();

describe("Get establishment test", () => {
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

  const mockUuid = "f284f782-7a77-4bb0-a5b9-4c578ce49211";

  test("Sale as JSON response | Status code: 201", async () => {
    const { response } = await createAnSaleWithParams();
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  test("Should return 400 if the uuid type is invalid", async () => {
    const { response } = await createAnSaleWithParams("999");
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toStrictEqual([
      "clientId must be a valid UUID",
    ]);
  });

  test("Should return 404 if the clientId does not exist in the database", async () => {
    const { response } = await createAnSaleWithParams(mockUuid);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toStrictEqual("Client not found");
  });

  test("Should return 404 if the establishmentId does not exist in the database", async () => {
    const { response } = await createAnSaleWithParams("", mockUuid);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toStrictEqual("Establishment not found");
  });

  test("Should return 404 if the paymentId does not exist in the database", async () => {
    const { response } = await createAnSaleWithParams("", "", "", mockUuid);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toStrictEqual("Payment not found");
  });

  test("Should return 404 if any productId does not exist in the database", async () => {
    const { response } = await createAnSaleWithParams("", "", mockUuid);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toStrictEqual(`Product ${mockUuid} not found`);
  });
});
