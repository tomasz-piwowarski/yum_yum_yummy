import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import {
	addMessage,
	checkIfChatExists,
	createChat,
	getChat,
	getChats,
} from "./chatController";

const onlineUsers = new Map();

export const socketController = (
	socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
	io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
	onlineUsers.set(socket.handshake.auth.profile_id, socket.id);

	socket.on("getChats", async () => {
		const chats = await getChats(socket.handshake.auth.profile_id);

		io.to(socket.id).emit("receiveChats", chats);
	});

	socket.on("getChat", async (data) => {
		console.log(data.chat_id);
		const chat = await getChat(data.chat_id, socket.handshake.auth.profile_id);

		io.to(socket.id).emit("receiveChat", chat);
	});

	socket.on("createChat", async (data) => {
		if (await checkIfChatExists(data.profile_id, data.receiver_id)) return;

		const chat = await createChat(data.profile_id, data.receiver_id);

		io.to(socket.id).emit("chatCreated", "Chat created");
	});

	socket.on("sendMessage", async (data) => {
		const res = await addMessage(
			socket.handshake.auth.profile_id,
			data.chat_id,
			data.message
		);

		if (!res) {
			io.to(socket.id).emit("messageError", {
				msg: "There was an error sending the message.",
			});
			return;
		}

		io.to(socket.id).emit("newMessage", res);

		const receiver = onlineUsers.get(data.receiver._id);

		if (!receiver) return;

		io.to(receiver).emit("newMessage", res);
	});

	socket.on("disconnect", (data) => {
		onlineUsers.delete(socket.handshake.auth.profile_id);
	});
};
