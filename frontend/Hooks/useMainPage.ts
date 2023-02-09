import { useQuery } from "@tanstack/react-query";
import { getPreferencesPosts } from "../utils/axios";
import { useUser } from "./useUser";

export function useMainPage() {
  useUser({ redirectTo: "/start" });

  const { data, isLoading } = useQuery(
    [`preferencesPosts`],
    () => getPreferencesPosts(),
    { staleTime: 60000 }
  );

  return { data, isLoading };
}
