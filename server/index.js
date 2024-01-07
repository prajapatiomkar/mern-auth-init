import express from "express";

import { configDotenv } from "dotenv";
configDotenv();
import errorController from "./controllers/errorController.js";

import { rootRoute, userRoute } from "./routes/routes.js";
import db from "./utils/db.js";

const app = express();
const router = express.Router();

db();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

router.use(rootRoute);
router.use(userRoute);

app.use(errorController);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`\nserver is up and running a port=${PORT} 🚀\n`);
});
