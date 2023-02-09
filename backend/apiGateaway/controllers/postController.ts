import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import FormData from "form-data";
import fs from "fs";

export const getPreferencesPosts = async (req: Request, res: Response) => {
	const query = res.locals.knn.map((user: any) => user.user_id).join();
	console.log(query);
	const { data, status } = await axios.get(
		`${BASE_URL}:3202/post/preferencesPosts/?ids=${query}`
	);

	res.status(status).json(data);
};

export const createPost = async (req: Request, res: Response) => {
	const toSend = new FormData();

	for (const [key, value] of Object.entries(req.body))
		toSend.append(key, value);

	for (const [key, value] of Object.entries(req.files!)) {
		toSend.append(`files`, value.buffer, {
			filename: value.originalname,
		});
	}

	toSend.append("profile_id", req.user?.profile_id);

	const { data, status } = await axios.post(`${BASE_URL}:3202/post`, toSend, {
		headers: { "Content-Type": "multipart/form-data" },
	});

	res.status(status).json(data);
};

export const getPost = async (req: Request, res: Response) => {
	const { data, status } = await axios.get(
		`${BASE_URL}:3202/post/single/${req.params.post_id}`
	);

	res.status(status).json(data);
};

export const getSearchPost = async (req: Request, res: Response) => {
	const queries = req.originalUrl.split("?");

	const { data, status } = await axios.get(
		`${BASE_URL}:3202/post/search/?${queries[0]}`
	);

	res.status(status).json(data);
};

export const editPost = async (req: Request, res: Response) => {
	const toSend = new FormData();

	for (const [key, value] of Object.entries(req.body))
		toSend.append(key, value);

	for (const [key, value] of Object.entries(req!.files!))
		toSend.append("files", value);

	toSend.append("profile_id", req.user?.profile_id);

	const { data, status } = await axios.patch(
		`${BASE_URL}:3202/post/${req.params.post_id}`,
		toSend,
		{
			headers: { "Content-Type": "multipart/form-data" },
		}
	);

	res.status(status).json(data);
};

export const deletePost = async (req: Request, res: Response) => {
	const { data, status } = await axios.delete(
		`${BASE_URL}:3202/post/${req.params.post_id}`,
		{ data: { profile_id: req.user!.profile_id } }
	);

	res.status(status).json(data);
};

export const addComment = async (req: Request, res: Response) => {
	const { data, status } = await axios.post(`${BASE_URL}:3202/post/comment`, {
		...req.body,
		...req.user,
	});

	res.status(status).json(data);
};

export const toggleLike = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { data, status } = await axios.patch(
		`${BASE_URL}:3202/post/like/${req.params.post_id}`,
		{ profile_id: req.user!.profile_id }
	);

	res.locals.data = {
		action: data.data.action,
		category: data.data.category,
		region: data.data.region,
	};

	next();
};
