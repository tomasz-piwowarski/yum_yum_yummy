import Chat from "../models/chatModel";
import Message from "../models/messageModel";
import Profile from "../models/profileModel";
import mongoose from "mongoose";

export const checkIfChatExists = async (
	profile_id: string,
	receiver_id: string
) => {
	try {
		const chat = await Chat.findOne({
			members: [profile_id, receiver_id],
		});

		if (chat) return true;

		return false;
	} catch (error) {
		return error;
	}
};

export const createChat = async (profile_id: string, receiver_id: string) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const chat = new Chat({
			members: [profile_id, receiver_id],
		});

		await chat.save();

		await Profile.updateOne(
			{ _id: profile_id },
			{ $push: { chats: chat._id } }
		);

		await Profile.updateOne(
			{ _id: receiver_id },
			{ $push: { chats: chat._id } }
		);

		await session.commitTransaction();

		return "Chat created.";
	} catch (error) {
		return error;
	} finally {
		session.endSession();
	}
};

export const checkIfUserIsChatMember = async (
	chat_id: string,
	profile_id: string
) => {
	try {
		const chat = await Chat.findById(chat_id);

		if (!chat?.members.find((member) => member.toString() === profile_id))
			return false;

		return true;
	} catch (error) {
		return error;
	}
};

export const getChat = async (chat_id: string, profile_id: string) => {
	try {
		if (!checkIfUserIsChatMember(chat_id, profile_id)) throw new Error();

		const chat = await Chat.findById(chat_id).populate([
			{ path: "messages", model: Message },
			{ path: "members", model: Profile, select: "username profilePicture" },
		]);

		return chat;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const getChats = async (profile_id: string) => {
	try {
		const chats = await Chat.find({ members: { $in: profile_id } }).populate({
			path: "members",
			model: Profile,
			select: "username profilePicture",
		});

		return chats;
	} catch (error) {
		console.log(error);
	}
};

export const addMessage = async (
	profile_id: string,
	chat_id: string,
	text: string
) => {
	if (!checkIfUserIsChatMember(chat_id, profile_id)) throw new Error();
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const message = new Message({
			profile_id,
			text,
			chat_id: chat_id,
		});

		await message.save();

		await Chat.findByIdAndUpdate(chat_id, {
			$push: { messages: message._id },
		});

		await session.commitTransaction();

		return message;
	} catch (error) {
		return false;
	} finally {
		session.endSession();
	}
};
