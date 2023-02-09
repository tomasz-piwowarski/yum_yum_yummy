import { io } from "socket.io-client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "./useUser";
import { useRouter } from "next/router";
import { Chat, MessageInterface } from "../types";
import { toast } from "react-hot-toast";

export function useChat() {
  const router = useRouter();

  const { user } = useUser();

  const [chats, setChats] = useState<Chat[]>([]);
  const [chatId, setChatId] = useState("");
  const [chatToShow, setChatToShow] = useState<Chat>({
    _id: "",
    members: [],
    messages: [],
  });
  const [message, setMessage] = useState("");
  const socket = useRef<any>();

  const handleChatId = (id: string) => setChatId(id);

  useEffect(() => {
    if (!socket.current?.connected) {
      socket.current = io("http://localhost:3001", {
        auth: { profile_id: user?.profile_id },
        path: "/socket",
        withCredentials: true,
      });

      socket.current.on("receiveChats", (chats: Chat[]) => {
        setChats(chats);
      });

      socket.current.on("receiveChat", (chat: Chat) => {
        setChatToShow(chat);
      });

      socket.current.on("newMessage", (newMessage: MessageInterface) => {
        setChatToShow((prev) => {
          return {
            ...prev,
            messages: [...prev?.messages, newMessage],
          };
        });
      });

      socket.current.on("chatCreated", (data: string) => {
        toast(data);
      });

      socket.current.emit("getChats", { profile_id: user?.profile_id });
    }

    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatId) socket.current.emit("getChat", { chat_id: chatId });
  }, [chatId]);

  const createChat = () => {
    const { profile_id } = router.query;

    socket.current.emit("createChat", {
      receiver_id: profile_id,
      profile_id: user.profile_id,
    });

    socket.current.emit("getChats", { profile_id: user?.profile_id });
  };

  const sendMessage = () => {
    socket.current.emit("sendMessage", {
      message,
      chat_id: chatId,
      receiver: chatToShow!.members.find(
        (member) => member._id !== user.profile_id
      ),
    });
    setMessage("");
  };

  return {
    profile_id: user?.profile_id,
    chatId,
    setMessage,
    message,
    handleChatId,
    sendMessage,
    chatToShow,
    createChat,
    chats,
  };
}
