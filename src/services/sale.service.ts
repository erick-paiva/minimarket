class SaleService {
  createSale = () => {
    return { status: 200, message: " post sale" };
  };
  patchSale = () => {
    return { status: 200, message: "patch sale" };
  };
}

export default new SaleService();
