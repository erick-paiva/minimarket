import { Request, Response } from "express";
import ProductService from "../services/product.service";
import { handleError } from "../errors/appError";
class ProductController {
  createProduct = async (req: Request, res: Response) => {
    const productToSave = req.body;
    const userEmail = req.decoded.email;
    const establishmentId = req.body.establishmentId;
    const categories = req.body.categories;
    delete productToSave.categories;
    delete productToSave.establishmentId;
    const UserIsAdmin = req.decoded.isAdmin;
    try {
      const product = await ProductService.createProduct(
        productToSave,
        userEmail,
        establishmentId,
        UserIsAdmin,
        categories
      );
      return res.status(201).json(product);
    } catch (err) {
      return handleError(err, res);
    }
  };
  patchProduct = async (req: Request, res: Response) => {
    return res.status(200).json(await ProductService.patchProduct(req));
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
