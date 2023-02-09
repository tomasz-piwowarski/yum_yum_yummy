import express from "express";
import * as userController from "../controllers/userController";
import * as postController from "../controllers/postController";
import {
	checkValidation,
	validatePostCreation,
	validatePostEdit,
	validateCommentCreation,
	validateCommentEdit,
} from "../validators";
import { getCache, setCache, deleteCacheById } from "../utils/redis";

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

router.get(
	"/preferencesPosts",
	userController.getKnnUsers,
	postController.getPreferencesPosts
);

router.post(
	"/",
	multer(multerOptions).array("files"),
	validatePostCreation,
	checkValidation,
	postController.createPost
);

router.get("/single/:post_id", getCache, postController.getPost, setCache);

router.get("/search", postController.getSearchPost);

router.patch(
	"/:post_id",
	multer(multerOptions).array("files"),
	validatePostEdit,
	checkValidation,
	postController.editPost
);

router.delete("/:post_id", postController.deletePost);

router.post(
	"/comment",
	deleteCacheById,
	validateCommentCreation,
	checkValidation,
	postController.addComment
);

// router.delete("/comment/:post_id/:comment_id", postController.deleteComment);

// router.patch(
// 	"/comment/:comment_id",
// 	validateCommentEdit,
// 	checkValidation,
// 	postController.editComment
// );

router.patch(
	"/like/:post_id",
	deleteCacheById,
	postController.toggleLike,
	userController.changePreference
);

export default router;
