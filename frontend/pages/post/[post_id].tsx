import Footer from "../../components/Footer";
import Header from "../../components/Header";
import FullPost from "../../components/Posts/Post/FullPost";
import Comments from "../../components/Posts/Comments";
import { GetServerSideProps } from "next/types";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getPost } from "../../utils/axios";
import Loader from "../../components/Common/Loader";
import { usePostPage } from "../../Hooks/usePostPage";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { post_id } = ctx.params!;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([`post`, post_id], () =>
    getPost(post_id as string, ctx.req.headers.cookie)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Post() {
  const {
    data,
    isLoading,
    profile_id,
    previousPhoto,
    nextPhoto,
    currentPhotoIndex,
    usersPost,
    showDot,
    img,
  } = usePostPage();

  if (!data || isLoading)
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
    <div className="mx-auto flex min-h-screen w-full flex-col items-center bg-gray-100 md:h-screen md:overflow-hidden">
      <Header profile_id={profile_id as string} />
      <main className="relative mx-auto mt-16 mb-2.5 flex w-full flex-1 flex-col items-center justify-center overflow-hidden md:flex-row">
        <FullPost
          {...{ ...data, previousPhoto, nextPhoto, currentPhotoIndex }}
          img={`http://localhost:3202/photos/${img}`}
          author={data.profile_id.username}
          authorProfilePicture={data.profile_id.profilePicture}
          additionalClasses="h-full w-full md:max-w-xl"
          usersPost={usersPost}
          showDot={showDot}
          post_id={data._id}
        />
        <Comments comments={data.comments} />
      </main>
      <Footer profile_id={profile_id as string} />
    </div>
  );
}
