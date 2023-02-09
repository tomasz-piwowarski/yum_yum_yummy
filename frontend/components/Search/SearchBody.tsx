import Link from "next/dist/client/link";
import { SearchProfileResult, Result } from "../../types";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShortenedPost from "../Posts/Post/ShortenedPost";
import ShortenedProfile from "../Profile/ShortenedProfile";

export function SearchProfiles({
  profiles,
  handleModal,
}: {
  profiles: SearchProfileResult[];
  handleModal: () => void;
}) {
  if (!profiles.length)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <SearchOutlinedIcon />
        <p>Search something</p>
      </div>
    );

  return (
    <>
      {profiles.map((profile) => (
        <Link
          onClick={handleModal}
          key={profile._id}
          href={`/profile/${profile._id}`}
        >
          <ShortenedProfile profile={profile} />
        </Link>
      ))}
    </>
  );
}

export function SearchPosts({
  posts,
  handleModal,
}: {
  posts: any;
  handleModal: () => void;
}) {
  if (!posts.length)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <SearchOutlinedIcon />
        <p>Search something</p>
      </div>
    );

  return (
    <>
      {posts.map((post: any) => (
        <Link onClick={handleModal} key={post._id} href={`/post/${post._id}`}>
          <ShortenedPost
            key={post._id}
            {...post}
            img={`http://localhost:3202/photos/${post.photos[0].photo}`}
            profilePicture={post.profile_id.profilePicture}
            username={post.profile_id.username}
          />
        </Link>
      ))}
    </>
  );
}

export default function PostSearchBody({
  result,
  handleModal,
  showProfiles,
  showPosts,
  toShow,
}: {
  result: Result;
  handleModal: () => void;
  showProfiles: () => void;
  showPosts: () => void;
  toShow: string;
}) {
  console.log(result);
  return (
    <div className="mx-auto h-full w-full items-center justify-center md:w-2/3 lg:overflow-y-scroll">
      <div className="mt-2 flex justify-center">
        <button
          type="button"
          className="mr-2 mb-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-200"
          onClick={showPosts}
        >
          Posts
        </button>
        <button
          type="button"
          className="mr-2 mb-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-200"
          onClick={showProfiles}
        >
          Profiles
        </button>
      </div>
      {
        {
          posts: <SearchPosts posts={result.posts} handleModal={handleModal} />,
          profiles: (
            <SearchProfiles
              profiles={result.profiles}
              handleModal={handleModal}
            />
          ),
        }[toShow]
      }
    </div>
  );
}
