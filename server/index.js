import express from "express";

import { configDotenv } from "dotenv";
configDotenv();
import errorController from "./controllers/errorController.js";
import rootRoute from "./routes/rootRoute.js";

const app = express();

app.use(rootRoute);
app.use(errorController);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is up and running a port=${PORT}🚀`);
});
