import { useForm } from "react-hook-form";
import { LoginInterface, RegisterInterface } from "../types";
import request from "../utils/axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export function useSignIn() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInterface>();

  const signIn = async (data: LoginInterface) => {
    try {
      const response = await request.post("/user/login", data);

      router.push("/");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return { handleSubmit, register, errors, signIn };
}

export function useSignUp(setTemp: Dispatch<SetStateAction<string>>) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RegisterInterface>();

  const signUp = async (data: RegisterInterface) => {
    try {
      const response = await request.post("/user/register", data);

      toast("Now you can login.");
      setTemp("default");
      reset();
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return { handleSubmit, register, errors, signUp };
}
