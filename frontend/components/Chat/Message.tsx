import { MessageInterface } from "../../types";

export default function Message({
  message,
  side,
  margin,
  color,
  username,
}: {
  message: MessageInterface;
  side: string;
  margin: string;
  color: string;
  username: string;
}) {
  return (
    <li className={`flex ${side} mx-2 mb-1`}>
      <div className={`flex flex-col ${margin} max-w-[80%]`}>
        <span className={`flex ${side}`}>{username}</span>
        <div
          className={`relative w-fit rounded px-4 py-2 text-gray-700 shadow ${color} ${margin}`}
        >
          <span className="block w-full break-words">{message.text}</span>
        </div>
      </div>
    </li>
  );
}
