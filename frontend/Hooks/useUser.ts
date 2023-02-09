import { useEffect } from "react";
import Router from "next/router";
import { useQuery } from "@tanstack/react-query";
import request from "../utils/axios";

export function useUser({
  redirectTo,
  redirectIfFound,
}: {
  redirectTo?: string;
  redirectIfFound?: boolean;
} = {}) {
  const { data, isLoading, error } = useQuery(
    ["user"],
    async () => await request.get("/user/checkAuth")
  );

  const finished = Boolean(data);
  const hasUser = data?.data.authenticated;

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      (redirectTo && !redirectIfFound && !hasUser) ||
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return {
    isLoadingUser: isLoading,
    user: data?.data.user,
    authenticated: data?.data.authenticated,
  };
}
