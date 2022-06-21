import { AppDataSource } from "../data-source";
import ProductRepo from "../repositories/product.repository";
import { Request } from "express";
import establishmentRepository from "../repositories/establishment.repository";
import { Product } from "../entities/product.entity";
import { Category } from "../entities/category.entity";
import { Establishment } from "../entities/establishment.entity";
import ErrorHTTP from "../errors/ErrorHTTP";
import { serializedCreateproductSchema } from "../schemas";

class ProductService {
  createProduct = async (
    productToSave: Product,
    userEmail: string,
    establishmentId: string,
    UserIsAdmin: boolean,
    categories: string[]
  ) => {
    const categoryRepository = AppDataSource.getRepository(Category);
    const allCategoriesNames: string[] = [];
    const allCategories: Category[] = [];
    (await categoryRepository.find()).forEach((category) => {
      allCategories.push(category);
      allCategoriesNames.push(category.name);
    });
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

    categories.forEach((category) => {
      if (!allCategoriesNames.includes(category)) {
        throw new ErrorHTTP(404, `The category ${category} is not valid`);
      }
    });

    const getCategories = () => {
      const result: Category[] = [];

      categories.forEach((category) => {
        allCategories.forEach((repoCategory) => {
          if (category === repoCategory.name) {
            result.push(repoCategory);
          }
        });
      });
      return result;
    };

    productToSave.establishment = searchForEstablishment;
    productToSave.categories = getCategories();

    await ProductRepo.save(productToSave);

    const getNewProduct = await ProductRepo.findOne({
      name: productToSave.name,
    });

    return await serializedCreateproductSchema.validate(getNewProduct, {
      stripUnknown: true,
    });
  };

  patchProduct = async ({ validated, params }: Request) => {
    const categoryRepository = AppDataSource.getRepository(Category);
    const { id } = params;

    const product = await ProductRepo.findOne({ id: id });

    if (!product) {
      throw new ErrorHTTP(404, "Product not found");
    }

    if (validated.categories !== undefined) {
      throw new ErrorHTTP(404, "You cannot change categories");
    }

    await ProductRepo.update(product.id, { ...(validated as Product) });

    const updatedProduct = await ProductRepo.findOne({ id: id });

    return await serializedCreateproductSchema.validate(updatedProduct, {
      stripUnknown: true,
    });
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
