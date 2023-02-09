import express from "express";
import * as profileController from "../controllers/profileController";
import * as photoController from "../controllers/photoController";

import multer from "multer";
const multerOptions: multer.Options = {
	storage: multer.memoryStorage(),
	fileFilter(_req: any, file: Express.Multer.File, cb: any) {
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb({ message: "That filetype is not allowed!" }, false);
		}
	},
};

const router = express.Router();

router.get("/auth/:_id", profileController.getProfileByUserId);

router.get("/:_id", profileController.getProfile);

router.patch("/follow/:follow_id", profileController.toggleFollow);

router.post("/", profileController.createProfile);

router.patch(
	"/:profile_id",
	photoController.upload,
	photoController.resizeAndSave,
	profileController.checkIfUserIsProfileOwner,
	profileController.editProfile
);

router.delete(
	"/:profile_id",
	profileController.checkIfUserIsProfileOwner,
	profileController.deleteProfile
);

router.patch(
	"/test/:profile_id",
	profileController.checkIfUserIsProfileOwner,
	profileController.editProfile
);

export default router;
