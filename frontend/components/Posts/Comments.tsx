import { Comment } from "../../types";
import { useComment } from "../../Hooks/useComment";
import Image from "next/image";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Loader from "../Common/Loader";

export default function Comments({ comments }: { comments: Comment[] }) {
  const { addComment, setText, isLoading } = useComment();

  if (isLoading)
    return (
      <div
        id="comments"
        className="mt-2 flex h-full w-full max-w-lg flex-col md:mt-0 md:ml-8"
      >
        <Loader />
      </div>
    );

  return (
    <div
      id="comments"
      className="mt-2 flex h-full w-full max-w-lg flex-col md:mt-0 md:ml-8"
    >
      <div className="overflow-y-scroll">
        <div className="w-full items-center items-center rounded-t-xl border-b-[1px] border-gray-300 bg-white p-2">
          <header className="text-md h-8 font-bold">Comments</header>
        </div>
        <div className="sticky top-0 left-0 flex w-full flex-row items-center bg-gray-100 py-2 pl-2">
          <textarea
            onChange={({ target }) => setText(target.value)}
            className="h-full w-4/5 resize-none rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-gray-900 focus:border focus:border-black"
          />
          <button onClick={() => addComment()} className="ml-2">
            <SendOutlinedIcon />
          </button>
        </div>
        <div className="px-2 pb-2">
          {comments.map((comment) => (
            <div key={comment._id} className="my-4">
              <p className="ml-1 flex flex-row items-center font-semibold">
                <Image
                  src={`http://localhost:3303/photos/${comment.profile_id.profilePicture}`}
                  alt="XD"
                  width={160}
                  height={160}
                  className="mr-2 h-8 w-8 rounded-full shadow-sm"
                />
                <span>{comment.profile_id.username}</span>
              </p>
              <p className="my-1 break-all rounded-xl bg-gray-200 p-2 text-sm">
                {comment.text}
              </p>
              <p className="ml-1 text-sm">
                {new Date(comment.created).toLocaleDateString("en-EN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
