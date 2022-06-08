import { Request, Response } from "express";
import ProductService from "../services/product.service";
import { handleError } from "../errors/appError";
class ProductController {
  createProduct = async (req: Request, res: Response) => {
    try {
      const { status, message } = ProductService.createProduct();
      return res.status(status).json({ message: message });
    } catch (err) {
      return handleError(err, res);
    }
  };
  patchProduct = async (req: Request, res: Response) => {
    try {
      const { status, message } = ProductService.patchProduct();
      return res.status(status).json({ message: message });
    } catch (err) {
      return handleError(err, res);
    }
  };
}
export default new ProductController();
