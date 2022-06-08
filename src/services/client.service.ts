class ClientService {
  createClient = () => {
    return { status: 200, message: " post client" };
  };
  patchClient = () => {
    return { status: 200, message: "patch client" };
  };
}

export default new ClientService();
