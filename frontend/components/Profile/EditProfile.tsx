import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useState } from "react";
import useEditProfile from "../../Hooks/useProfileEdit";
import Button from "../Common/Button";

export default function EditProfile({
  username,
  description,
}: {
  username: string;
  description: string;
}) {
  const { register, handleSubmit, isLoading, editProfile } = useEditProfile({
    username,
    description,
  });

  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen(!open);

  if (isLoading) return <div>wait</div>;

  return (
    <div className="cursor-pointer">
      <SettingsOutlinedIcon onClick={handleModal} className="p-px text-2xl" />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={open} timeout={100}>
          <div className="absolute flex h-full w-full flex-row justify-center">
            <div className="m-2 my-auto flex h-2/3 w-full flex-col items-center overflow-y-scroll rounded-xl border-gray-300 bg-white lg:flex-row lg:overflow-hidden xl:w-1/3">
              <div className="flex h-full w-full flex-col p-2">
                <div className="flex flex-row border-b-2">
                  <p className="w-full border-gray-300 text-lg">Edit profile</p>
                  <button className="mr-1" type="button" onClick={handleModal}>
                    <CloseOutlinedIcon />
                  </button>
                </div>
                <form onSubmit={handleSubmit(editProfile)}>
                  <div className="my-3 flex flex-col">
                    <label htmlFor="searchText">Username:</label>
                    <input
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black"
                      id="username"
                      type="text"
                      placeholder="Username"
                      {...register("username")}
                    />
                  </div>
                  <div className="mb-3 flex flex-col">
                    <label htmlFor="searchText">Description:</label>
                    <input
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black"
                      id="description"
                      type="text"
                      placeholder="Description"
                      {...register("description")}
                    />
                  </div>
                  <div className="mb-3 flex flex-col">
                    <label htmlFor="searchText">Profile picture:</label>
                    <input
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border focus:border-black"
                      id="profilePicture"
                      type="file"
                      {...register("profilePicture")}
                    />
                  </div>
                  <Button type="submit" additionalClasses="w-full mb-3 h-8">
                    EDIT
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
