import { handleError } from "../errors/appError";
class SaleService {
  createSale = () => {
    return { status: 200, message: " post sale" };
  };
  patchSale = () => {
    return { status: 200, message: "patch sale" };
  };
  getSales = (establishmentId) => {
    return { status: 200, message: "get sales" };
  };
}

export default new SaleService();
