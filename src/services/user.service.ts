class UserService {
  createUser = () => {
    return {status: 200, message: "create"}
  };
  loginUser = () => {
    return {status: 200, message: "login"}

  };
}

export default new UserService();
