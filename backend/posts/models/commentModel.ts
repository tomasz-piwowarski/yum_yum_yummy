import mongoose from "mongoose";

export interface CommentInput {
	profile_id: mongoose.Schema.Types.ObjectId;
	text: string;
	post_id: mongoose.Schema.Types.ObjectId;
}

export interface CommentDocument extends CommentInput {
	created: Date;
	_id: mongoose.Schema.Types.ObjectId;
}

const CommentSchema = new mongoose.Schema<CommentDocument>({
	profile_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Profile",
	},
	text: { type: String, required: true, minlength: 1 },
	post_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Post",
	},
	created: { type: Date, required: true, default: new Date() },
});

export default mongoose.model<CommentDocument>("Comment", CommentSchema);
