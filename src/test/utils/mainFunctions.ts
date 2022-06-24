import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { sign } from "jsonwebtoken";
import app from "../..";
import { User } from "../../entities/user.entity";
import { generateRandomNumbers } from "./auxiliaryFunctions";
import { AppDataSource } from "../../data-source";
import { Payment } from "../../entities/payment.entity";
import { Category } from "../../entities/category.entity";
import { defaultCategories, paymentMethods } from "./defaultValues";

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

const createAnClient = async () => {
  const user = await generateUserWithToken(true);
  const { establishment } = await createAnStablishment();

  const response = await supertest(app)
    .post("/api/client")
    .send({
      name: faker.name.firstName(),
      avatar: faker.image.avatar(),
      contact: faker.phone.number(),
      payDay: generateRandomNumbers(1, 31),
      establishment: establishment.id,
      isActicvate: true,
      isLate: false,
      isActivate: true,
      isDeptor: true,
    })
    .set("Authorization", "Bearer " + user.token);

  return { client: response.body, token: user.token };
};

const createAnProduct = async () => {
  const user = await generateUserWithToken(true);
  const { establishment } = await createAnStablishment();

  const response = await supertest(app)
    .post("/api/product")
    .send({
      name: faker.name.firstName(),
      description: faker.name.firstName(),
      salePrice: generateRandomNumbers(10, 1000),
      costPrice: generateRandomNumbers(10, 1000),
      payday: generateRandomNumbers(1, 31),
      unitType: "unidade",
      urlImg: faker.image.food(),
      establishmentId: establishment.id,
      categories: ["Congelados"],
    })
    .set("Authorization", "Bearer " + user.token);

  return { product: response.body, token: user.token };
};

const createAnPaymentMethod = async (methods = paymentMethods) => {
  const paymentRepo = AppDataSource.getRepository(Payment);
  let payments;
  try {
    payments = await paymentRepo
      .createQueryBuilder()
      .insert()
      .values(methods as Partial<Payment>[])
      .execute();
  } catch (error) {
    return { error: "Payment Already exists" };
  }

  return { payments: payments };
};

const createAnCategory = async (categoryes = defaultCategories) => {
  const categoryRepo = AppDataSource.getRepository(Category);

  let category;

  try {
    category = await categoryRepo
      .createQueryBuilder()
      .insert()
      .values(categoryes as Partial<Category>[])
      .execute();
  } catch (error) {
    return { error: "Category Already exists" };
  }

  return { category: category };
};

const getPaymentMethods = async () => {
  await createAnPaymentMethod();
  await createAnCategory();

  const user = await generateUserWithToken(true);

  const response = await supertest(app)
    .get("/api/paymentMethods")
    .set("Authorization", "Bearer " + user.token);

  return { payments: response.body, token: user.token };
};

const createAnSale = async (inCash = true) => {
  const { client, token } = await createAnClient();
  const { payments } = await getPaymentMethods();
  const { product } = await createAnProduct();
  const { establishment } = await createAnStablishment();

  
  const saleData = {
    clientId: client.id,
    paymentId: payments[inCash ? 0 : 1].id,
    establishmentId: establishment.id,
    products: [
      {
        id: product.id,
        quantity: generateRandomNumbers(1, 1000),
      },
    ],
  };
  
  const response = await supertest(app)
  .post("/api/sale")
  .send(saleData)
  .set("Authorization", "Bearer " + token);
  
  return { sale: response.body, saleData, token: token };
};

export {
  generateUserWithToken,
  generateToken,
  login,
  createAnStablishment,
  createAnClient,
  createAnSale,
  createAnProduct,
  createAnPaymentMethod,
  createAnCategory,
};
