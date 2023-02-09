import { useState } from "react";
import { useSearch } from "../../Hooks/useSearch";
import SearchBar from "./SearchBar";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchBody from "./SearchBody";
import SearchForm from "./SearchForm";
import Loader from "../Common/Loader";

export default function Search() {
  const [toShow, setToShow] = useState("posts");
  const showProfiles = () => setToShow("profiles");
  const showPosts = () => setToShow("posts");

  const { register, handleSubmit, control, errors, search, data, isLoading } =
    useSearch();

  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen(!open);

  return (
    <div>
      <SearchBar handleOpen={handleModal} />
      <Modal open={open} onClose={handleModal}>
        <Fade in={open} timeout={100}>
          <div className="absolute flex h-full w-full flex-row justify-center">
            <div className="relative m-2 flex h-[98%] w-full flex-col items-center overflow-y-scroll rounded-xl border-gray-300 bg-gray-100 lg:flex-row lg:overflow-hidden xl:w-2/3">
              <button
                className="absolute top-0 right-0 mr-1"
                type="button"
                onClick={handleModal}
              >
                <CloseOutlinedIcon />
              </button>
              <SearchForm
                register={register}
                handleSubmit={handleSubmit}
                search={search}
                control={control}
              />
              {!isLoading ? (
                <SearchBody
                  result={data}
                  handleModal={handleModal}
                  showProfiles={showProfiles}
                  showPosts={showPosts}
                  toShow={toShow}
                />
              ) : (
                <Loader additionalClasses="w-2/3" />
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
