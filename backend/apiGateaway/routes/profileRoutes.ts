import express from "express";
import * as profileController from "../controllers/profileController";
import { getCache, setCache, deleteCache } from "../utils/redis";
import { checkValidation, validateProfileEdit } from "../validators";

import multer from "multer";
const multerOptions: multer.Options = {
	storage: multer.memoryStorage(),
	fileFilter(_req: any, file: Express.Multer.File, cb: any) {
		console.log(file);
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb({ message: "That filetype is not allowed!" }, false);
		}
	},
};

const router = express.Router();

router.get("/:profile_id", getCache, profileController.getProfile, setCache);

router.patch(
	"/follow/:follow_id",
	validateProfileEdit,
	checkValidation,
	profileController.toggleFollow
);

router.patch(
	"/:profile_id",
	deleteCache,
	multer(multerOptions).single("profilePicture"),
	profileController.editProfile
);

export default router;
