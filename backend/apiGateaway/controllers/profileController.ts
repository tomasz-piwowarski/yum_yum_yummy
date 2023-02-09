import { Request, Response, NextFunction } from "express";
import FormData from "form-data";
import axios from "axios";
import { BASE_URL } from "../utils/config";

export const getProfile = async (req: Request, res: Response) => {
	const { data, status } = await axios.get(
		`${BASE_URL}:3303/profile/${req.params.profile_id}`
	);

	res.status(status).json(data);
};

export const createProfile = async (req: Request, res: Response) => {
	const { data, status } = await axios.post(
		`${BASE_URL}:3303/profile`,
		res.locals.user
	);

	res.status(status).json(data);
};

export const editProfile = async (req: Request, res: Response) => {
	const toSend = new FormData();

	for (const [key, value] of Object.entries(req.body))
		toSend.append(key, value);

	if (req.file) toSend.append("profilePicture", req!.file);

	const { data, status } = await axios.patch(
		`${BASE_URL}:3303/profile/${req.user!.profile_id}`,
		toSend
	);

	res.status(status).json(data);
};

export const toggleFollow = async (req: Request, res: Response) => {
	const { data, status } = await axios.patch(
		`${BASE_URL}:3303/profile/follow/${req.params.follow_id}`,
		{ profile_id: req.user!.profile_id }
	);

	res.status(status).json(data);
};

export const getProfileByUserId = async (user_id: string) => {
	const { data } = await axios.get(`${BASE_URL}:3303/profile/auth/${user_id}`);

	return data;
};
