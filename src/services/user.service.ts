import { User } from "../entities/user.entity";
import { Request } from "express";
import { serializedCreateUserSchema } from "../schemas";
import { AssertsShape } from "yup/lib/object";
import { AppDataSource } from "../data-source";

class userService {
  createUser = async ({ validated }: Request): Promise<AssertsShape<any>> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.save(validated);
    const createdUser = await userRepository.findOneBy({ id: user.id });
    return serializedCreateUserSchema.validate(createdUser);
  };
  loginUser = () => {
    return { status: 200, message: "login" };
  };
}

export default new userService();
