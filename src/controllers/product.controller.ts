import { Request, Response } from "express";
import ProductService from "../services/product.service";
import { handleError } from "../errors/appError";
class ProductController {
  createProduct = async (req: Request, res: Response) => {
    const productToSave = req.body;
    const userEmail = req.decoded.email;
    const establishmentId = req.body.establishmentId;
    delete productToSave.establishmentId;
    const UserIsAdmin = req.decoded.isAdmin;
    try {
      const product = await ProductService.createProduct(
        productToSave,
        userEmail,
        establishmentId,
        UserIsAdmin
      );
      return res.status(201).json(product);
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

  getProducts = async (req: Request, res: Response) => {
    const { establishmentId } = req.params;
    const UserIsAdmin = req.decoded.isAdmin;
    const userEmail = req.decoded.email;

    try {
      const products = await ProductService.getProducts(
        establishmentId,
        userEmail,
        UserIsAdmin
      );
      return res.status(200).json(products);
    } catch (err) {
      return handleError(err, res);
    }
  };
}
export default new ProductController();
