declare namespace Express {
	export interface Request {
		user: {
			username: string;
			user_id: string;
			email: string;
		};
	}
}
