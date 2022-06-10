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
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.save(validated);
    const createdUser = await userRepository.findOneBy({ id: user.id });
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

    const token = sign({ id: user.email }, process.env.SECRET_KEY as string, {
      expiresIn: process.env.EXPIRES_IN as string,
    });

    return {
      status: 200,
      message: {
        token,
      },
    };
  };
}

export default new UserService();
