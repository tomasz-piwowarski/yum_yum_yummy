import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import request from "../../utils/axios";
import { toast } from "react-hot-toast";

export function usePostDeleteMutation() {
  const router = useRouter();
  const { post_id } = router.query;

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async () => await request.delete(`/post/${post_id}`),
    {
      onSuccess: () => {
        router.push("/");
        queryClient.removeQueries({
          queryKey: ["post", post_id],
        });
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
