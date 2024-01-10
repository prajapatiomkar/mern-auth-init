import express from "express";
import {
  userLoginController,
  userLogoutController,
  userProfileController,
  userRegisterController,
} from "../controllers/userController.js";
import { registerUserValidation } from "../validations/user/user.validation.js";
import passport from "passport";
const router = express.Router();

router.post("/register", registerUserValidation, userRegisterController);
router.post("/login", userLoginController);
router.delete("/logout", userLogoutController);
router.get("/profile", passport.authenticate("jwt"), userProfileController);

export default router;
