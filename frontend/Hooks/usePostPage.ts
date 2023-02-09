import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getPost } from "../utils/axios";
import { useCommentDot } from "./useCommentDot";
import { usePost } from "./usePost";
import { useUser } from "./useUser";

export function usePostPage() {
  const { user } = useUser({ redirectTo: "/start" });

  const router = useRouter();
  const { post_id } = router.query;

  const { data, isLoading } = useQuery([`post`, post_id], () =>
    getPost(post_id as string)
  );

  const { currentPhotoIndex, previousPhoto, nextPhoto } = usePost(data?.photos);

  const { showDot } = useCommentDot(data?.comments);

  return {
    usersPost: data ? data.profile_id._id === user?.profile_id : "",
    img: data?.photos[currentPhotoIndex].photo,
    showDot,
    currentPhotoIndex,
    previousPhoto,
    nextPhoto,
    data,
    isLoading,
    profile_id: user?.profile_id,
  };
}
