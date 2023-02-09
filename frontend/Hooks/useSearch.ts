import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Search } from "../types";
import request, { getSearchPosts } from "../utils/axios";
import { getQueryString } from "../utils/utils";

export function useSearch() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<Search>({
    defaultValues: {
      title: "",
      tags: "",
      region: [],
      category: [],
      ingredients: "",
    },
  });

  const getQuery = (q: Search) => {
    const queries = {
      title: q.title,
      category: q.category?.map((category) => category.value) || [],
      region: q.region?.map((region) => region.value) || [],
      tags: q.tags ? q.tags.split(" ") : [],
      ingredients: q.ingredients ? q.ingredients.split(" ") : [],
    };

    return getQueryString(queries);
  };

  const queries = getQuery(watch());

  const { data, isLoading, refetch } = useQuery(
    [`search`],
    () => getSearchPosts(queries),
    { staleTime: Infinity }
  );

  const search = () => {
    console.log(queries, data);
    refetch();
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    search,
    Controller,
    data: { posts: data?.posts, profiles: data?.profiles },
    isLoading,
  };
}
