import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import errorController from "./controllers/errorController.js";
import cookieParser from "cookie-parser";
import { rootRoute, userRoute } from "./routes/routes.js";
import db from "./utils/db.js";
import session from "express-session";

import MongoStore from "connect-mongo";
import { DB_NAME, DB_URL } from "./utils/env.js";
import initializePassport from "./utils/passport.js";
import passport from "passport";

const app = express();
const router = express.Router();

db();
initializePassport(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRECT,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: `${DB_URL}/${DB_NAME}` }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api", router);

router.use(rootRoute);
router.use(userRoute);

app.use(errorController);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`\nserver is up and running a port=${PORT} 🚀\n`);
});
