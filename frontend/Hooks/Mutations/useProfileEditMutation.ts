import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../../utils/axios";
import { useUser } from "../useUser";
import { toast } from "react-hot-toast";

export function useEditProfileMutation() {
  const { user } = useUser();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (toSend: FormData) =>
      await request.patch(`/profile/${user?.profile_id}`, toSend, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["profile", user?.profile_id],
        });

        toast.success("Profile edited.");
      },
      onError: () => {
        toast.error("There was an error. Sorry!");
      },
    }
  );

  return { mutate, isLoading };
}
