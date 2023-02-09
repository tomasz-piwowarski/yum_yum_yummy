import mongoose from "mongoose";

export interface ProfileInput {
	user_id: string;
	username: string;
	profilePicture?: string;
}

export interface ProfileDocument extends ProfileInput, mongoose.Document {
	followers: mongoose.Schema.Types.ObjectId[];
	following: mongoose.Schema.Types.ObjectId[];
	posts: mongoose.Schema.Types.ObjectId[];
	likes: mongoose.Schema.Types.ObjectId[];
	chats: mongoose.Schema.Types.ObjectId[];
	_id: mongoose.Schema.Types.ObjectId;
}

const ProfileSchema = new mongoose.Schema<ProfileDocument>({
	user_id: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	profilePicture: String,
	followers: [{ type: mongoose.Schema.Types.ObjectId }],
	following: [{ type: mongoose.Schema.Types.ObjectId }],
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
	likes: [{ type: mongoose.Schema.Types.ObjectId }],
	chats: [{ type: mongoose.Schema.Types.ObjectId }],
});

export default mongoose.model<ProfileDocument>("Profile", ProfileSchema);
