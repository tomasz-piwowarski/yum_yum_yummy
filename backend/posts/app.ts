import express from "express";
import postRoutes from "./routes/index";
import mongoose from "mongoose";
import { MONGODB_URI } from "./utils/config";
import * as logger from "./utils/logger";
import path from "path";
import bodyParser from "body-parser";

const app = express();

mongoose
	.connect(MONGODB_URI)
	.then(() => logger.info("Connected to mongo"))
	.catch(logger.error);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "static")));

app.use("/post", postRoutes);

export default app;
