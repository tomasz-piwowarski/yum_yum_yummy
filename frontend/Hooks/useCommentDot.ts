import { useEffect, useRef, useState } from "react";
import { Comment } from "../types";

export function useCommentDot(value?: Comment[]) {
  const ref = useRef<Comment[]>();
  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      ref.current = value;
      return;
    }

    ref.current = value;
    setShowDot(true);

    const dotTimer = setTimeout(() => setShowDot(false), 3000);

    return () => {
      clearTimeout(dotTimer);
    };
  }, [value]);

  return { showDot };
}
