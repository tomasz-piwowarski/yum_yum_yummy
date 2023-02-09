import Navbar from "./Navbar";
import Search from "./Search";
import Image from "next/image";

export default function Header({ profile_id }: { profile_id: string }) {
  return (
    <header className="fixed top-0 left-0 z-20 mb-14 w-screen border-[1px] border-gray-300 bg-white">
      <div className="mx-auto flex h-14 w-full flex-row items-center xl:max-w-5xl">
        <div className="flex w-full items-center justify-between gap-5 px-5">
          <Image
            src="/logo.png"
            width={256}
            height={256}
            alt="logo"
            className="h-12 w-12"
          />
          <Search />
          <nav className="hidden w-max items-center gap-x-5 xl:flex">
            <Navbar profile_id={profile_id} />
          </nav>
        </div>
      </div>
    </header>
  );
}
