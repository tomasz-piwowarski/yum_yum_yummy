import { SearchProfileResult } from "../../types";
import Bio from "./Bio";
import ProfileImages from "./ProfileImages";

export default function ShortenedProfile({
  profile,
}: {
  profile: SearchProfileResult;
}) {
  return (
    <div
      className={`my-2 mx-auto max-w-xl overflow-hidden rounded-xl bg-white p-1 shadow-lg md:my-2`}
    >
      <Bio
        profilePicture={profile.profilePicture}
        username={profile.username}
        postsLength={profile.posts.length}
        description={profile.description?.slice(0, 255) || ""}
        followersLength={profile.followers}
        followingLength={profile.following}
        short={true}
      />
      <p className="flex p-4 lg:hidden">{profile.description}</p>
      <ProfileImages posts={profile.posts} short={true} />
    </div>
  );
}
