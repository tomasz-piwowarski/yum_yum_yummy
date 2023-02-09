import { useForm } from "react-hook-form";
import { EditProfileInterface } from "../types";
import { useEditProfileMutation } from "./Mutations/useProfileEditMutation";

export default function useEditProfile(defaultValues: EditProfileInterface) {
  const { mutate, isLoading } = useEditProfileMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditProfileInterface>({
    defaultValues,
  });

  const editProfile = async (data: EditProfileInterface) => {
    const toSend = new FormData();
    for (const [key, value] of Object.entries(data!)) {
      toSend.append(key, value);
    }

    if (data.profilePicture)
      toSend.set("profilePicture", data.profilePicture[0]);

    mutate(toSend);
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    editProfile,
    isLoading,
  };
}
