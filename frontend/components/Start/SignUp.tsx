import { Dispatch, SetStateAction } from "react";
import Button from "../Common/Button";
import Image from "next/image";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useSignUp } from "../../Hooks/useSignInUp";

interface Register {
  email: string;
  username: string;
  password: string;
}

export default function SignUp({
  setTemp,
}: {
  setTemp: Dispatch<SetStateAction<string>>;
}) {
  const { register, handleSubmit, errors, signUp } = useSignUp(setTemp);

  return (
    <div className="h-4/5 w-full">
      <div className="relative mx-auto mx-auto my-2 mb-14 flex w-full w-4/5 flex-col justify-center overflow-hidden rounded-xl bg-white p-4 shadow-lg">
        <button
          className="absolute top-0 left-0 m-2"
          onClick={() => setTemp("default")}
        >
          <ArrowBackOutlinedIcon />
        </button>
        <Image
          src="/logo.png"
          width={256}
          height={256}
          alt="logo"
          className="mx-auto mb-4 h-32 w-32"
        />
        <form onSubmit={handleSubmit(signUp)}>
          <div className="mb-2 ">
            <input
              id="email"
              placeholder="E-mail"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black"
              {...register("email", {
                required: "E-mail is required.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              type="email"
            />
            {errors.email && (
              <span className="mb-2 font-medium text-red-600" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-2 ">
            <input
              id="username"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black"
              placeholder="Username"
              {...register("username", {
                required: "Username is required.",
                minLength: {
                  value: 3,
                  message: "min length is 3",
                },
              })}
              type="text"
            />
            {errors.username && (
              <span className="mb-2 font-medium text-red-600" role="alert">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mb-2 ">
            <input
              id="password"
              placeholder="Password"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 3,
                  message: "min length is 3",
                },
              })}
              type="password"
            />
            {errors.password && (
              <span className="mb-2 font-medium text-red-600" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button type="submit" additionalClasses="w-full p-4 mt-2 h-10">
            SIGN UP
          </Button>
        </form>
      </div>
    </div>
  );
}
