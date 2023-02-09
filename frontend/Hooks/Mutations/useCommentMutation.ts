import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import request from "../../utils/axios";
import { toast } from "react-hot-toast";

export function useCommentMutation() {
  const router = useRouter();
  const { post_id } = router.query;

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (text: string) =>
      await request.post("/post/comment", { text, post_id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["post", post_id],
        });

        toast.success("Comment added.");
      },
      onError: (error) => {
        console.log(error);
        toast.error("There was an error. Sorry!");
      },
    }
  );

  return { mutate, isLoading };
}
