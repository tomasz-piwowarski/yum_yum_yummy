import Link from "next/link";
import ShortenedPost from "./Posts/Post/ShortenedPost";
import { useMainPage } from "../Hooks/useMainPage";
import { ShortData, ShortPostInterface } from "../types";
import Loader from "./Common/Loader";

export default function Main() {
  const { isLoading, data } = useMainPage();

  return (
    <main className="mt-14 flex-1 content-center items-center overflow-y-auto bg-gray-100">
      <div className="flex w-full flex-col items-center justify-center">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data.length === 0 ? (
              <div>
                Like some posts to get recommended posts next time that you sign
                in.
              </div>
            ) : (
              data?.map((post: ShortData, i: number) => (
                <Link
                  className="w-full max-w-xl"
                  key={post._id}
                  href={`/post/${post._id}`}
                >
                  <ShortenedPost
                    {...post}
                    img={`http://localhost:3202/photos/${post.photos[0].photo}`}
                    profilePicture={post.profile_id.profilePicture}
                    username={post.profile_id.username}
                    priority={i ? undefined : true}
                  />
                </Link>
              ))
            )}
          </>
        )}
      </div>
    </main>
  );
}
