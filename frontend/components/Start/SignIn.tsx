import Button from "../Common/Button";
import { useSignIn } from "../../Hooks/useSignInUp";

export default function SignIn() {
  const { handleSubmit, errors, register, signIn } = useSignIn();

  return (
    <div className="my-2 mx-auto w-4/5">
      <form onSubmit={handleSubmit(signIn)}>
        <input
          id="email"
          placeholder="E-mail"
          className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black"
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
          <span className="font-medium text-red-600" role="alert">
            {errors.email.message}
          </span>
        )}
        <input
          id="password"
          placeholder="Password"
          className="mb-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black"
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
          <span className="font-medium text-red-600" role="alert">
            {errors.password.message}
          </span>
        )}
        <Button type="submit" additionalClasses="w-full p-4 mt-2 h-10">
          SIGN IN
        </Button>
      </form>
    </div>
  );
}
