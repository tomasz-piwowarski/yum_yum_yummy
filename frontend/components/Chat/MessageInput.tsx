import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { MessageInputInterface } from "../../types";

export default function MessageInput({
  setMessage,
  message,
  sendMessage,
}: MessageInputInterface) {
  return (
    <div className="relative bottom-0 mb-2 mt-4 flex h-14 w-full items-center">
      <textarea
        className="ml-2 w-full resize-none rounded border-2 border-gray-400 bg-white bg-transparent p-1 focus:outline-gray-200"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="ml-4 mr-2" onClick={sendMessage}>
        <SendOutlinedIcon />
      </button>
    </div>
  );
}
