export default {
  coverageProvider: "v8",
  preset: "ts-jest",
  transform: { "^.+\\.ts?$": "ts-jest" },
  testMatch: ["**/**/**/*.spec.ts"],
};
