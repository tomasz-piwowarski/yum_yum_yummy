import { check } from "express-validator";

export const validatePostCreation = [
	check("type")
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage("Type is required."),
	check("region")
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage("Region is required."),
	check("category")
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage("Category is required."),
	check("description").trim().escape(),
	// check("steps").escape().isArray().withMessage("Steps data malformed."),
	// check("ingredients")
	// 	.escape()
	// 	.isArray()
	// 	.withMessage("Ingredients data malformed."),
	// check("tags").escape().isArray().withMessage(" data malformed."),
];

export const validatePostEdit = [
	check("type").escape().trim(),
	check("post_id")
		.escape()
		.trim()
		.not()
		.isEmpty()
		.withMessage("Post_id is required."),
	check("region").escape().trim(),
	check("category").escape().trim(),
	check("subcategory").escape().trim(),
	check("description").escape().trim(),
	check("steps").escape().isArray().withMessage("Steps data malformed."),
	check("ingredients")
		.escape()
		.isArray()
		.withMessage("Ingredients data malformed."),
	check("tags").escape().isArray().withMessage(" data malformed."),
];

export const validateCommentCreation = [
	check("text").trim().not().isEmpty().withMessage("Text is required."),
	check("post_id")
		.escape()
		.trim()
		.not()
		.isEmpty()
		.withMessage("Post_id is required."),
];

export const validateCommentEdit = [
	check("text").escape().trim(),
	check("comment_id")
		.escape()
		.trim()
		.not()
		.isEmpty()
		.withMessage("Comment_id is required"),
];
