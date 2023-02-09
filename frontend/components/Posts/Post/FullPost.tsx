import NextImage from "next/image";
import { PostInterface, CreatePostPreviewInterface } from "../../../types";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import PostTags from "./PostTags";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";
import { useEffect, useState } from "react";

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

export default function FullPost({
  type,
  author,
  authorProfilePicture,
  img,
  title,
  description,
  steps,
  ingredients,
  tags,
  additionalClasses,
  previousPhoto,
  nextPhoto,
  region,
  category,
  unoptimized = false,
  likes,
  usersPost,
  post_id,
  postCreation,
  showDot,
}: PostInterface | CreatePostPreviewInterface) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const image = new Image();
    image.src = img;

    image.onload = () => {
      setHeight(image.naturalHeight);
    };
  }, [img]);

  return (
    <div
      className={`flex max-w-xl flex-col overflow-y-auto overflow-x-hidden rounded-xl bg-white shadow-lg ${additionalClasses}`}
    >
      <PostHeader
        authorProfilePicture={authorProfilePicture}
        author={author}
        likes={likes}
        usersPost={usersPost}
        post_id={post_id}
        postCreation={postCreation}
        showDot={showDot}
      />
      <div className="relative">
        <button
          onClick={previousPhoto}
          className="absolute h-full opacity-20 hover:bg-gray-600 hover:opacity-40"
        >
          <ArrowBackIosOutlinedIcon htmlColor="white" />
        </button>
        <button
          className="absolute right-0 h-full opacity-20 hover:bg-gray-600 hover:opacity-40"
          onClick={nextPhoto}
        >
          <ArrowForwardIosOutlinedIcon htmlColor="white" />
        </button>
        <NextImage
          src={img}
          alt="post"
          quality={100}
          width={800}
          height={height}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(100, 150)
          )}`}
          className="w-full"
          priority
          unoptimized={unoptimized}
        />
      </div>
      <PostBody
        title={title}
        description={description}
        type={type}
        ingredients={ingredients}
        steps={steps}
        region={region}
        category={category}
      />
      <PostTags tags={tags} />
    </div>
  );
}
