import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { getUserByEmail, getUserById } from "../controllers/userController";
import { getProfileByUserId } from "../controllers/profileController";
import bcrypt from "bcrypt";

const passportConfig = () => {
	passport.use(
		new LocalStrategy(
			{ usernameField: "email", passwordField: "password" },
			async (email, password, done) => {
				const user = await getUserByEmail(email);

				const profile = await getProfileByUserId(user.user_id);

				if (!user) return done(null, false, { message: "Invalid credentials" });

				if (!bcrypt.compareSync(password, user.password))
					return done(null, false, { message: "Invalid credentials.\n" });

				return done(null, {
					user_id: user.user_id,
					username: profile.username,
					email: user.email,
					profile_id: profile._id,
				});
			}
		)
	);

	passport.serializeUser((user: any, done) => {
		done(undefined, user.user_id);
	});

	passport.deserializeUser(async (user_id: string, done) => {
		try {
			const user = await getUserById(user_id);
			const profile = await getProfileByUserId(user.user_id);

			done(null, {
				user_id: user.user_id,
				username: profile.username,
				email: user.email,
				profile_id: profile._id,
			});
		} catch (error) {
			done(error, false);
		}
	});
};

export default passportConfig;
