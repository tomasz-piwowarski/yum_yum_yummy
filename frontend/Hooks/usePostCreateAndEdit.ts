import { useFieldArray, useForm } from "react-hook-form";
import { CreateEditPostInterface } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostSchema } from "../utils/validationSchemas";
import { toast } from "react-hot-toast";
import request from "../utils/axios";
import { usePostEditMutation } from "./Mutations/usePostEditMutation";

const defaultValues = {
  type: "post",
  title: "",
  description: "",
  region: "",
  category: "",
  subcategory: "",
  ingredients: [],
  steps: [],
  tags: [],
  photos: [],
};

export function usePostForm(resetPhotos: () => void, files?: FileList) {
  const { mutate, isLoading } = usePostEditMutation();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateEditPostInterface>({
    defaultValues,
    resolver: yupResolver(createPostSchema),
  });

  const tagsFieldArray = useFieldArray({
    control,
    name: "tags",
  });

  const ingredientsFieldArray = useFieldArray({
    control,
    name: "ingredients",
  });

  const stepsFieldArray = useFieldArray({
    control,
    name: "steps",
  });

  const photosFieldArray = useFieldArray({
    control,
    name: "photos",
  });

  const addPost = async function (data: CreateEditPostInterface) {
    try {
      const toSend = new FormData();
      for (const [key, value] of Object.entries(files!)) {
        toSend.append("files", value);
      }

      for (const [key, value] of Object.entries(data!)) {
        if (key === "photos") continue;
        toSend.append(
          key,
          ["ingredients", "steps", "tags"].includes(key)
            ? JSON.stringify(value)
            : value
        );
      }

      await request.post("/post", toSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      reset();
      resetPhotos();
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async function (data: CreateEditPostInterface) {
    try {
      if (files && files?.length + data.photos!.length > 4)
        return toast("You can't upload more than 4 images.");

      const toSend = new FormData();

      if (files && files!.length > 0) {
        for (const [key, value] of Object.entries(files!)) {
          toSend.append("files", value);
        }
      }

      for (const [key, value] of Object.entries(data!)) {
        toSend.append(
          key,
          ["ingredients", "steps", "tags", "photos"].includes(key)
            ? JSON.stringify(value)
            : value
        );
      }

      mutate(toSend);
      resetPhotos();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    tagsFieldArray,
    ingredientsFieldArray,
    stepsFieldArray,
    photosFieldArray,
    addPost,
    editPost,
    reset,
    setValue,
  };
}
