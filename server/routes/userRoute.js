import express from "express";
import {
  userLoginController,
  userRegisterController,
} from "../controllers/userController.js";
import { registerUserValidation } from "../validations/user/user.validation.js";

const router = express.Router();

router.post("/register", registerUserValidation, userRegisterController);
router.post("/login", userLoginController);

export default router;
