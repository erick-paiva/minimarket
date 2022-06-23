import { Request, Response } from "express";
import { Client } from "../entities/client.entity";
import { Payment } from "../entities/payment.entity";
import { Product } from "../entities/product.entity";
import { Sale } from "../entities/sale.entity";
import { User } from "../entities/user.entity";
import ErrorHTTP from "../errors/ErrorHTTP";
import {
  userRepo,
  saleRepo,
  clientRepo,
  PaymentRepo,
  establishmentRepo,
} from "../repositories";
import productRepository from "../repositories/product.repository";
import {
  serializedObjSaleSchema,
  serializedArrSaleSchema,
} from "../schemas/sale/serializedSale.schema";

class SaleService {
  createSale = async ({ validated }: Request) => {
    const userFound = (await userRepo.findOne({
      id: validated.userId,
    })) as User | null;

    if (!userFound) {
      throw new ErrorHTTP(404, "User not found");
    }

    const clientFound = (await clientRepo.findOne({
      id: validated.clientId,
    })) as Client | null;

    if (!clientFound) {
      throw new ErrorHTTP(404, "Client not found");
    }

    const EstablishmentFound = await establishmentRepo.findOne({
      id: validated.establishmentId,
    });

    if (!EstablishmentFound) {
      throw new ErrorHTTP(404, "Establishment not found");
    }

    const payment = (await PaymentRepo.findOne({
      id: validated.paymentId,
    })) as Payment | null;

    const products = validated.products;

    let productsA = [];
    let saleTotal = 0;

    for (let p of products) {
      const productFound = (await productRepository.findOne({
        id: p.id,
      })) as Product | null;

      if (!productFound) {
        throw new ErrorHTTP(404, `Product ${p.id} not found`);
      }

      productsA.push(productFound);
      saleTotal += productFound.salePrice * p.quantity;
    }

    const sale = new Sale();
    sale.saleTotal = Number.parseFloat(saleTotal.toFixed(2));
    sale.client = clientFound;
    sale.isPaid = payment.formOfPagament === "À vista" ? true : false;
    sale.paidDate = new Date().toString();
    sale.payment = payment;
    sale.establishment = EstablishmentFound;
    sale.products = productsA;
    sale.remainToPay = 0;

    const newSale = await saleRepo.save(sale);

    return await serializedObjSaleSchema.validate(newSale, {
      stripUnknown: true,
    });
  };

  patchSale = async (saleId: string, payment: number) => {
    const sale = await saleRepo.findOne({
      id: saleId,
    });

    if (!sale) {
      throw new ErrorHTTP(404, "Sale not found");
    }

    if (sale.isPaid) {
      return { status: 409, message: "this sale is already paid" };
    }

    const newSale = {} as Partial<Sale>;

    let newPayment =
      sale.remainToPay > 0
        ? sale.remainToPay - payment
        : sale.saleTotal - payment;
    let thing = 0;

    if (newPayment < 0) {
      thing = newPayment * -1;
      newSale.isPaid = true;
      newSale.remainToPay = 0;
    } else if (newPayment === 0) {
      newSale.isPaid = true;
      newSale.remainToPay = 0;
    } else {
      newSale.isPaid = false;
      newSale.remainToPay = newPayment;
    }

    newSale.paidDate = new Date().toString();

    await saleRepo.update(sale.id, { ...newSale });

    return {
      status: 200,
      message: {
        isPaid: newSale.isPaid,
        remainToPay: newSale.remainToPay,
        thing,
      },
    };
  };

  getSales = async ({ params }: Request) => {
    const salesData = await saleRepo.all();

    const sales = salesData.filter(
      (sale) => sale.establishment.id === params.id
    );

    return await serializedArrSaleSchema.validate(sales, {
      stripUnknown: true,
    });
  };

  getSaleById = async (req: Request, res: Response) => {
    try {
      const sale = await saleRepo.findOneBy(req.params.id);

      if (!sale) {
        throw new ErrorHTTP(404, `Sale with id ${req.params.id} not found.`);
      }

      if (sale[0].establishment.user.id !== req.params.userId) {
        throw new ErrorHTTP(403, `Sale with id ${req.params.id} not found.`);
      }

      return await serializedObjSaleSchema.validate(sale[0], {
        stripUnknown: true,
      });
    } catch (err: any) {
      if (err instanceof ErrorHTTP) {
        return res.status(err.statusCode).json({
          error: err.message,
        });
      }
      throw new ErrorHTTP(404, `The id ${req.params.id} is not valid`);
    }
  };
}

export default new SaleService();
