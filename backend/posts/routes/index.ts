import express from "express";
import * as postController from "../controllers/postControllers";
import * as commentController from "../controllers/commentController";
import * as photoController from "../controllers/photoController";

const router = express.Router();

router.post(
	"/",
	photoController.upload,
	photoController.resizeAndSave,
	postController.createPost
);

router.get("/single/:id", postController.getPost);

router.get("/search", postController.getSearchPosts);

router.get("/preferencesPosts", postController.getPreferencesPosts);

router.patch(
	"/:id",
	photoController.upload,
	postController.checkIfUserIsPostCreator,
	photoController.resizeAndSave,
	postController.editPost
);

router.delete(
	"/:id",
	postController.checkIfUserIsPostCreator,
	postController.deletePost
);

router.patch("/like/:id", postController.toggleLike);

router.post("/comment", commentController.addComment);

router.delete(
	"/comment/:post_id/:comment_id",
	commentController.checkIfUserIsCommentCreator,
	commentController.deleteComment
);

router.patch(
	"/comment/:comment_id",
	commentController.checkIfUserIsCommentCreator,
	commentController.editComment
);

router.post("/test", postController.createPost);
router.patch(
	"/test/:id",
	postController.checkIfUserIsPostCreator,
	postController.editPost
);

export default router;
