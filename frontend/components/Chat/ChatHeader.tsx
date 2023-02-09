import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { ChatHeaderInterface } from "../../types";

export default function ChatHeader({
  handleModal,
  handleChatId,
}: ChatHeaderInterface) {
  return (
    <div className="mb-2 flex w-full flex-row items-center justify-between border-b border-gray-300">
      <ArrowBackOutlinedIcon
        className="cursor-pointer text-base"
        onClick={() => handleChatId("")}
      />
      <button type="button" onClick={handleModal}>
        <CloseOutlinedIcon />
      </button>
    </div>
  );
}
