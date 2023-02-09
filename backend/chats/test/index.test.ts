import app from "../app";
import supertest from "supertest";
import mongoose from "mongoose";

const agent = supertest.agent(app);

afterAll(async () => {
	mongoose.connection.close();
});
