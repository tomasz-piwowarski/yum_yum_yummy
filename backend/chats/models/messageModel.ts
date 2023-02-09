import mongoose from "mongoose";

export interface MessageInput {
	text: string;
	chat_id: mongoose.Schema.Types.ObjectId;
	profile_id: mongoose.Schema.Types.ObjectId;
}

export interface MessageDocument extends MessageInput, mongoose.Document {
	send: Date;
	_id: mongoose.Schema.Types.ObjectId;
}

const MessageSchema = new mongoose.Schema<MessageDocument>({
	chat_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Chat",
		required: true,
	},
	profile_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Profile",
		required: true,
	},
	text: String,
	send: { type: Date, default: new Date(), required: true },
});

export default mongoose.model<MessageDocument>("Message", MessageSchema);
