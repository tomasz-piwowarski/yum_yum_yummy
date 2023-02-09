import knex from "./knex";
import { v4 as uuidv4 } from "uuid";

export const registerUser = async (
	email: string,
	username: string,
	password: string,
	moderator = false
): Promise<{ user_id: string }> => {
	return await knex
		.transaction(async (trx) => {
			return await trx("user")
				.insert({
					user_id: uuidv4(),
					email,
					username,
					password,
					moderator,
				})
				.returning("user_id");
		})
		.then((user_id) => {
			return user_id![0];
		});
};

export const editUser = async (user_id: string, data: Request["body"]) => {
	try {
		await knex.transaction(async (trx) => {
			await trx("user").where("user_id", user_id).update(data);
		});
		return "User's data has been updated.";
	} catch (error) {
		return error;
	}
};

export const createPreferences = async (user_id: string) => {
	try {
		await knex.transaction(async (trx) => {
			const id = await trx("preferences")
				.insert({ user_id })
				.returning("preferences_id");

			const preferences_id = id[0].preferences_id;
			await trx("european").insert({ preferences_id });
			await trx("african").insert({ preferences_id });
			await trx("asian").insert({ preferences_id });
			await trx("oceanic").insert({ preferences_id });
			await trx("american").insert({ preferences_id });
		});
	} catch (error) {
		return error;
	}
};

export const getAllPreferences = async (user_id: string) => {
	try {
		const preferences_id = await knex("preferences")
			.select("preferences_id")
			.where("user_id", user_id)
			.then((res) => {
				return res[0].preferences_id;
			});

		return {
			error: false,
			data: {
				european_likes: await knex("european_likes")
					.select()
					.where("preferences_id", preferences_id)
					.then((res) => {
						return res[0];
					}),
				african_likes: await knex("african_likes")
					.select()
					.where("preferences_id", preferences_id)
					.then((res) => {
						return res[0];
					}),
				asian_likes: await knex("asian_likes")
					.select()
					.where("preferences_id", preferences_id)
					.then((res) => {
						return res[0];
					}),
				oceanic_likes: await knex("oceanic_likes")
					.select()
					.where("preferences_id", preferences_id)
					.then((res) => {
						return res[0];
					}),
				american_likes: await knex("american_likes")
					.select()
					.where("preferences_id", preferences_id)
					.then((res) => {
						return res[0];
					}),
			},
		};
	} catch (error) {
		return error;
	}
};

export const changePreference = async (
	user_id: string,
	action: string,
	category: string,
	region: string
) => {
	try {
		await knex.transaction(async (trx) => {
			const preferences_id = await knex("preferences")
				.select("preferences_id")
				.where("user_id", user_id)
				.then((res) => {
					return res[0].preferences_id;
				});

			if (action === "increment") {
				await trx(region)
					.increment(category, 1)
					.where("preferences_id", preferences_id);
			} else if (action === "decrement") {
				await trx(region)
					.decrement(category, 1)
					.where("preferences_id", preferences_id);
			}
		});

		return "Preferences has been updated.";
	} catch (error) {
		return error;
	}
};
