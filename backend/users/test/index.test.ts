import app from "../app";
import supertest from "supertest";
import knex from "../utils/knex";

const agent = supertest.agent(app);

const mockUser = {
	username: "mockUser",
	email: "mock@email.com",
	password: "mockPassword",
};

beforeEach(() => {
	jest.setTimeout(10000);
});

describe("user", () => {
	let user_id: string;

	it("registers user", async () => {
		const response = await agent.post("/register").send(mockUser);

		user_id = response.body.user_id;

		expect(response.body).toEqual({
			data: "New user created!",
			user_id: user_id,
		});
	});

	it("edits user", async () => {
		const response = await agent
			.patch(`/edit/${user_id}`)
			.send({ username: "changedUsername" });

		expect(response.body).toEqual("User's data has been updated.");
	});

	it("changes preference", async () => {
		const response = await agent.patch(`/preference/${user_id}`).send({
			action: "increment",
			region: "american",
			category: "north_american",
		});

		expect(response.body).toEqual("Preferences has been updated.");
	});

	it("deletes user", async () => {
		const response = await agent.delete(`/delete/${user_id}`);

		expect(response.body).toEqual("User has been deleted.");
	});
});

afterAll(() => {
	knex.destroy();
});
