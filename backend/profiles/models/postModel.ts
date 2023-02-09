import mongoose, { Date } from "mongoose";

export interface PostInput {
	type: string;
	title: string;
	profile_id: mongoose.Schema.Types.ObjectId;
	region: string;
	category: string;
	subcategory: string;
	photos: string[];
	description: string;
	steps?: string[];
	ingredients?: Array<{ ingredient: string; value: string; unit: string }>;
	tags: string[];
}

export interface PostDocument extends PostInput, mongoose.Document {
	created: Date;
	likes: mongoose.Schema.Types.ObjectId[];
	comments: mongoose.Schema.Types.ObjectId[];
	_id: mongoose.Schema.Types.ObjectId;
}

const PostSchema = new mongoose.Schema<PostDocument>({
	title: String,
	profile_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Profile",
	},
	region: { type: String, required: true },
	category: {
		type: String,
		required: true,
	},
	subcategory: String,
	photos: [
		{
			photo: String,
		},
	],
	description: String,
	steps: Array,
	ingredients: [{ ingredient: String, value: String, unit: String }],
	tags: [{ tag: String }],
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
	created: { type: Date, required: true, default: Date.now() },
});

export default mongoose.model<PostDocument>("Post", PostSchema);
