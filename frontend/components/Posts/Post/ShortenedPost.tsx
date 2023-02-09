import NextImage from "next/image";
import { ShortPostInterface, tag } from "../../../types";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#FAF9F6" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function ShortenedPost({
  img,
  title,
  description,
  tags,
  additionalClasses,
  region,
  category,
  likes,
  username,
  profilePicture,
  priority = undefined,
}: ShortPostInterface) {
  return (
    <div
      className={`my-2 mx-auto w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-lg ${additionalClasses}`}
    >
      <PostHeader
        short={true}
        author={username}
        authorProfilePicture={profilePicture}
        likes={likes}
      />
      <NextImage
        src={img}
        alt="post"
        quality={80}
        width={400}
        height={600}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(100, 150))}`}
        className="w-full"
        priority={priority}
      />
      <PostBody
        short={true}
        description={description}
        title={title}
        region={region}
        category={category}
      />
      <div className="px-6 pt-4 pb-2">
        {tags.slice(0, 3).map((tag, i) => (
          <span
            key={tag.tag + i}
            className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {tag.tag}
          </span>
        ))}
      </div>
    </div>
  );
}
