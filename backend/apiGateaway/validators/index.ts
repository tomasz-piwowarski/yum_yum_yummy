import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
export {
	validateLogin,
	validateRegister,
	validateUser,
} from "./userValidators";

export {
	validatePostCreation,
	validatePostEdit,
	validateCommentCreation,
	validateCommentEdit,
} from "./postValidators";

export { validateProfileEdit } from "./profileValidators";

export const checkValidation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ error: true, data: errors });
	}

	next();
};
