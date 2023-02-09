import express from "express";
import mongoose from "mongoose";
import { MONGODB_URI } from "./utils/config";
import * as logger from "./utils/logger";

const app = express();

mongoose
	.connect(MONGODB_URI)
	.then(() => logger.info("Connected to mongo"))
	.catch(logger.error);

app.use(express.json());

export default app;
