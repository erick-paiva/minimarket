import { PaymentRepo } from "../repositories";
import PaymentRepository from "../repositories/Payment.repository";

class PaymentService {
  getPaymentsMethods = async () => {
    return await PaymentRepo.getAll();
  };
}

export default new PaymentService();
