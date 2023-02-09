import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/id/:id", userController.getById);

router.get("/email/:email", userController.getByEmail);

router.post(
	"/register",
	userController.checkIfEmailExists,
	userController.checkIfUsernameExists,
	userController.register
);

router.delete("/delete/:id", userController.deleteUser);

router.patch("/edit/:id", userController.edit);

router.get("/preference/:id", userController.getKnnUsers);

router.patch("/preference/:id", userController.changePreference);

export default router;
