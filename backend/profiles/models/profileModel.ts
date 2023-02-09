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
	photos: string[];
	profilePicture: string;
	description: string;
}

const ProfileSchema = new mongoose.Schema<ProfileDocument>({
	user_id: {
		type: String,
		required: true,
	},
	username: {
		type: String,
	},
	profilePicture: { type: String, default: "profile.png" },
	followers: [mongoose.Schema.Types.ObjectId],
	following: [mongoose.Schema.Types.ObjectId],
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
	likes: [mongoose.Schema.Types.ObjectId],
	chats: [mongoose.Schema.Types.ObjectId],
	photos: [String],
	description: String,
});

export default mongoose.model<ProfileDocument>("Profile", ProfileSchema);
