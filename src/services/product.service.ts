class ProductService {
  createProduct = () => {
    return { status: 200, message: " post product" };
  };
  patchProduct = () => {
    return { status: 200, message: "patch product" };
  };
}

export default new ProductService();
