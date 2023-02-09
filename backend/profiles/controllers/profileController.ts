import { NextFunction, Request, Response } from "express";
import Profile from "../models/profileModel";
import mongoose from "mongoose";
import Post from "../models/postModel";

export const getProfileByUserId = async (req: Request, res: Response) => {
	const profile = await Profile.findOne({ user_id: req.params._id });
	console.log(profile);
	res.json(profile);
};

export const getProfile = async (req: Request, res: Response) => {
	const profile = await Profile.findById(req.params._id).populate({
		path: "posts",
		model: Post,
		options: { sort: { _id: -1 } },
	});

	res.json(profile);
};

export const createProfile = async (req: Request, res: Response) => {
	const profile = new Profile({ ...req.body });

	await profile.save();

	res.json({
		data: "User has been created.",
		profile_id: profile._id,
	});
};

export const editProfile = async (req: Request, res: Response) => {
	console.log(req.body);
	const profile = await Profile.findByIdAndUpdate(
		req.params.profile_id,
		{ ...req.body },
		{ new: true, runValidators: true }
	);

	res.json("Profile has been edited.");
};

export const deleteProfile = async (req: Request, res: Response) => {
	await Profile.findByIdAndDelete(req.params.profile_id);

	res.json("Profile has been deleted.");
};

export const toggleFollow = async (req: Request, res: Response) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const isFollowed = await checkIfUserIsFollower(
			req.params.follow_id,
			req.body.profile_id
		);

		const action = isFollowed ? "$pull" : "$push";

		const profile = await Profile.findOneAndUpdate(
			{ _id: req.params.follow_id },
			{ [action]: { followers: req.body.profile_id } },
			{ new: true }
		);

		await Profile.updateOne(
			{ _id: req.body.profile_id },
			{ [action]: { following: profile!._id } }
		);

		await session.commitTransaction();

		res.json(`Profile has been ${isFollowed ? "unfollowed" : "followed"}.`);
	} catch (error) {
		res.json(error);
	} finally {
		session.endSession();
	}
};

export const checkIfUserIsProfileOwner = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const profile = await Profile.findById(req.params.profile_id);

	if (!(profile?.user_id === req.body.user_id))
		return res.status(403).json("User is not owner of profile.");

	next();
};

export const checkIfUserIsFollower = async (
	follow_id: string,
	profile_id: string
) => {
	const profile = await Profile.findById(follow_id);

	const findUserInFollows = profile?.followers.find(
		(follow) => follow.toString() === profile_id
	);

	return !!findUserInFollows;
};
