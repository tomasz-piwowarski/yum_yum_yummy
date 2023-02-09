import express from "express";
import * as userController from "../controllers/userController";
import * as profileController from "../controllers/profileController";
import {
	validateLogin,
	validateRegister,
	validateUser,
	checkValidation,
} from "../validators";

const router = express.Router();

router.post(
	"/login",
	userController.checkNotAuth,
	validateLogin,
	checkValidation,
	userController.loginUser
);

router.post(
	"/register",
	userController.checkNotAuth,
	validateRegister,
	checkValidation,
	userController.registerUser,
	profileController.createProfile
);

router.get("/loginSuccess", userController.loginSuccess);

router.delete("/logout", userController.checkAuth, userController.logout);

router.patch(
	"/edit/:user_id",
	userController.checkAuth,
	validateUser,
	checkValidation,
	userController.editUser
);

router.get("/checkAuth", userController.checkIfAuthenticated);

export default router;
