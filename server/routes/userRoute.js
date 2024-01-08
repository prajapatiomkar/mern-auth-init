import express from "express";
import {
  userLoginController,
  userLogoutController,
  userRegisterController,
} from "../controllers/userController.js";
import { registerUserValidation } from "../validations/user/user.validation.js";

const router = express.Router();

router.post("/register", registerUserValidation, userRegisterController);
router.post("/login", userLoginController);
router.delete("/logout", userLogoutController);

export default router;
