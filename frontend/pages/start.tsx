import Default from "../components/Start/Default";
import SignUp from "../components/Start/SignUp";
import { useState } from "react";
import { useUser } from "../Hooks/useUser";
import Loader from "../components/Common/Loader";

export default function Start() {
  const [temp, setTemp] = useState("default");

  const { isLoadingUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  return (
    <main className="flex min-h-screen flex-col bg-gray-100 md:h-screen md:flex-row">
      {!isLoadingUser ? (
        <article className="m-auto flex h-full w-full max-w-xl flex-col justify-center">
          {
            {
              signup: <SignUp setTemp={setTemp} />,
              default: <Default setTemp={setTemp} />,
            }[temp]
          }
        </article>
      ) : (
        <div className="h-full w-full">
          <Loader />
        </div>
      )}
    </main>
  );
}
