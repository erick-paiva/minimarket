import ProductRepo from "../repositories/product.repository";
import establishmentRepository from "../repositories/establishment.repository";
import { Product } from "../entities/product.entity";
import { Establishment } from "../entities/establishment.entity";
import ErrorHTTP from "../errors/ErrorHTTP";

class ProductService {
  createProduct = async (
    productToSave: Product,
    userEmail: string,
    establishmentId: string,
    UserIsAdmin: boolean
  ) => {
    const searchForEstablishment: Establishment =
      await establishmentRepository.findOne({
        id: establishmentId,
      });
    if (!searchForEstablishment) {
      throw new ErrorHTTP(404, "Establishment not found");
    }
    const establishmentOwner = searchForEstablishment.user;
    if (establishmentOwner.email !== userEmail && !UserIsAdmin) {
      throw new ErrorHTTP(401, "You're not the owner of this establishment");
    }

    const establishmentProducts = searchForEstablishment.products;
    const productAlreadyExists = establishmentProducts.find(
      (product: Product) =>
        product.name.toLocaleLowerCase() ===
        productToSave.name.toLocaleLowerCase()
    );
    if (productAlreadyExists) {
      throw new ErrorHTTP(
        409,
        `You already have a product calls  ${productAlreadyExists.name.toLocaleLowerCase()}`
      );
    }

    productToSave.establishment = searchForEstablishment;

    await ProductRepo.save(productToSave);

    const getNewProduct = await ProductRepo.findOne({
      name: productToSave.name,
    });
    return getNewProduct;
  };

  patchProduct = () => {
    return { status: 200, message: "patch product" };
  };

  getProducts = async (
    establishmentId: string,
    userEmail: string,
    UserIsAdmin: boolean
  ) => {
    const searchForEstablishment: Establishment =
      await establishmentRepository.findOne({
        id: establishmentId,
      });
    if (!searchForEstablishment) {
      throw new ErrorHTTP(
        404,
        "Establishment not found. Try with other establishmentId"
      );
    }
    const establishmentOwner = searchForEstablishment.user;
    if (establishmentOwner.email !== userEmail && !UserIsAdmin) {
      throw new ErrorHTTP(
        401,
        "You're not the owner of this establishment. So you can't see the products."
      );
    }
    const establishmentProducts = searchForEstablishment.products;
    return establishmentProducts;
  };
}

export default new ProductService();
