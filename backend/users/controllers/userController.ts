import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import knex from "../utils/knex";
import * as helpers from "../utils/helpers";

export const getById = async (req: Request, res: Response) => {
	const user = await knex("user").select().where("user_id", req.params.id);

	res.json(user[0]);
};

export const getByEmail = async (req: Request, res: Response) => {
	const user = await knex("user").select().where("email", req.params.email);

	res.json(user[0]);
};

export const register = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await helpers.registerUser(email, username, hashedPassword);
	await helpers.createPreferences(user.user_id);
	console.log(user.user_id);
	res.status(201).json(user.user_id);
};

export const deleteUser = async (req: Request, res: Response) => {
	await knex.transaction(async (trx: any) => {
		const pref = await trx("preferences")
			.select("preferences_id")
			.where("user_id", req.params.id);

		const preferences_id = pref[0].preferences_id;
		await trx("african").where("preferences_id", preferences_id).del();
		await trx("american").where("preferences_id", preferences_id).del();
		await trx("asian").where("preferences_id", preferences_id).del();
		await trx("european").where("preferences_id", preferences_id).del();
		await trx("oceanic").where("preferences_id", preferences_id).del();
		await trx("preferences").where("preferences_id", preferences_id).del();
		await trx("user").where("user_id", req.params.id).del();
	});

	res.json("User has been deleted.");
};

export const edit = async (req: Request, res: Response) => {
	const data = await helpers.editUser(req.params.id, req.body);

	res.json(data);
};

export const checkIfEmailExists = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const dbEmail = await knex("user")
		.select("email")
		.where("email", req.body.email)
		.then((res: any) => res);

	if (dbEmail.length > 0) {
		res.status(409).json("E-mail is already used");
		return;
	}
	next();
};

export const checkIfUsernameExists = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const dbUsername = await knex("user")
		.select("username")
		.where("username", req.body.username)
		.then((res: any) => res);

	if (dbUsername.length > 0) {
		res.status(409).json("Username is already used");
		return;
	}
	next();
};

export const changePreference = async (req: Request, res: Response) => {
	const data = await helpers.changePreference(
		req.params.id,
		req.body.action,
		req.body.category,
		req.body.region
	);

	res.json(data);
};

export const getPreferences = async (req: Request, res: Response) => {
	const data = await helpers.getAllPreferences(req.params.id);

	res.json(data);
};

export const getKnnUsers = async (req: Request, res: Response) => {
	const preferences_id = await knex("preferences")
		.join("african", "preferences.preferences_id", "african.african_likes_id")
		.join("asian", "preferences.preferences_id", "asian.asian_likes_id")
		.join(
			"american",
			"preferences.preferences_id",
			"american.american_likes_id"
		)
		.join("oceanic", "preferences.preferences_id", "oceanic.oceanic_likes_id")
		.join(
			"european",
			"preferences.preferences_id",
			"european.european_likes_id"
		)
		.select("*")
		.where("preferences.user_id", req.params.id);

	const {
		middle_east,
		central_asian,
		east_asian,
		north_asian,
		south_asian,
		southeast_asian,
		east_african,
		north_african,
		south_african,
		west_african,
		caribbean,
		central_american,
		north_american,
		south_american,
		australasian,
		melanesian,
		micronesian,
		polynesian,
		central_european,
		eastern_european,
		northern_european,
		southern_european,
		western_european,
	} = preferences_id[0];

	const knn = await knex("user")
		.join("preferences", "user.user_id", "preferences.user_id")
		.join("african", "preferences.preferences_id", "african.african_likes_id")
		.join("asian", "preferences.preferences_id", "asian.asian_likes_id")
		.join(
			"american",
			"preferences.preferences_id",
			"american.american_likes_id"
		)
		.join("oceanic", "preferences.preferences_id", "oceanic.oceanic_likes_id")
		.join(
			"european",
			"preferences.preferences_id",
			"european.european_likes_id"
		)
		.select("user.user_id")
		.orderByRaw(
			`SQRT(POW(${middle_east} - asian.middle_east, 2) + POW(${central_asian} - asian.central_asian, 2) + POW(${east_asian} - asian.east_asian, 2) + POW(${north_asian} - asian.north_asian, 2) + POW(${south_asian} - asian.south_asian, 2) + POW(${southeast_asian} - asian.southeast_asian, 2) + POW(${east_african} - african.east_african, 2) + POW(${north_african} - african.north_african, 2) + POW(${south_african} - african.south_african, 2) + POW(${west_african} - african.west_african, 2) + POW(${caribbean} - american.caribbean, 2) + POW(${central_american} - american.central_american, 2) + POW(${north_american} - american.north_american, 2) + POW(${south_american} - american.south_american, 2) + POW(${australasian} - oceanic.australasian, 2) + POW(${melanesian} - oceanic.melanesian, 2) + POW(${micronesian} - oceanic.micronesian, 2) + POW(${polynesian} - oceanic.polynesian, 2) + POW(${central_european} - european.central_european, 2) + POW(${eastern_european} - european.eastern_european, 2) + POW(${northern_european} - european.northern_european, 2) + POW(${southern_european} - european.southern_european, 2) + POW(${western_european} - european.western_european, 2))`
		)
		.limit(6);
	console.log(knn);
	res.json(
		knn.filter((user: { user_id: string }) => user.user_id !== req.params.id)
	);
};
