import { useState } from "react";
import { useCommentMutation } from "./Mutations/useCommentMutation";

export function useComment() {
  const [text, setText] = useState("");
  const { mutate, isLoading } = useCommentMutation();

  const addComment = () => {
    mutate(text);
  };

  return {
    addComment,
    setText,
    isLoading,
  };
}
