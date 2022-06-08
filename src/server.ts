import app from "./index";
import { AppDataSource } from "./data-source";

// AppDataSource.initialize()
// .then(() => {
//   console.log("Database Connected!");
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}/`);
});
// })
// .catch((err) => console.error(err));
