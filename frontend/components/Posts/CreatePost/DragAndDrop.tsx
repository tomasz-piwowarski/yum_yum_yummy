import { useState, useRef } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

const FileDragAndDrop = ({
  uploadFile,
  blobPhotos,
  deletePhoto,
}: {
  uploadFile: (arg: FileList) => void;
  blobPhotos: string[];
  deletePhoto: (index: number, e: any) => void;
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      className="relative my-2 mx-16 w-full text-center xl:w-3/5"
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        accept=".png, .jpg, .jpeg"
        multiple
        onChange={handleChange}
        className="hidden"
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={
          dragActive
            ? "flex h-96 flex-col items-center justify-center rounded-2xl border border-gray-400 bg-gray-300"
            : "flex h-96 flex-col items-center justify-center rounded-2xl border border-gray-400 bg-gray-100"
        }
      >
        <div>
          <p>
            <AddPhotoAlternateOutlinedIcon className="text-4xl" />
          </p>
          <p>Drag your file here or</p>
          <button
            type="button"
            className="cursor-pointer bg-transparent p-1 text-base"
            onClick={onButtonClick}
          >
            <span className="font-bold">click</span> to upload a file
          </button>
        </div>
        <div className="my-2 flex w-full flex-row flex-wrap items-center justify-center px-3">
          {blobPhotos
            ? blobPhotos.map((photo, i) => (
                <div
                  key={photo.toString()}
                  className={`relative m-1 h-28 w-28 rounded-lg shadow-2xl`}
                  style={{
                    backgroundImage: `url('${photo}')`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    overflow: "hidden",
                  }}
                  onClick={(e) => deletePhoto(i, e)}
                >
                  <div className="delay-50 hidden h-full w-full bg-gray-600 text-white opacity-0 transition ease-in-out hover:opacity-70 xl:flex">
                    <CloseOutlinedIcon className="m-auto" />
                  </div>
                  <div className="absolute top-0 right-0 text-white opacity-60 xl:hidden">
                    <CloseOutlinedIcon />
                  </div>
                </div>
              ))
            : null}
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="absolute inset-0 h-full w-full rounded-2xl"
        />
      )}
    </form>
  );
};

export default FileDragAndDrop;
