import mongoose from "mongoose";

export interface ChatInput {
	members: mongoose.Schema.Types.ObjectId[];
}

export interface ChatDocument extends ChatInput, mongoose.Document {
	messages: mongoose.Schema.Types.ObjectId[];
	_id: mongoose.Schema.Types.ObjectId;
}

const ChatSchema = new mongoose.Schema<ChatDocument>({
	members: [
		{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Profile" },
	],
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

export default mongoose.model<ChatDocument>("Chat", ChatSchema);
