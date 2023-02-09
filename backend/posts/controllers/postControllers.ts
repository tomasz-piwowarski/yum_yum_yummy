import { NextFunction, Request, Response } from "express";
import Post from "../models/postModel";
import Profile from "../models/profileModel";
import Comment from "../models/commentModel";
import mongoose from "mongoose";

export const createPost = async (req: Request, res: Response) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const post = new Post({
			...req.body,
		});

		await post.save();

		await Profile.updateOne(
			{ _id: req.body.profile_id },
			{ $push: { posts: post._id } }
		);

		await session.commitTransaction();

		res.json({
			data: "Post has been created.",
			post_id: post._id,
		});
	} catch (error) {
		res.json(error);
	} finally {
		session.endSession();
	}
};

export const getPost = async (req: Request, res: Response) => {
	const post = await Post.findById(req.params.id).populate([
		{
			path: "comments",
			model: Comment,
			options: { sort: { _id: -1 } },
			populate: {
				path: "profile_id",
				model: Profile,
				select: "profilePicture username",
			},
		},
		{ path: "profile_id", model: Profile, select: "profilePicture username" },
	]);

	if (!post) return res.status(404).json("Post does not exist.");

	res.json(post);
};

export const getPreferencesPosts = async (req: Request, res: Response) => {
	const users_ids = (req.query.ids as string).split(",");

	const result = await Profile.find({ user_id: { $in: users_ids } }).populate({
		path: "likes",
		model: Post,
		select: "profile_id title photos description tags region category likes",
		populate: {
			path: "profile_id",
			model: Profile,
			select: "profilePicture username",
		},
	});

	const posts = result.flatMap((profile: any) => profile.likes);

	res.json([...new Set(posts)]);
};

export const getSearchPosts = async (req: Request, res: Response) => {
	const queries = { ...req.query };

	Object.keys(queries).forEach((key) => {
		if (key === "tags" || key === "ingredients") {
			queries[`${key}.${key.slice(0, -1)}`] = {
				$in: (queries[key]! as string).split(","),
			};
			delete queries[key];
		} else if (key === "category" || key === "region") {
			queries[key] = { $in: (queries[key]! as string).split(",") };
		} else if (key === "title") {
			queries[key] = { $regex: queries[key] };
		}
	});

	const posts = await Post.find({
		...queries,
	})
		.populate({
			path: "profile_id",
			model: Profile,
			select: "username profilePicture",
		})
		.sort({ created: -1 });

	const profiles = await Profile.find({ username: queries.title })
		.populate({
			path: "posts",
			model: Post,
			perDocumentLimit: 3,
			options: { sort: { created: -1 } },
		})
		.exec();

	res.json({
		profiles,
		posts,
	});
};

export const editPost = async (req: Request, res: Response) => {
	const post = await Post.findByIdAndUpdate(
		req.params.id,
		{ ...req.body },
		{
			new: true,
			runValidators: true,
		}
	);

	res.json("Post has been edited.");
};

export const deletePost = async (req: Request, res: Response) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		await Post.findByIdAndDelete(req.params.id);

		await Profile.updateOne(
			{ _id: req.body.profile_id },
			{ $pull: { posts: req.params.id } }
		);

		await session.commitTransaction();

		res.json("Post has been deleted.");
	} catch (error) {
		res.json(error);
	} finally {
		session.endSession();
	}
};

export const toggleLike = async (req: Request, res: Response) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const isLiked = await checkIfPostIsLikedByUser(
			req.params.id,
			req.body.profile_id
		);

		const action = isLiked ? "$pull" : "$push";

		const post = await Post.findOneAndUpdate(
			{ _id: req.params.id },
			{ [action]: { likes: req.body.profile_id } },
			{ new: true }
		);

		await Profile.updateOne(
			{ _id: req.body.profile_id },
			{ [action]: { likes: post!._id } }
		);

		await session.commitTransaction();

		res.json({ data: action, post });
	} catch (error) {
		res.json(error);
	} finally {
		session.endSession();
	}
};

export const checkIfPostIsLikedByUser = async (
	post_id: string,
	profile_id: string
) => {
	const post = await Post.findById(post_id);

	const findUserInLikes = post?.likes.find(
		(user: any) => user.toString() === profile_id
	);

	return !!findUserInLikes;
};

export const checkIfUserIsPostCreator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const post = await Post.findById(req.params.id);

	if (post?.profile_id.toString() !== req.body.profile_id)
		return res.status(403).json("User is not post creator.");

	next();
};
