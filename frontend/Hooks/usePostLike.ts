import { usePostLikeMutation } from "./Mutations/usePostLikeMutations";
import { useUser } from "./useUser";

export function usePostLike() {
  const { user } = useUser();

  const { mutate, isLoading } = usePostLikeMutation();

  const toggleLike = async () => {
    mutate();
  };

  return {
    toggleLike,
    isLoading,
    user,
  };
}
