import { config } from "dotenv";
import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../..";
import { AppDataSource } from "../../../data-source";
import { sign } from "jsonwebtoken";

config();

describe("Post Establishment test", () => {
  let connection: DataSource;

  beforeEach(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterEach(async () => {
    await connection.destroy();
  });

  const user = {
    name: "jhon Doe",
    email: "jhondoe@mail.com",
    contact: "044999999999",
    password: "12345",
    avatar: "https://images.uncyc.org/pt/1/18/Dobby_HarryPotter.jpg",
  };

  const user2 = {
    name: "jhoanna",
    email: "jhoanna@mail.com",
    contact: "055999999999",
    password: "12345",
    avatar: "https://images.uncyc.org/pt/1/18/Dobby_HarryPotter.jpg",
  };

  let token = (isAdm: boolean) => {
    return sign(
      { email: user.email, isAdmin: isAdm },
      process.env.SECRET_KEY as string,
      {
        expiresIn: process.env.EXPIRES_IN as string,
      }
    );
  };

  test("Return: Establishment updated as JSON response | Status code: 200", async () => {
    const createUserResponse = await supertest(app)
      .post("/api/signup")
      .send(user)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createUserResponse.status).toBe(201);

    const createUser2Response = await supertest(app)
      .post("/api/signup")
      .send(user2)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createUserResponse.status).toBe(201);

    const establishment = {
      name: "Bar do Zé",
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
      userId: createUserResponse.body.id,
    };

    const createEstablishmentResponse = await supertest(app)
      .post("/api/establishment")
      .send(establishment)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createEstablishmentResponse.status).toBe(201);
    expect(createEstablishmentResponse.body.id).toBeDefined();

    let { id } = createEstablishmentResponse.body;

    establishment.name = "Bar do Jhoe";
    establishment.cnpj = "33.333666.33/0033-33";
    establishment.contact = "02111999999";
    establishment.address = Object.assign(establishment.address, {
      street: "Rua Arlindo Bonfin",
      number: 17471,
    });
    establishment.userId = createUser2Response.body.id;

    const response = await supertest(app)
      .patch(`/api/establishment/${id}`)
      .send(establishment)
      .set("Authorization", `Beare ${token(true)}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  test("Return: Body error, User not found | Status code: 404", async () => {
    const createUserResponse = await supertest(app)
      .post("/api/signup")
      .send(user)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createUserResponse.status).toBe(201);

    const establishment = {
      name: "Bar do Zé",
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
      userId: createUserResponse.body.id,
    };

    const createEstablishmentResponse = await supertest(app)
      .post("/api/establishment")
      .send(establishment)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createEstablishmentResponse.status).toBe(201);
    expect(createEstablishmentResponse.body.id).toBeDefined();

    let { id } = createEstablishmentResponse.body;

    establishment.name = "Bar do Jhoe";
    establishment.cnpj = "33.333666.33/0033-33";
    establishment.contact = "02111999999";
    establishment.address = Object.assign(establishment.address, {
      street: "Rua Arlindo Bonfin",
      number: 17471,
    });
    establishment.userId = "xxxxxxxxxxxxxxxxxxx";

    const response = await supertest(app)
      .patch(`/api/establishment/${id}`)
      .send(establishment)
      .set("Authorization", `Beare ${token(true)}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toStrictEqual({
      error: "User not found",
    });
  });

  test("Return: Body error, Establishment with cnpj ${body.cnpj} already registered | Status code: 409", async () => {
    const createUserResponse = await supertest(app)
      .post("/api/signup")
      .send(user)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createUserResponse.status).toBe(201);

    const establishment = {
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
      userId: createUserResponse.body.id,
    };

    const createEstablishmentResponse = await supertest(app)
      .post("/api/establishment")
      .send(establishment)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createEstablishmentResponse.status).toBe(201);

    let { id } = createEstablishmentResponse.body;

    establishment.name = "Bar do Jhoe";
    establishment.contact = "02111999999";
    establishment.address = Object.assign(establishment.address, {
      street: "Rua Arlindo Bonfin",
      number: 17471,
    });
    establishment.userId = createUserResponse.body.id;

    const response = await supertest(app)
      .patch(`/api/establishment/${id}`)
      .send(establishment)
      .set("Authorization", `Beare ${token(true)}`);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toStrictEqual({
      error: `Establishment with cnpj ${establishment.cnpj} already registered.`,
    });
  });

  test("Return: Body error, Address number ${body.address.number} already registered | Status code: 409", async () => {
    const createUserResponse = await supertest(app)
      .post("/api/signup")
      .send(user)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createUserResponse.status).toBe(201);

    const establishment = {
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
      userId: createUserResponse.body.id,
    };

    const createEstablishmentResponse = await supertest(app)
      .post("/api/establishment")
      .send(establishment)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createEstablishmentResponse.status).toBe(201);

    let { id } = createEstablishmentResponse.body;

    establishment.name = "Bar do Jhoe";
    establishment.contact = "02111999999";
    establishment.cnpj = "33.333666.33/0033-33";
    establishment.userId = createUserResponse.body.id;

    const response = await supertest(app)
      .patch(`/api/establishment/${id}`)
      .send(establishment)
      .set("Authorization", `Beare ${token(true)}`);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toStrictEqual({
      error: `Address number ${establishment.address.number} already registered`,
    });
  });

  test("Return: Body error, Establishment with contact ${body.contact} already registered | Status code: 409", async () => {
    const createUserResponse = await supertest(app)
      .post("/api/signup")
      .send(user)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createUserResponse.status).toBe(201);

    const establishment = {
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
      userId: createUserResponse.body.id,
    };

    const createEstablishmentResponse = await supertest(app)
      .post("/api/establishment")
      .send(establishment)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createEstablishmentResponse.status).toBe(201);

    let { id } = createEstablishmentResponse.body;

    establishment.name = "Bar do Jhoe";
    establishment.cnpj = "33.333666.33/0033-33";
    establishment.address = Object.assign(establishment.address, {
      street: "Rua Arlindo Bonfin",
      number: 17471,
    });
    establishment.userId = createUserResponse.body.id;

    const response = await supertest(app)
      .patch(`/api/establishment/${id}`)
      .send(establishment)
      .set("Authorization", `Beare ${token(true)}`);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toStrictEqual({
      error: `Establishment with contact ${establishment.contact} already registered`,
    });
  });
});
