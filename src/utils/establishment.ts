const identifiesIfTheRepositoryExists = (repository: string) => {
  const repositories = [
    "adresses",
    "establishments",
    "users",
    "clients",
    "categories",
    "products",
    "payments",
    "sales",
  ];

  const find = repositories.find((repo) => repo.includes(repository));

  if (!find) {
    return ""
  }

  return find;
};

export { identifiesIfTheRepositoryExists };
