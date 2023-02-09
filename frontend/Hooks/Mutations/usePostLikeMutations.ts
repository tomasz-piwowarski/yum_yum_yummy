import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../../utils/axios";
import { toast } from "react-hot-toast";

export function usePostLikeMutation() {
  const router = useRouter();
  const { post_id } = router.query;

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async () => await request.patch(`/post/like/${post_id}`),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["post", post_id],
        });

        toast.success("Post liked.");
      },
      onError: () => {
        toast.error("There was an error. Sorry!");
      },
      onSettled: () => {
        console.log("settled");
      },
    }
  );

  return { mutate, isLoading };
}
