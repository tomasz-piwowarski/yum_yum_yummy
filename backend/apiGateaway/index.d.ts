export {};

declare global {
	namespace Express {
		interface Request {
			user?: {
				username: string;
				email: string;
				profile_id: string;
				user_id: string;
			};
		}
	}
}
