import app from "../app";
import supertest from "supertest";
import mongoose from "mongoose";

const agent = supertest.agent(app);

const mockProfile = {
	user_id: "mockId",
	username: "mockUser",
	profilePicture: "mockPicture",
};

describe("user", () => {
	let profile_id: string;

	it("creates user profile", async () => {
		const response = await agent.post("/profile").send(mockProfile);

		profile_id = response.body.profile_id;

		expect(response.body).toEqual({
			data: "User has been created.",
			profile_id,
		});
	});

	it("gets profile", async () => {
		const response = await agent.get(`/profile/${profile_id}`);

		expect(response.body).toEqual({
			...mockProfile,
			__v: 0,
			_id: profile_id,
			followers: [],
			following: [],
			posts: [],
			likes: [],
			chats: [],
			photos: [],
		});
	});

	it("edits profile", async () => {
		const response = await agent
			.patch(`/profile/test/${profile_id}`)
			.send({ user_id: mockProfile.user_id, username: "changedUsername" });

		expect(response.body).toEqual("Profile has been edited.");
	});

	it("fails to edit profile when user is not owner", async () => {
		const response = await agent
			.patch(`/profile/${profile_id}`)
			.send({ user_id: "somerandomstring", username: "changedUsername" });

		expect(response.body).toEqual("User is not owner of profile.");
	});

	it("follows profile", async () => {
		const response = await agent
			.patch(`/profile/follow/63a1b9f9884baafed9abba48`)
			.send({ profile_id });

		expect(response.body).toEqual("Profile has been followed.");
	});

	it("unfollows profile", async () => {
		const response = await agent
			.patch(`/profile/follow/63a1b9f9884baafed9abba48`)
			.send({ profile_id });

		expect(response.body).toEqual("Profile has been unfollowed.");
	});

	it("fails to delete profile when user is not owner", async () => {
		const response = await agent
			.delete(`/profile/${profile_id}`)
			.send({ user_id: "somerandomstring" });

		expect(response.body).toEqual("User is not owner of profile.");
	});

	it("deletes profile", async () => {
		const response = await agent
			.delete(`/profile/${profile_id}`)
			.send({ user_id: mockProfile.user_id });

		expect(response.body).toEqual("Profile has been deleted.");
	});
});

afterAll(() => {
	mongoose.connection.close();
});
