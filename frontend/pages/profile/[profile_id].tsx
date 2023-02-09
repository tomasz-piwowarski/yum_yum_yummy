import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Bio from "../../components/Profile/Bio";
import ProfileImages from "../../components/Profile/ProfileImages";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next/types";
import { useProfilePage } from "../../Hooks/useProfilePage";
import { getProfile } from "../../utils/axios";
import Loader from "../../components/Common/Loader";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const profile_id = ctx.params!.profile_id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([`profile`, profile_id], () =>
    getProfile(profile_id as string, ctx.req.headers.cookie)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Profile() {
  const { user, data, isLoading, profile_id, toggleFollow } = useProfilePage();

  if (isLoading)
    return (
      <div className="flex min-h-screen w-full flex-col items-center bg-gray-100">
        <Header profile_id={profile_id as string} />
        <main className="mt-14 w-full flex-1 overflow-y-auto xl:w-2/3">
          <Loader />
        </main>
        <Footer profile_id={profile_id as string} />
      </div>
    );

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-100">
      <Header profile_id={profile_id as string} />
      <main className="mt-14 w-full flex-1 items-center overflow-y-auto xl:w-2/3">
        <Bio
          profilePicture={data.profilePicture}
          username={data.username}
          postsLength={data.posts.length}
          description={data.description}
          followersLength={data.followers}
          followingLength={data.following}
          userProfile={user.profile_id === profile_id}
          isFollowing={data.followers.includes(user.profile_id)}
          toggleFollow={toggleFollow}
        />
        <p className="flex p-4 lg:hidden">{data.description}</p>
        <ProfileImages posts={data.posts} />
      </main>
      <Footer profile_id={profile_id as string} />
    </div>
  );
}
