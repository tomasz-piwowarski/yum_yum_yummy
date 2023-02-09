import { useState, useEffect } from "react";
import { usePost } from "../../../Hooks/usePost";
import { usePostForm } from "../../../Hooks/usePostCreateAndEdit";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CreatePostForm from "./CreatePostForm";
import { getPost } from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";

export default function EditPost({ post_id }: { post_id: string }) {
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen(!open);

  const { addPhoto, blobPhotos, deletePhoto, resetPhotos, files } = usePost();

  const { data } = useQuery([`post`, post_id], () =>
    getPost(post_id as string)
  );

  const {
    register,
    handleSubmit,
    watch,
    errors,
    tagsFieldArray,
    ingredientsFieldArray,
    stepsFieldArray,
    photosFieldArray,
    editPost,
    reset,
  } = usePostForm(resetPhotos, files);

  const pd = watch();

  useEffect(() => {
    if (data)
      reset({
        type: data.type,
        title: data.title,
        description: data.description,
        region: data.region,
        category: data.category,
        ingredients: data.ingredients,
        steps: data.steps,
        tags: data.tags,
        photos: data.photos,
      });
  }, [data, reset]);

  return (
    <div className="cursor-pointer">
      <ModeEditOutlineOutlinedIcon
        onClick={handleModal}
        className="p-px text-2xl"
      />
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
            <div className="m-8 mx-auto flex h-[93%] w-full flex-col items-center overflow-y-auto rounded-xl border-gray-300 bg-white p-4 xl:w-2/3">
              <div className="flex w-full flex-row justify-between border-b border-gray-300">
                <div id="transition-modal-title" className="text-lg">
                  Edit post
                </div>
                <button type="button" onClick={handleModal}>
                  <CloseOutlinedIcon />
                </button>
              </div>
              <div className="mt-1 flex w-full flex-wrap justify-center">
                {pd.photos?.map((photo: any, i: number) => (
                  <div
                    key={photo.photo}
                    className={`relative m-1 h-28 w-28 rounded-lg shadow-lg`}
                    style={{
                      backgroundImage: `url('http://localhost:3202/photos/${photo.photo}')`,
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      overflow: "hidden",
                    }}
                    onClick={() => photosFieldArray.remove(i)}
                  >
                    <div className="delay-50 hidden h-full w-full bg-gray-600 text-white opacity-0 transition ease-in-out hover:opacity-70 xl:flex">
                      <CloseOutlinedIcon className="m-auto" />
                    </div>
                    <div className="absolute top-0 right-0 text-white opacity-60 xl:hidden">
                      <CloseOutlinedIcon />
                    </div>
                  </div>
                ))}
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
                handlePost={editPost}
                buttonText="Edit post"
              />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
