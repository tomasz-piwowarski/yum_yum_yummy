import { Request, Response, NextFunction } from "express";
import Post from "../models/postModel";
import Comment from "../models/commentModel";
import mongoose from "mongoose";

export const checkIfUserIsCommentCreator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const comment = await Comment.findById(req.params.comment_id);

	if (comment?.profile_id.toString() !== req.body.profile_id)
		return res.json("User is not comment creator.");

	next();
};

export const addComment = async (req: Request, res: Response) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const { profile_id, post_id, text } = req.body;
		const comment = new Comment({ profile_id, text, post_id });

		await comment.save();

		await Post.updateOne(
			{ _id: post_id },
			{ $push: { comments: comment._id } }
		);

		await session.commitTransaction();

		res.json({
			data: "Comment has been added.",
			comment_id: comment._id,
		});
	} catch (error) {
		res.json(error);
	} finally {
		session.endSession();
	}
};

export const deleteComment = async (req: Request, res: Response) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const comment = await Comment.findByIdAndDelete(req.params.comment_id);

		await Post.updateOne(
			{ _id: req.params.post_id },
			{ $pull: { comments: req.params.comment_id } }
		);

		await session.commitTransaction();

		res.json("Comment has been deleted.");
	} catch (error) {
		res.json(error);
	} finally {
		session.endSession();
	}
};

export const editComment = async (req: Request, res: Response) => {
	try {
		const comment = await Comment.findOneAndUpdate(
			{ _id: req.params.id },
			{ ...req.body },
			{
				new: true,
				runValidators: true,
			}
		);

		res.json("Comment has been edited.");
	} catch (error) {
		res.json(error);
	}
};
