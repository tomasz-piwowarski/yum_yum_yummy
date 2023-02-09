import app from "../app";
import supertest from "supertest";
import mongoose from "mongoose";

const agent = supertest.agent(app);

const mockPost = {
	type: "post",
	title: "mockTitle",
	profile_id: "63629e15e623c1bac5ea50f4",
	region: "asian",
	category: "south_asian",
	subcategory: "",
	photos: [{ photo: "examplePath" }, { photo: "examplePath2" }],
	description: "example description of post",
	tags: [{ tag: "indian" }, { tag: "curry" }],
	ingredients: [],
	steps: [],
};

describe("user can create, get, edit and delete posts and comments", () => {
	let post_id: string;
	let comment_id: string;

	it("creates post", async () => {
		const response = await agent.post("/post/test").send(mockPost);

		post_id = response.body.post_id;

		expect(response.body).toEqual({
			data: "Post has been created.",
			post_id,
		});
	});

	it("gets post", async () => {
		const response = await agent.get(`/post/${post_id}`);
		console.log(response.body);
		expect(response.body.description).toBe("example description of post");
	});

	it("fails to get post with a non-existent id", async () => {
		const response = await agent.get(`/post/6362ac649b3c1e9c307e94e4`);

		expect(response.body).toEqual("Post does not exist.");
		expect(response.status).toBe(404);
	});

	it("edits post", async () => {
		const response = await agent
			.patch(`/post/test/${post_id}`)
			.send({
				...mockPost,
				profile_id: mockPost.profile_id,
				description: "It is changed",
			});

		expect(response.body).toEqual("Post has been edited.");
	});

	it("fails editing with wrong profile_id", async () => {
		const response = await agent
			.patch(`/post/test/${post_id}`)
			.send({ profile_id: "somerandomstring", description: "It is changed" });

		expect(response.body).toEqual("User is not post creator.");
		expect(response.status).toBe(403);
	});

	it("likes post", async () => {
		const response = await agent
			.patch(`/post/like/${post_id}`)
			.send({ profile_id: mockPost.profile_id });

		expect(response.body).toEqual(expect.objectContaining({ data: "$push" }));
	});

	it("dislikes post", async () => {
		const response = await agent
			.patch(`/post/like/${post_id}`)
			.send({ profile_id: mockPost.profile_id });

		expect(response.body).toEqual(expect.objectContaining({ data: "$pull" }));
	});

	it("comments post", async () => {
		const response = await agent.post("/post/comment").send({
			profile_id: mockPost.profile_id,
			text: "example text of comment",
			post_id: post_id,
		});

		comment_id = response.body.comment_id;

		expect(response.body).toEqual({
			data: "Comment has been added.",
			comment_id,
		});
	});

	it("edits comment", async () => {
		const response = await agent
			.patch(`/post/comment/${comment_id}`)
			.send({ profile_id: mockPost.profile_id, text: "It is changed" });

		expect(response.body).toEqual("Comment has been edited.");
	});

	it("fails editing comment with wrong profile_id", async () => {
		const response = await agent
			.patch(`/post/comment/${comment_id}`)
			.send({ profile_id: "6362ac649b3c1e9c307e94e4", text: "It is changed" });

		expect(response.body).toEqual("User is not comment creator.");
	});

	it("fails deleting comment with wrong profile_id", async () => {
		const response = await agent
			.delete(`/post/comment/${post_id}/${comment_id}`)
			.send({ profile_id: "6362ac649b3c1e9c307e94e4" });

		expect(response.body).toEqual("User is not comment creator.");
	});

	it("deletes comment", async () => {
		const response = await agent
			.delete(`/post/comment/${post_id}/${comment_id}`)
			.send({ profile_id: mockPost.profile_id });

		expect(response.body).toEqual("Comment has been deleted.");
	});

	it("fails deleting post with wrong profile_id", async () => {
		const response = await agent
			.delete(`/post/${post_id}`)
			.send({ profile_id: "somerandomstring" });

		expect(response.body).toEqual("User is not post creator.");
	});

	it("deletes post", async () => {
		const response = await agent
			.delete(`/post/${post_id}`)
			.send({ profile_id: mockPost.profile_id });

		expect(response.body).toEqual("Post has been deleted.");
	});
});

afterAll(async () => {
	mongoose.connection.close();
});
