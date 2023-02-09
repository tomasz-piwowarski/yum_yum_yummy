import { NextFunction, Request, Response } from "express";
import * as redis from "redis";
import { REDIS_URL } from "./config";

export const client: redis.RedisClientType = redis.createClient({
	url: REDIS_URL,
	legacyMode: true,
});

export const setCache = async (req: Request, res: Response) => {
	try {
		await client.v4.set(
			req.originalUrl,
			JSON.stringify(res.locals[req.originalUrl]),
			{
				EX: 10,
				NX: true,
			}
		);
	} catch (error) {
		console.log(error);
	}
};

export const getCache = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const data = await client.v4.get(req.originalUrl);

	if (data) {
		return res.json(JSON.parse(data));
	}

	next();
};

export const deleteCache = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await client.v4.del(req.originalUrl);

	next();
};

export const deleteCacheById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.originalUrl.startsWith("/post")) {
		await client.v4.del(`/post/${req.body.post_id || req.params.post_id}`);
	}

	if (req.originalUrl.startsWith("/profile")) {
		await client.v4.del(`/post/${req.body.profile_id}`);
	}

	next();
};
