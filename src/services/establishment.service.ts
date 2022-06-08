class EstablishmentService {
  createEstablishment = () => {
    return { status: 200, message: "create establishment" };
  };
  patchEstablishment = () => {
    return { status: 200, message: "patch establishment" };
  };
}

export default new EstablishmentService();
