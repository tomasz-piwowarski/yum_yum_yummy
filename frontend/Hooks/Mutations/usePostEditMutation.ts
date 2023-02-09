import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import request from "../../utils/axios";
import { toast } from "react-hot-toast";

export function usePostEditMutation() {
  const router = useRouter();
  const { post_id } = router.query;

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (toSend: FormData) =>
      await request.patch(`/post/${post_id}`, toSend, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["post", post_id],
        });

        toast.success("Post edited.");
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
