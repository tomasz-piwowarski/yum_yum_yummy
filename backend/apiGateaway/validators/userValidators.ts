import { body } from "express-validator";

export const validateUser = [
	body("email")
		.trim()
		.escape()
		.isEmail()
		.normalizeEmail()
		.withMessage("Invalid e-mail address!"),
];

export const validateLogin = [
	...validateUser,
	body("email")
		.trim()
		.escape()
		.not()
		.isEmpty()
		.normalizeEmail()
		.withMessage("E-mail is required"),
	body("password")
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage("Password is required."),
];

export const validateRegister = [
	...validateLogin,
	body("username")
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage("Username is required"),
	body("password")
		.trim()
		.escape()
		.isLength({ min: 3 })
		.withMessage("Password must be at least 3 characters long."),
];
