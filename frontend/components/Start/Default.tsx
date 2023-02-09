import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import Button from "../Common/Button";
import SignIn from "./SignIn";

export default function Default({
  setTemp,
}: {
  setTemp: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="h-4/5 w-full">
      <div className="mx-auto mx-auto my-2 mb-14 flex h-2/3 w-full w-4/5 flex-col justify-center overflow-hidden rounded-xl bg-white p-4 shadow-lg">
        <Image
          src="/logo.png"
          width={256}
          height={256}
          alt="logo"
          className="mx-auto mb-4 h-32 w-32"
        />
        <SignIn />
      </div>
      <div className="mx-auto mx-auto my-2 mb-14 flex w-full w-4/5 flex-row justify-center overflow-hidden rounded-xl bg-white p-4 shadow-lg">
        <p className="mr-3">Don&apos;t have an account?</p>
        <Button type="button" onClick={() => setTemp("signup")}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
