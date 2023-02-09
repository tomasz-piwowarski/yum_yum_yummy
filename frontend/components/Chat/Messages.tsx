import { MessagesInterface } from "../../types";
import Loader from "../Common/Loader";
import Message from "./Message";

export default function Messages({
  messages,
  profile_id,
  members,
}: MessagesInterface) {
  if (!members)
    return (
      <div className="h-full w-full">
        <Loader />
      </div>
    );
  const username = members.find((member) => member._id === profile_id)!;
  const second = members.find((member) => member._id !== profile_id)!;

  return (
    <ul className="chat flex w-full flex-grow flex-col overflow-auto">
      {messages.map((message) => (
        <Message
          key={message._id}
          message={message}
          side={
            profile_id === message.profile_id ? "justify-end" : "justify-start"
          }
          margin={profile_id === message.profile_id ? "ml-auto" : "mr-auto"}
          color={
            profile_id === message.profile_id ? "bg-white" : "bg-neutral-300"
          }
          username={
            profile_id === message.profile_id
              ? username.username
              : second.username
          }
        />
      ))}
    </ul>
  );
}
