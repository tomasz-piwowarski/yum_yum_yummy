import { IngredientsFields, StepsFields, TagsFields } from "./DynamicFields";
import FileDragAndDrop from "./DragAndDrop";
import {
  CreatePostFormInterface,
  CreateEditPostInterface,
} from "../../../types";
import { Category, Description, Region, Title, Type } from "./FormFields";

export default function CreatePostForm({
  addPhoto,
  blobPhotos,
  deletePhoto,
  register,
  handleSubmit,
  errors,
  type,
  tagsFieldArray,
  ingredientsFieldArray,
  stepsFieldArray,
  region,
  handlePost,
  buttonText,
}: CreatePostFormInterface) {
  const onSubmit = (data: CreateEditPostInterface) => {
    handlePost(data);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <FileDragAndDrop
        uploadFile={addPhoto}
        blobPhotos={blobPhotos}
        deletePhoto={deletePhoto}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex w-full flex-col items-center divide-y-2">
          <div className="mb-4 flex w-full flex-col pt-2 xl:flex-row">
            <Type register={register} errors={errors} />
            <Title register={register} errors={errors} />
          </div>
          <div className="mb-4 flex w-full flex-col pt-2 xl:flex-row">
            <Region register={register} errors={errors} />
            <Category register={register} errors={errors} region={region} />
          </div>
          <div className="mb-4 flex w-full flex-col pt-2 xl:h-80 xl:flex-row">
            <TagsFields
              register={register}
              fieldArray={tagsFieldArray}
              defaultValue={{ tag: "" }}
              errors={errors}
            />
            <Description register={register} errors={errors} />
          </div>
          {type === "recipe" && (
            <div className="mb-4 flex w-full flex-col xl:flex-row">
              <IngredientsFields
                register={register}
                fieldArray={ingredientsFieldArray}
                defaultValue={{ ingredient: "", unit: "", value: "" }}
                errors={errors}
              />
              <StepsFields
                register={register}
                fieldArray={stepsFieldArray}
                defaultValue={{ step: "" }}
                errors={errors}
              />
            </div>
          )}
          <button
            className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
            type="submit"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}
