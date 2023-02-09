import { useQuery } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { getProfile } from "../utils/axios";
import { useRouter } from "next/router";
import { useProfileFollowMutation } from "./Mutations/useProfileFollowMutation";

export function useProfilePage() {
  const { user } = useUser({ redirectTo: "/start" });

  const router = useRouter();
  const { profile_id } = router.query;

  const { data, isLoading } = useQuery([`profile`, profile_id], () =>
    getProfile(profile_id as string)
  );

  const { mutate } = useProfileFollowMutation();

  const toggleFollow = () => {
    mutate();
  };

  return {
    profile_id,
    user,
    data,
    isLoading: !data || isLoading || !user,
    toggleFollow,
  };
}
