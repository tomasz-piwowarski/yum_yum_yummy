import { useState } from "react";

export function usePost(photos?: string[]) {
  const [files, setFiles] = useState<FileList | undefined>();
  const [blobPhotos, setBlobPhotos] = useState<string[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  function previousPhoto() {
    if (!currentPhotoIndex) return;
    setCurrentPhotoIndex((prev) => prev - 1);
  }

  function nextPhoto() {
    if (
      !blobPhotos ||
      currentPhotoIndex === blobPhotos.length - 1 ||
      (photos && currentPhotoIndex === photos?.length - 1)
    )
      return;

    setCurrentPhotoIndex((prev) => prev + 1);
  }

  function AddItemToFileList(
    oldFiles: FileList | undefined,
    newFiles: FileList
  ) {
    const dataTransfer = new DataTransfer();

    if (oldFiles) {
      for (let i = 0; i < oldFiles.length; i++)
        dataTransfer.items.add(oldFiles[i]);
    }

    for (let i = 0; i < newFiles.length; i++)
      dataTransfer.items.add(newFiles[i]);

    createBlobs(dataTransfer.files);

    return dataTransfer.files;
  }

  function RemoveItemFromFileList(photos: FileList, index: number) {
    const dataTransfer = new DataTransfer();
    for (let i = 0; i < photos!.length; i++) {
      if (i === index) continue;
      dataTransfer.items.add(photos![i]);
    }

    return dataTransfer.files;
  }

  function addPhoto(newFiles: FileList) {
    if (files && files.length + newFiles.length > 4) return;

    const list = AddItemToFileList(files, newFiles);

    setFiles(list);
  }

  function deletePhoto(index: number, e: any) {
    e.preventDefault();
    if (!files) return;
    const list = RemoveItemFromFileList(files, index);

    removeBlob(index);

    setCurrentPhotoIndex(0);

    setFiles(list);
  }

  function createBlobs(photos: FileList) {
    const arr = [];
    for (let i = 0; i < photos.length; i++) {
      const img = new Image();

      img.src = URL.createObjectURL(photos[i]);
      img.height = 60;
      arr.push(img.src);
    }
    setBlobPhotos(arr);
  }

  function removeBlob(index: number) {
    if (!blobPhotos) return;

    URL.revokeObjectURL(blobPhotos[index]);

    setBlobPhotos(blobPhotos.filter((val: any, i: number) => i !== index));
  }

  function resetPhotos() {
    if (!blobPhotos) return;
    blobPhotos.forEach((blob: string) => URL.revokeObjectURL(blob));

    setBlobPhotos([]);
    setFiles(undefined);
    setCurrentPhotoIndex(0);
  }

  return {
    addPhoto,
    deletePhoto,
    resetPhotos,
    currentPhotoIndex,
    previousPhoto,
    nextPhoto,
    blobPhotos,
    files,
  };
}
