import { usePost } from "../../../Hooks/usePost";
import { usePostForm } from "../../../Hooks/usePostCreateAndEdit";
import AddIcon from "@mui/icons-material/AddBoxOutlined";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import FullPost from "../Post/FullPost";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CreatePostForm from "./CreatePostForm";
import { useState } from "react";

export default function CreatePost() {
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen(!open);

  const {
    addPhoto,
    blobPhotos,
    deletePhoto,
    resetPhotos,
    currentPhotoIndex,
    previousPhoto,
    nextPhoto,
    files,
  } = usePost();

  const {
    register,
    handleSubmit,
    watch,
    errors,
    tagsFieldArray,
    ingredientsFieldArray,
    stepsFieldArray,
    addPost,
  } = usePostForm(resetPhotos, files);

  const pd = watch();

  return (
    <li className="cursor-pointer">
      <AddIcon onClick={handleModal} className="p-px text-2xl" />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={open} timeout={100}>
          <div className="absolute flex h-full w-full flex-row">
            <div className="m-8 flex h-[93%] w-full flex-col items-center overflow-y-auto rounded-xl border-gray-300 bg-white p-4 xl:w-2/3">
              <div className="flex w-full flex-row justify-between border-b border-gray-300">
                <div id="transition-modal-title" className="text-lg">
                  Create new post
                </div>
                <button type="button" onClick={handleModal}>
                  <CloseOutlinedIcon />
                </button>
              </div>
              <CreatePostForm
                addPhoto={addPhoto}
                deletePhoto={deletePhoto}
                blobPhotos={blobPhotos}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                tagsFieldArray={tagsFieldArray}
                ingredientsFieldArray={ingredientsFieldArray}
                stepsFieldArray={stepsFieldArray}
                type={pd.type}
                region={pd.region}
                handlePost={addPost}
                buttonText="Create post"
              />
            </div>
            <div className="my-8 mr-10 hidden h-[93%] w-1/3 rounded-xl border-white bg-white xl:flex">
              <FullPost
                author="author"
                authorProfilePicture="/example.jpg"
                {...pd}
                img={
                  blobPhotos.length
                    ? blobPhotos[currentPhotoIndex]
                    : "/blur.webp"
                }
                currentPhotoIndex={currentPhotoIndex}
                previousPhoto={previousPhoto}
                nextPhoto={nextPhoto}
                unoptimized
                likes={["exampleId"]}
                postCreation={true}
              />
            </div>
          </div>
        </Fade>
      </Modal>
    </li>
  );
}
