/* USER*/
import {
  createUserSchema,
  serializedCreateUserSchema,
} from "./user/create.schema";

import {
  serializedAllUsers,
  serializedOneUser,
  userUpdateSchema,
} from "./user/user.schema";

/* CLIENT*/
import {
  createClientSchema,
  serializedCreateClientSchema,
  clientUpdateSchema,
} from "./client/create.schema";

/* ESTABLISHMENT*/
import {
  createEstablishmentSchema,
  serializedObjEstablishmentSchema,
  serializedArrEstablishmentSchema,
  updateEstablishmentSchema,
} from "./establishment";

/* PRODUCT*/
import { createProductSchema } from "./product/create.schema";

export {
  /* USER*/
  createUserSchema,
  serializedCreateUserSchema,
  userUpdateSchema,
  serializedAllUsers,
  serializedOneUser,
  /* ESTABLISHMENT*/
  createEstablishmentSchema,
  updateEstablishmentSchema,
  serializedObjEstablishmentSchema,
  serializedArrEstablishmentSchema,
  /* CLIENTE*/
  createClientSchema,
  serializedCreateClientSchema,
  clientUpdateSchema,
  /* PRODUCT*/
  createProductSchema,
};
