import { config } from "dotenv";
import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../..";
import { AppDataSource } from "../../../data-source";
import { sign } from "jsonwebtoken";

config();

describe("Post Establishment test", () => {
  let connection: DataSource;

  let token = (isAdm: boolean) => {
    return sign(
      { email: "jhondoe@mail.com", isAdmin: isAdm },
      process.env.SECRET_KEY as string,
      {
        expiresIn: process.env.EXPIRES_IN as string,
      }
    );
  };

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

  test("Return: Establishment as JSON response | Status code: 201", async () => {
    const user = {
      name: "jhon Doe",
      email: "jhondoe@mail.com",
      contact: "044999999999",
      password: "12345",
      avatar: "https://images.uncyc.org/pt/1/18/Dobby_HarryPotter.jpg",
    };

    const createUserResponse = await supertest(app)
      .post("/api/signup")
      .send(user)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createUserResponse.status).toBe(201);

    const loginResponse = await supertest(app)
      .post("/api/signin")
      .send({ email: user.email, password: user.password });
    expect(loginResponse.status).toBe(200);

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

    const response = await supertest(app)
      .post("/api/establishment")
      .send(establishment)
      .set("Authorization", `Beare ${token(true)}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toStrictEqual({
      id: response.body.id,
      ...establishment,
    });
  });

  test("Return: Body error, User not found | Status code: 404", async () => {
    const body = {
      name: "Via c",
      cnpj: "30.0155138.77/0008-24",
      address: {
        street: "Rua z",
        number: 14011,
        zipCode: "25090-29",
        district: "Gova",
      },
      contact: "001427546",
      urlLogo:
        "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_960_7230.png",
      userId: "abc",
    };

    const response = await supertest(app)
      .post("/api/establishment")
      .send(body)
      .set("Authorization", `Beare ${token(true)}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toStrictEqual({
      error: "User not found",
    });
  });

  test("Return: Body error, Establishment with cnpj ${body.cnpj} already registered | Status code: 409", async () => {
    const user = {
      name: "jhon Doe",
      email: "jhondoe@mail.com",
      contact: "044999999999",
      password: "12345",
      avatar: "https://images.uncyc.org/pt/1/18/Dobby_HarryPotter.jpg",
    };

    const createUserResponse = await supertest(app)
      .post("/api/signup")
      .send(user)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createUserResponse.status).toBe(201);

    const loginResponse = await supertest(app)
      .post("/api/signin")
      .send({ email: user.email, password: user.password });
    expect(loginResponse.status).toBe(200);

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

    const body = {
      name: "Via Z",
      cnpj: "30.0155138.77/0008-24",
      address: {
        street: "Rua z",
        number: 10000,
        zipCode: "25000-29",
        district: "Gova",
      },
      contact: "02199999999",
      urlLogo:
        "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_960_7230.png",
      userId: createUserResponse.body.id,
    };

    const response = await supertest(app)
      .post("/api/establishment")
      .send(body)
      .set("Authorization", `Beare ${token(true)}`);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toStrictEqual({
      error: `Establishment with cnpj ${body.cnpj} already registered`,
    });
  });

  test("Return: Body error, Address number ${body.address.number} already registered | Status code: 409", async () => {
    const user = {
      name: "jhon Doe",
      email: "jhondoe@mail.com",
      contact: "044999999999",
      password: "12345",
      avatar: "https://images.uncyc.org/pt/1/18/Dobby_HarryPotter.jpg",
    };

    const createUserResponse = await supertest(app)
      .post("/api/signup")
      .send(user)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createUserResponse.status).toBe(201);

    const loginResponse = await supertest(app)
      .post("/api/signin")
      .send({ email: user.email, password: user.password });
    expect(loginResponse.status).toBe(200);

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

    const body = {
      name: "Via Z",
      cnpj: "30.1234567.77/0008-24",
      address: {
        street: "Rua z",
        number: 14011,
        zipCode: "25000-29",
        district: "Gova",
      },
      contact: "02188888888",
      urlLogo:
        "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_960_7230.png",
      userId: createUserResponse.body.id,
    };

    const response = await supertest(app)
      .post("/api/establishment")
      .send(body)
      .set("Authorization", `Beare ${token(true)}`);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toStrictEqual({
      error: `Address number ${body.address.number} already registered`,
    });
  });

  test("Return: Body error, Establishment with contact ${body.contact} already registered | Status code: 409", async () => {
    const user = {
      name: "jhon Doe",
      email: "jhondoe@mail.com",
      contact: "044999999999",
      password: "12345",
      avatar: "https://images.uncyc.org/pt/1/18/Dobby_HarryPotter.jpg",
    };

    const createUserResponse = await supertest(app)
      .post("/api/signup")
      .send(user)
      .set("Authorization", `Beare ${token(true)}`);
    expect(createUserResponse.status).toBe(201);

    const loginResponse = await supertest(app)
      .post("/api/signin")
      .send({ email: user.email, password: user.password });
    expect(loginResponse.status).toBe(200);

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

    const body = {
      name: "Via Z",
      cnpj: "30.1234567.77/0008-24",
      address: {
        street: "Rua z",
        number: 1777,
        zipCode: "25000-29",
        district: "Gova",
      },
      contact: "02299999999",
      urlLogo:
        "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_960_7230.png",
      userId: createUserResponse.body.id,
    };

    const response = await supertest(app)
      .post("/api/establishment")
      .send(body)
      .set("Authorization", `Beare ${token(true)}`);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toStrictEqual({
      error: `Establishment with contact ${body.contact} already registered`,
    });
  });
});
