class ClientService {
  createClient = () => {
    return { status: 200, message: "client" };
  };
}

export default new ClientService();
