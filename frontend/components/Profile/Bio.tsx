import Image from "next/image";
import Button from "../Common/Button";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { BioInterface } from "../../types";
import Link from "next/link";
import { kFormatter } from "../../utils/utils";
import EditProfile from "./EditProfile";
import { useChat } from "../../Hooks/useChat";

export default function Bio({
  profilePicture,
  username,
  postsLength,
  followersLength,
  followingLength,
  description,
  short = false,
  userProfile,
  isFollowing,
  toggleFollow,
}: BioInterface) {
  const { createChat } = useChat();

  const postsLen = kFormatter(postsLength);
  const followersLen = kFormatter(followersLength.length);
  const followingLen = kFormatter(followingLength.length);

  return (
    <div className="mx-2 mt-2 flex flex-row p-4 md:mt-6 lg:justify-evenly">
      <div>
        <div className="relative h-24 w-24 rounded-full shadow-xl sm:h-36 sm:w-36">
          <Image
            src={
              `http://localhost:3303/photos/${profilePicture}` || "/profile.png"
            }
            alt="XD"
            width={160}
            height={160}
            className="h-24 w-24 rounded-full object-contain shadow-xl sm:h-36 sm:w-36"
          />
        </div>
      </div>
      <div className="my-auto ml-4 flex w-full flex-col">
        <div className="flex flex-row items-center justify-between">
          <p className="font-semibold">{username}</p>
          {!short ? (
            <div className="flex flex-row items-center justify-between sm:justify-start">
              {!userProfile ? (
                <>
                  <Button
                    onClick={toggleFollow}
                    type="button"
                    additionalClasses={`px-7 py-2.5 hidden sm:block sm:mr-2 ${
                      isFollowing
                        ? ""
                        : "bg-zinc-50 text-black hover:bg-white border border-black-1"
                    }`}
                  >
                    <span>
                      {isFollowing ? (
                        <>
                          {" "}
                          <DoneOutlinedIcon sx={{ fontSize: 16 }} /> Following
                        </>
                      ) : (
                        "Follow"
                      )}
                    </span>
                  </Button>
                  <Button
                    type="button"
                    additionalClasses="px-7 py-2.5 hidden sm:block sm:mr-2"
                    onClick={createChat}
                  >
                    Send message
                  </Button>
                </>
              ) : (
                <EditProfile {...{ username, description }} />
              )}
            </div>
          ) : null}
        </div>
        <div className="my-4 flex flex-row justify-start text-sm xl:text-base">
          <p className="mr-1 sm:mr-4">
            Posts: <span className="font-semibold">{postsLen}</span>
          </p>
          <p className="mr-1 sm:mr-4">
            Followers: <span className="font-semibold">{followersLen}</span>
          </p>
          <p>
            Following: <span className="font-semibold">{followingLen}</span>
          </p>
        </div>
        {!short ? (
          <div className="flex flex-row sm:hidden sm:justify-start">
            <Button type="button" additionalClasses="mr-2 px-5 py-2.5">
              <span>
                <DoneOutlinedIcon className="text-sm" /> Following
              </span>
            </Button>
            <Button type="button" additionalClasses="px-5 py-2.5">
              Send message
            </Button>
          </div>
        ) : null}
        <p className="hidden break-all lg:block">
          {description ? description : "Bio"}
        </p>
      </div>
    </div>
  );
}
