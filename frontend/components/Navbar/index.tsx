import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreatePost from "../Posts/CreatePost/CreatePost";
import Chat from "../Chat";
import Logout from "../Logout";

export default function Navbar({ profile_id }: { profile_id: string }) {
  return (
    <>
      <ul className="flex w-full flex-row justify-evenly gap-x-5">
        <li className="cursor-pointer">
          <Link href="/">
            <HomeOutlinedIcon className="p-px text-2xl" />
          </Link>
        </li>
        <CreatePost />
        <Chat />
        <li className="cursor-pointer">
          <Link href={`/profile/${profile_id}`} shallow={true}>
            <AccountCircleIcon className="p-px text-2xl" />
          </Link>
        </li>
        <Logout />
      </ul>
    </>
  );
}
