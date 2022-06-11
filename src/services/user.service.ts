import { User } from "../entities/user.entity";
import { Request } from "express";
import { serializedCreateUserSchema } from "../schemas";
import { AssertsShape } from "yup/lib/object";
import { AppDataSource } from "../data-source";
import userRepository from "../repositories/user.repository";
import { UserError } from "../errors/appError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
import ErrorHTTP from "../errors/ErrorHTTP";

config();
interface ILogin {
  status: number;
  message: object | string;
}

interface ILoginData {
  email: string;
  password: string;
}

class UserService {
  createUser = async ({ validated }: Request): Promise<AssertsShape<any>> => {
    const userAlreadyExists = (await userRepository.findOne({
      email: validated.email,
    })) as User | null;
    if (userAlreadyExists) {
      throw new ErrorHTTP(409, "Email already exists");
    }
    const user = await userRepository.save(
      Object.assign(new User(), validated)
    );
    const createdUser = await userRepository.findOne({ id: user.id });
    return await serializedCreateUserSchema.validate(createdUser, {
      stripUnknown: true,
    });
  };
  loginUser = async (userData: ILoginData): Promise<ILogin> => {
    const { email, password } = userData as ILoginData;

    const user = (await userRepository.findOne({ email })) as User | null;

    if (!user) {
      throw new UserError(404, "User not found");
    }

    const isValid = await compare(password, user?.password);

    if (!isValid) {
      throw new UserError(401, "Email or password is incorrect");
    }

    const token = sign(
      { email: user.email, isAdmin: user.isAdmin },
      process.env.SECRET_KEY as string,
      {
        expiresIn: process.env.EXPIRES_IN as string,
      }
    );

    return {
      status: 200,
      message: {
        token,
      },
    };
  };
}

export default new UserService();
