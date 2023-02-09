import { usePostDeleteMutation } from "./Mutations/usePostDeleteMutation";

export function usePostDelete() {
  const { mutate, isLoading } = usePostDeleteMutation();

  const deletePost = () => {
    mutate();
  };

  return { deletePost };
}
