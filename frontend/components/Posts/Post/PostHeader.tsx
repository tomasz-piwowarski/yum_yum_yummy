import { PostHeaderInterface } from "../../../types";
import { kFormatter } from "../../../utils/utils";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { usePostLike } from "../../../Hooks/usePostLike";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PingingDot from "../../Common/PingingDot";
import EditPost from "../CreatePost/EditPost";
import Image from "next/image";
import { usePostDelete } from "../../../Hooks/usePostDelete";

export default function PostHeader({
  authorProfilePicture,
  author,
  short,
  postCreation,
  likes,
  usersPost,
  showDot,
  post_id,
}: PostHeaderInterface) {
  const { deletePost } = usePostDelete();
  const { toggleLike, user } = usePostLike();
  const likesToShow = kFormatter(likes.length);

  return (
    <div className="my-2 ml-2 flex flex-row items-center justify-between">
      <span className="flex w-full flex-row">
        <Image
          src={`http://localhost:3303/photos/${authorProfilePicture}`}
          alt="XD"
          width={160}
          height={160}
          className="mr-2 h-8 w-8 rounded-full shadow-sm"
        />
        <span className="text-md ml-2 font-bold">{author}</span>
      </span>
      {!postCreation ? (
        <span className="mr-2 flex flex-row items-center">
          <button
            onClick={() => {
              if (short) return;
              toggleLike();
            }}
            className="mr-2 flex flex-row"
          >
            <span className="mr-1 text-sm font-light">{likesToShow}</span>
            <FavoriteBorderOutlinedIcon
              className={likes.includes(user?.profile_id) ? "text-red-600" : ""}
            />
          </button>
          {!short ? (
            <a
              href={postCreation ? undefined : "#comments"}
              className="relative mr-2"
            >
              {showDot ? <PingingDot /> : null}
              <CommentOutlinedIcon />
            </a>
          ) : null}
          {usersPost && post_id ? (
            <>
              {" "}
              <EditPost post_id={post_id} />{" "}
              <button className="mr-2" onClick={deletePost}>
                <DeleteOutlineOutlinedIcon />
              </button>{" "}
            </>
          ) : null}
        </span>
      ) : null}
    </div>
  );
}
