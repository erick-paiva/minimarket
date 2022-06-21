import { config } from "dotenv";
import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { Payment } from "../entities/payment.entity";
import { Product } from "../entities/product.entity";
import { Sale } from "../entities/sale.entity";
import { User } from "../entities/user.entity";
import ErrorHTTP from "../errors/ErrorHTTP";
import { userRepo, saleRepo, clientRepo } from "../repositories";
import productRepository from "../repositories/product.repository";
import { serializedCreateSaleSchema } from "../schemas/sale/create.schema";
import { identifiesIfTheRepositoryExists } from "../utils/establishment";

config();

// validated = {
//   clientID: "uuid",
//   paymentId: "uuid",
//   products: [{ productId: "uuid", quantity: 2 }],
// };

class SaleService {
  createSale = async ({ validated }: Request) => {
    // Verificando se tem usuário
    const userFound = (await userRepo.findOne({
      id: validated.userId,
    })) as User | null;

    if (!userFound) {
      throw new ErrorHTTP(404, "User not found");
    }

    // Verificando se tem Cliente
    const clientFound = (await clientRepo.findOne({
      id: validated.clientId,
    })) as Client | null;

    if (!clientFound) {
      throw new ErrorHTTP(404, "Client not found");
    }
    const paymentFound = AppDataSource.getRepository(Payment);
    // Pegando o tipo do pagamaneto
    const payment = (await paymentFound.findOne({
      where: { id: validated.paymentId },
    })) as Payment | null;

    // Instanciando a venda
    const sale = new Sale();

    // Pegando os produtos do response
    const products = validated.products;

    console.log(products, "products");

    // For que verifica se tem os produtos e adiciano na venda
    for (let i = 0; i < products.lenght; i++) {
      const product = products[i];
      const productFound = (await productRepository.findOne({
        id: product.id,
      })) as Product | null;

      if (!productFound) {
        throw new ErrorHTTP(404, `Product ${product.id} not found`);
      }

      sale.client = clientFound;
      sale.products = [...sale.products, productFound];
      const saleTotal =
        sale.saleTotal + productFound.salePrice * product.quantity;
      sale.saleTotal = Number.parseFloat(saleTotal.toFixed(2));
    }

    // Salvando a venda
    const newSale = await saleRepo.save(sale);

    console.log(newSale);

    //Retornando o sale
    return await serializedCreateSaleSchema.validate(newSale, {
      stripUnknown: true,
    });
  };

  patchSale = () => {
    return { status: 200, message: "patch sale" };
  };
  getSales = (establishmentId) => {
    return { status: 200, message: "get sales" };
  };
}

export default new SaleService();
