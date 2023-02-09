import { Chat, ChatSelectorInterface } from "../../types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Image from "next/image";

export default function ChatSelector({
  chats,
  handleModal,
  handleChatId,
  profile_id,
}: ChatSelectorInterface) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row items-center justify-between border-b border-gray-300">
        <div className="items-center">
          <span className="text-lg">Chat</span>
        </div>
        <div>
          <button type="button" onClick={handleModal}>
            <CloseOutlinedIcon />
          </button>
        </div>
      </div>
      {chats.map((chat) => (
        <div
          className="flex cursor-pointer flex-row items-center justify-between border-b-2 p-2 hover:bg-gray-200"
          key={chat._id}
          onClick={() => handleChatId(chat._id)}
        >
          <div>
            <p className="font-semibold">
              {
                chat.members.find((member) => member._id !== profile_id)
                  ?.username
              }
            </p>
            <p>{chat.messages.at(-1)?.text}</p>
          </div>
          <Image
            width={64}
            height={64}
            src={`http://localhost:3303/photos/${
              chat.members!.find((member) => member._id !== profile_id)!
                .profilePicture
            }`}
            alt="Profile picture"
            className="h-9 w-9"
          />
        </div>
      ))}
    </div>
  );
}
