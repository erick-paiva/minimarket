import { config } from "dotenv";
import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { Payment } from "../entities/payment.entity";
import { Product } from "../entities/product.entity";
import { Sale } from "../entities/sale.entity";
import { User } from "../entities/user.entity";
import ErrorHTTP from "../errors/ErrorHTTP";
import { userRepo, saleRepo, clientRepo, PaymentRepo } from "../repositories";
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

    // // Verificando se tem Cliente
    const clientFound = (await clientRepo.findOne({
      id: validated.clientId,
    })) as Client | null;

    if (!clientFound) {
      throw new ErrorHTTP(404, "Client not found");
    }

    // const paymentFound = AppDataSource.getRepository(Payment);
    // Pegando o tipo do pagamaneto

    // Instanciando a venda

    // let SaleTotal = 0;

    // // Pegando os produtos do response

    // // console.log(products, "products");

    const payment = (await PaymentRepo.findOne({
      id: validated.paymentId,
    })) as Payment | null;

    const products = validated.products;

    let productsA = [];
    let saleTotal = 0;

    // For que verifica se tem os produtos e adiciano na venda
    for (let p of products) {
      // const product = p;
      const productFound = (await productRepository.findOne({
        id: p.id,
      })) as Product | null;

      if (!productFound) {
        throw new ErrorHTTP(404, `Product ${p.id} not found`);
      }

      // const sale = new Sale
      productsA.push(productFound);
      saleTotal += productFound.salePrice * p.quantity;
    }

    const sale = new Sale();
    sale.saleTotal = Number.parseFloat(saleTotal.toFixed(2));
    sale.client = clientFound;
    sale.isPaid = payment.formOfPagament === "À vista" ? true : false;
    sale.paidDate = new Date().toString();
    sale.payment = payment;
    sale.products = productsA;
    sale.remainToPlay = 0;

    const newSale = await saleRepo.save(sale);

    // console.log(newSale);

    //Retornando o sale
    return await serializedCreateSaleSchema.validate(newSale, {
      stripUnknown: true,
    });

    return "ook";
  };

  patchSale = () => {
    return { status: 200, message: "patch sale" };
  };
  getSales = (establishmentId) => {
    return { status: 200, message: "get sales" };
  };
}

export default new SaleService();
