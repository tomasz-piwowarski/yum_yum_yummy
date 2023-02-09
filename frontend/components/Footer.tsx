import Navbar from "./Navbar";

export default function Footer({ profile_id }: { profile_id: string }) {
  return (
    <footer className="sticky bottom-0 left-0 z-20 w-full content-center items-center border-[1px] border-gray-300 bg-white py-2 xl:hidden">
      <div className="flex w-full flex-row items-center">
        <Navbar profile_id={profile_id} />
      </div>
      <p className="hidden xl:block">It is a footer</p>
    </footer>
  );
}
