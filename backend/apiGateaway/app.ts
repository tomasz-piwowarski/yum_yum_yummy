import express from "express";
import postRoutes from "./routes/postRoutes";
import profileRoutes from "./routes/profileRoutes";
import userRoutes from "./routes/userRoutes";
import { client } from "./utils/redis";
import session from "express-session";
import connectRedis from "connect-redis";
import passport from "passport";
import { createProxyMiddleware } from "http-proxy-middleware";
import { checkAuth } from "./controllers/userController";
import { SESSION_SECRET } from "./utils/config";
import cors from "cors";
import passportConfig from "./utils/passport";

const app = express();

const wsProxy = createProxyMiddleware({ target: "ws://localhost:3404" });

client.connect().then(() => console.log("Redis connected"));

const RedisStore = connectRedis(session);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		store: new RedisStore({ client }),
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			httpOnly: false,
			maxAge: 1000 * 60 * 100,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use("/post", checkAuth, postRoutes);
app.use("/profile", checkAuth, profileRoutes);
app.use("/user", userRoutes);
app.use("/socket", checkAuth, wsProxy);

export default app;
