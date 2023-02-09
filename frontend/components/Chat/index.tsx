import { useState } from "react";
import Modal from "@mui/material/Modal";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { Fade } from "@mui/material";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import ChatSelector from "./ChatSelector";
import ChatHeader from "./ChatHeader";
import { useChat } from "../../Hooks/useChat";

export default function Chat() {
  const [open, setOpen] = useState(false);

  const handleModal = () => setOpen(!open);

  const {
    chatId,
    handleChatId,
    sendMessage,
    setMessage,
    message,
    chatToShow,
    chats,
    profile_id,
  } = useChat();

  return (
    <li className="cursor-pointer">
      <ChatOutlinedIcon onClick={handleModal} className="p-px text-2xl" />
      <Modal open={open} onClose={handleModal}>
        <Fade in={open} timeout={100}>
          <div className="absolute right-0 bottom-0 flex h-[98%] w-full flex-col items-center overflow-y-scroll rounded-l-xl border-2 border-gray-300 bg-gray-100 p-2 lg:h-4/5 lg:w-1/3 lg:overflow-hidden">
            {chatId === "" || !chatToShow ? (
              <ChatSelector
                chats={chats}
                handleModal={handleModal}
                handleChatId={handleChatId}
                profile_id={profile_id}
              />
            ) : (
              <>
                <ChatHeader
                  handleChatId={handleChatId}
                  handleModal={handleModal}
                />
                <Messages
                  members={chatToShow.members}
                  messages={chatToShow.messages}
                  profile_id={profile_id}
                />
                <MessageInput
                  setMessage={setMessage}
                  message={message}
                  sendMessage={sendMessage}
                />
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </li>
  );
}
