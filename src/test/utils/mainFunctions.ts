import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { sign } from "jsonwebtoken";
import app from "../..";
import { User } from "../../entities/user.entity";
import { generateRandomNumbers } from "./auxiliaryFunctions";

const generateToken = (isAdm: boolean) => {
  return sign(
    { email: "test@mail.com", isAdmin: isAdm },
    process.env.SECRET_KEY as string,
    {
      expiresIn: process.env.EXPIRES_IN as string,
    }
  );
};

const login = async ({ email, password }) => {
  const response = await supertest(app)
    .post("/api/signin")
    .send({ email, password });

  return response;
};

const generateUserWithToken = async (admin: boolean = false) => {
  let user = {
    name: faker.name.firstName(),
    email: faker.internet.email().toLocaleLowerCase(),
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
    contact: faker.phone.number(),
  } as Partial<User>;

  if (admin) {
    user.isAdmin = true;
  }

  const userData = await supertest(app)
    .post("/api/signup")
    .send(user)
    .set("Authorization", "Bearer " + generateToken(admin));

  const token = await login({ email: user.email, password: user.password });

  return {
    user: userData.body,
    token: token.body.token,
  };
};

const createAnStablishment = async () => {
  const user = await generateUserWithToken(true);

  const response = await supertest(app)
    .post("/api/establishment")
    .send({
      name: faker.company.companyName(),
      cnpj: `11.0000.33/${generateRandomNumbers(1000, 9999)}-09`,
      address: {
        street: "Rua dos Bobos",
        number: generateRandomNumbers(1, 999),
        zipCode: `33.333-${generateRandomNumbers(100, 200)}`,
        district: faker.address.city(),
      },
      contact: faker.phone.number(),
      urlLogo: faker.image.avatar(),
      userId: user.user.id,
    })
    .set("Authorization", "Bearer " + user.token);

  return { establishment: response.body, token: user.token };
};

export { generateUserWithToken, generateToken, login, createAnStablishment };
