import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import request from "../../utils/axios";
import { toast } from "react-hot-toast";

export function useProfileFollowMutation() {
  const router = useRouter();
  const { profile_id } = router.query;

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async () => await request.patch(`/profile/follow/${profile_id}`),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ["profile", profile_id],
        });

        toast.success("Profile followed.");
      },
      onError: () => {
        toast.error("There was an error. Sorry!");
      },
      onSettled: () => {
        console.log("settled");
      },
    }
  );

  return { mutate };
}
