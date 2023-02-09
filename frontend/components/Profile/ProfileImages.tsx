import Image from "next/image";
import Link from "next/link";
import { Post } from "../../types";

export default function ProfileImages({
  posts,
  short,
}: {
  posts: Post[];
  short?: boolean;
}) {
  return (
    <div
      className={`mx-auto ${
        short ? "mt-4" : "mt-12"
      } grid grid-cols-3 gap-1 p-2 xl:gap-4`}
    >
      {posts.map((post) => (
        <div
          className="flex w-full content-center justify-center"
          key={post._id}
        >
          <div
            className={`relative ${
              short
                ? "h-28 w-28 sm:h-44 sm:w-44"
                : "h-32 w-32 sm:h-52 sm:w-52 md:h-80 md:w-80 "
            }`}
          >
            <Link href={`/post/${post._id}`}>
              <Image
                className="shadow-xl"
                src={`http://localhost:3202/photos/${post.photos[0].photo}`}
                alt="XD"
                width={1500}
                height={1500}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
              <div className="absolute bottom-0 left-0 hidden h-full w-full bg-gray-900 text-white opacity-0 hover:bg-gray-900/70 hover:opacity-100 sm:block">
                <p className="absolute bottom-0 left-0 p-2">{post.title}</p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
