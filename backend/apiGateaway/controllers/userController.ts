import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { BASE_URL } from "../utils/config";
import passport from "passport";

export const checkNotAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.isAuthenticated()) return next();
	res.json("You have to be logged out.");
};

export const checkAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.json("You have to be logged in.");
};

export const checkIfAuthenticated = async (req: Request, res: Response) => {
	if (req.isAuthenticated()) {
		console.log("is authenticated");
		return res.json({ authenticated: true, user: req.user });
	}
	res.json({ authenticated: false });
};

export const logout = async (req: Request, res: Response) => {
	req.logOut({ keepSessionInfo: false }, (err: any) => {
		console.log(err);
	});
};

export const loginUser = passport.authenticate("local", {
	failureRedirect: "/",
	successRedirect: "/user/loginSuccess",
});

export const loginSuccess = async (req: Request, res: Response) => {
	res.json(req.user);
};

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { data, status } = await axios.post(
		`${BASE_URL}:3101/user/register`,
		req.body
	);

	// if (status !== 200) return res.status(status).json(data);

	res.locals.user = data;
	next();
};

export const editUser = async (req: Request, res: Response) => {
	const { data, status } = await axios.patch(
		`${BASE_URL}:3101/user/edit/${req.params.user_id}`
	);

	res.status(status).json(data);
};

export const getUserByEmail = async (email: string) => {
	const { data } = await axios.get(`${BASE_URL}:3101/user/email/${email}`);

	return data;
};

export const getUserById = async (id: string) => {
	const { data } = await axios.get(`${BASE_URL}:3101/user/id/${id}`);

	return data;
};

export const getKnnUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { data, status } = await axios.get(
		`${BASE_URL}:3101/user/preference/${req.user?.user_id}`
	);

	res.locals.knn = data;
	next();
};

export const changePreference = async (req: Request, res: Response) => {
	await axios.patch(`${BASE_URL}:3101/user/preference/${req.user?.user_id}`, {
		...res.locals.data,
	});
};
